import React from 'react';
import style from './LoadMore.module.css';


export const LoadMore = (props) => {
    console.log(props.currentTasks, props.tasks);
    return <div>
        {
            props.currentTasks >= props.tasks
                ? <button disabled className={style.showMoreBtn} onClick={props.showTasks} >Load more</button>
                : <button className={style.showMoreBtn} onClick={props.showTasks} >Load more</button>
        }
    </div >
}