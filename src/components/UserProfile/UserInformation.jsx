import React, { useContext } from 'react';
import { Context } from '../../Context';
import userAvatar from '../../Images/defaultUserAvatar.png';
import { Logout } from '../Logout/Logout';
import style from './UserInformation.module.css';


export const UserInformation = (props) => {

    const {userData, token, setToken, tasks } = useContext(Context);


    return (

        <div className={style.wrapper}>
            <div className={style.box} >

                <div className={style.box2}>
                    <img className={style.userAvatar} src={userAvatar} alt="User Avatar" />

                    <div className={style.itemWrapper} >
                        <div className={style.boxItem} > {userData.name} </div>
                        <div className={style.boxItem} >{userData.email}</div>
                        <div className={style.boxItem} >Count of todos: {tasks.length} </div>
                        <div onClick={props.onSetSettings} className={style.boxItem} 
                        className={style.settingsItem} >Settings</div>
                    </div>
                </div>
                <Logout token={token} setToken={setToken} />

            </div>

        </div>

    )
}