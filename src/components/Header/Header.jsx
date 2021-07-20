import React from 'react';
import { Badge } from 'react-bootstrap';


const Header = () => {

    return (
        <header>
            <h1 style={{margin:"50px", fontSize: "52px"}} >
                Welcome to my <Badge variant="warning"> todosLIST </Badge>
            </h1>
        </header>
    )
}

export default Header;