import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';
import { AxiosRequest } from '../Auth/AxiosRequest';
import style from './DelButton.module.css';

// ---- так как у нас нет стэйт менеджмента отдельного,
// ---- а компонент должен оставаться чистым, т е мы можем
// ---- использовать side effects внутри useEffect 
// ---- мы должны создавать кейс для useEffect в верхнем компоненте и
// ---- передавать callback, или же мы можем делать это 
// ---- непосредственно в данном компоненте?


export const DelButton = (props) => {

    const { getTasks, token, onSetTrigger, setButtonActive, buttonIsActive } = useContext(Context);

    const history = useHistory();

    const doRerender = () => {
        onSetTrigger();
    }

    const deleteTask = (async (id) => {
        setButtonActive(true)
        const url = `https://api-nodejs-todolist.herokuapp.com/task/${id}`;
        const body = null;
        const method = "DELETE";
        const header = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        const response = await AxiosRequest(url, body, header, method);
        console.log(response.status)
        if (response.status === 200) {
            console.log("DELETING")
            getTasks();
            history.push("/");
            setButtonActive(false)
        } else {
            console.log(response);
            setButtonActive(false);
        }
    })



    return <Button dataset={props.id}
        className={style.del_btn} disabled={buttonIsActive}
        // variant="outline-info"
        onClick={() => { deleteTask(props.id) }}
    >delete</Button>
}