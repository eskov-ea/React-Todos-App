import React, { useContext } from 'react';
import style from './Tasks.module.css';
import { Context } from '../../Context';
import { Task } from './Task';
import { AddTask } from './AddTask';


export const Tasks = (props) => {
    const { tasks } = useContext(Context);




    return <div className={style.container}>
        <AddTask />

        {
            tasks.length === 0
                ? <div>
                    <h1>You have no tasks yet. Create one! ;)</h1>
                </div>
                : tasks.map(item => <Task item={item} key={item._id} />)
        }


    </div>
}