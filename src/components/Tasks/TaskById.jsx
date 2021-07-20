import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../Context';
import style from './TaskById.module.css';
import { AxiosRequest } from '../Auth/AxiosRequest';
import { PrimaryButton } from '../LoginRegistrat/Button';
import { DelButton } from './DelButton';
import Checkbox from '@material-ui/core/Checkbox';

export const TaskById = (props) => {
    const history = useHistory();
    const { tasks, token, buttonIsActive, setButtonActive, rerenderTasks } = useContext(Context);
    const taskId = props.match.params.id;

    // Здесь можно было бы сделать запрос за нужной таской типа GetTaskById,
    // но я решил не делать лишнего запроса, а обратиться в контекст, который
    // хранит полученные таски и выбрать нужную по id

    //Вместо того, чтобы получить таску по id , получается массив из таски и пустых элементов filter

    const item = tasks.filter(task => task._id === taskId);

    // ---- Define input values
    const [deskriptionValue, setDeskriptionValue] = useState("")
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (item[0]) {
            setDeskriptionValue(item[0].description)
            setIsChecked(item[0].completed)
        }
    }, [])


    // ---- Update input values
    const onDeskriptionValueChange = (e) => {
        setDeskriptionValue(e.target.value)
    }
    const onCheckChange = (e) => {
        setIsChecked(e.target.checked)
    }


    // ---- Update task data
    const onSubmitUpdates = async () => {
        setButtonActive(true)

        const url = `https://api-nodejs-todolist.herokuapp.com/task/${taskId}`;
        const body = {
            "completed": isChecked,
            "description": deskriptionValue
        };
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
        const method = "PUT";
        const response = await AxiosRequest(url, body, headers, method);
        if (response.status === 200) {
            history.push("/");
            setButtonActive(false);
            rerenderTasks();
        } else {
            console.log(response)
            setButtonActive(false)
        }
    }

    // Get date data from item.created at
    const getDate = (data) => {
        const createDate = new Date(data)
        let day, month
        if (createDate.getDate() < 10) {
            day = `0${createDate.getDate()}`
        } else {
            day = createDate.getDate()
        }
        if (createDate.getMonth() < 10) {
            month = `0${createDate.getMonth()}`
        } else {
            month = createDate.getMonth()
        }
        return `${day}.${month}.${createDate.getFullYear()}`
    }



    // ---- Create editMode functionality to trigger task description text to editMode 
    const [editMode, setEditMode] = useState(false)
    const onActiveEditMode = () => setEditMode(true);
    const onDisactiveEditMode = () => setEditMode(false);



    return <>

        {
            item[0]
                //  ---- Task id is correct -> task will be displayed 
                ? <div>
                    <div className={style.wrapper} >
                        <h2>*double click to edit the task description</h2>
                        <div className={style.content} >
                            <div className={style.content_container}>
                                <div className={style.description_info} >Tasks description</div>
                                {
                                    editMode
                                        ? <textarea className={style.description}
                                            autoFocus
                                            onBlur={onDisactiveEditMode}
                                            value={deskriptionValue}
                                            onChange={onDeskriptionValueChange}
                                            rows="10"
                                        ></textarea>
                                        : <div onDoubleClick={onActiveEditMode} > {deskriptionValue} </div>
                                }
                            </div>
                            <div className={style.completed} >
                                <label className={style.completed_info} htmlFor="chk1-label">Task completed?</label>
                                <Checkbox color="primary" id="chk1-label" checked={isChecked} onChange={onCheckChange} />


                            </div>
                            <div className={style.created_container}>
                                <div className={style.created_info}>Task was creaded at</div>
                                <div className={style.created} > {getDate(item[0].createdAt)} </div>
                            </div>
                        </div>


                        {
                            // ---- The button would be disabled if the input values have not been changed
                            (deskriptionValue === item[0].description) && (isChecked === item[0].completed)
                                ? <PrimaryButton className={style.updateBtn}
                                    onClick={onSubmitUpdates} disabled
                                    color={"primary"} >Update task</PrimaryButton>
                                : <PrimaryButton className={style.updateBtn}
                                    onClick={onSubmitUpdates} disabled={buttonIsActive}
                                    color={"primary"} >Update task</PrimaryButton>

                        }

                    </div>

                </div>

                //  ---- Task id is incorrect -> Inform page will be displayed
                : <h1>Sorry, the task was not found</h1>
        }

        <div className={style.delBackBtn} >
            <DelButton id={taskId} />
            <Link to="/" > Back </Link>
        </div>


    </>
}