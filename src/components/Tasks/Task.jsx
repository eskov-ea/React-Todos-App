import React from 'react';
import style from './Tasks.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';



export const Task = (props) => {




    return <>
        <div className={style.item} >
            <div className={style.text_block}>
                <div className={style.item_line}> {props.item.description} </div>
            </div>
            <div className={style.status_block}>
                <div>
                    {(props.item.completed)

                        ? <div className={style.round_green}> </div>
                        : <div className={style.round_red}> </div>
                    }
                </div>
                <div className={style.edit_btn}>

                    <Link to={`/${props.item._id}`}>
                        <Button > EDIT</Button>
                    </Link>
                </div>

            </div>

        </div>
    </>
}