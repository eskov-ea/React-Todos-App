import React, { useContext } from 'react';
import style from './Tasks.module.css';
import { Context } from '../../Context';
import { Task } from './Task';
import { AddTask } from './AddTask';
import { LoadMore } from './LoadMore';


export const Tasks = (props) => {
    const { tasks, nextTasksOnPage, lastTaskOnPage, setLastTaskOnPage } = useContext(Context);


    // ----   --------PAGINATION PART----------
    const currentTasks = tasks.slice(0, lastTaskOnPage)
    const showTasks = () => {
        setLastTaskOnPage(lastTaskOnPage + nextTasksOnPage)
    }


    return <div className={style.container}>
        <AddTask />

        {
            tasks.length === 0
                ? <div>
                    <h1>You have no tasks yet. Create one! ;)</h1>
                </div>
                : currentTasks.map(item => <Task item={item} key={item._id} />)
        }
        <LoadMore showTasks={showTasks} tasks={tasks.length} currentTasks={currentTasks.length} />

    </div >
}