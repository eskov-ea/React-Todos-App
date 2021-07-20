import React from 'react';
import style from './Todo.module.css';
import DelButton from './DelButton';


const Task = (props) => {
    return <div className={style.container}>

        {props.todos.map(el => <div  key={el.id} className={style.wrapper}>
            <div className={style.item} >
                <div className={style.text_block}>
                    <div className={style.item_line}> {el.title} </div>
                </div>
                <div className={style.status_block}>
                    <div>
                        {(el.completed)

                            ? <div className={style.round_green}> </div>
                            : <div className={style.round_red}> </div>
                        }
                    </div>
                    <div>
                        <DelButton dataset={el.id} />
                    </div>

                </div>

            </div>
        </div>)}

    </div>
}

export default Task;