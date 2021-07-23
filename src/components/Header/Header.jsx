import React from 'react';
import { Badge } from 'react-bootstrap';
import style from './header.module.css';


const Header = () => {

    return (
        <header>
            <h1 className={style.title} >
                Welcome to my <Badge variant="warning"> todosLIST </Badge>
            </h1>
        </header>
    )
}

export default Header;