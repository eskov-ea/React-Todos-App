import React from 'react';
import { Button } from 'react-bootstrap';
import { AxiosRequest } from '../Auth/AxiosRequest';
import style from './Logout.module.css';


export const Logout = (props) => {

    const url = "https://api-nodejs-todolist.herokuapp.com/user/logout";
    const body = null;
    const method = "POST";
    const headers = { "Authorization": `Bearer ${props.token}` };

    const doRerender = () => {
        props.setToken("");
    }

    const onLogout = async() => {
        const response = await AxiosRequest(url, body, headers, method);
        if (response.status === 200) {
            doRerender();
            alert ("You're logged out successfully");

        } else {
            console.log(response)
        }
    }

    return <div className={style.logoutBtnBox} >
        <Button variant="warning" className={style.logoutBtn}
        onClick={onLogout} > Log Out</Button>
    </div>
}