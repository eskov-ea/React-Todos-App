// import { Input } from '../../Auth(reg, login)/Input';
import { Button, TextField } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import style from './AddTask.module.css';
import SaveIcon from '@material-ui/icons/Save';
import { AxiosRequest } from '../Auth/AxiosRequest';
import { Context } from '../../Context';



export const AddTask = (props) => {

    const { getTasks, onSetTrigger, token, buttonIsActive, setButtonActive } = useContext(Context);


    const [isEditMode, setEditMode] = useState(false);
    const [inputText, setInputText] = useState("");



    const onActiveEditMode = () => {
        setEditMode(true);
    };
    const onDisactiveEditMode = () => {
        setEditMode(false);
    }
    const onInput = (e) => {
        setInputText(e.target.value)
    }
    const doRerender = () => {
        onSetTrigger()
    }

    const onCreateTask = async () => {
        setButtonActive(true);
        const url = "https://api-nodejs-todolist.herokuapp.com/task";
        const body = {
            "description": inputText
        };
        const method = "POST";
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await AxiosRequest(url, body, header, method);
        console.log(response)
        if (response.status === 201) {
            getTasks();
            // setInputText("");
            // onDisactiveEditMode();
            setButtonActive(false)
        } else {
            setButtonActive(false);
        }
    }


    return <>

        <div className={style.wrapper} >

            {
                isEditMode
                    ? <div className={style.taskField}  >
                        <span className={style.close} onClick={onDisactiveEditMode}>x close</span>
                        <TextField variant="outlined" margin="normal"
                            fullWidth multiline autoFocus
                            // onBlur={onDisactiveEditMode}
                            onChange={onInput} value={inputText}
                            label="My next goal is..." rows="3" ></TextField>
                        <Button variant="contained" color="primary"
                            onClick={onCreateTask} disabled={buttonIsActive}>
                            Creat task
                        </Button>
                    </div>

                    : <Button onClick={onActiveEditMode}
                        className={style.button}
                        variant="contained"
                        startIcon={<SaveIcon />}
                    > New   Task</Button>
            }

        </div>
    </>
}