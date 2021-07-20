import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import Todo from '../components/Todo';

const TasksComponent = () => {

    const url = `https://api-nodejs-todolist.herokuapp.com/task`;
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
        "Content-Type": "application/json",
    }


    const [todos, setTodos] = useState([]);
    // useEffect(async () => {
    //     const response = await axios({
    //         method: "GET",
    //         url: url,
    //         data: null,
    //         headers: headers,
    //     });
    //     // setTodos(response.data)
    //     console.log(response)
    //     // fetchData();

    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`https://repetitora.net/api/JS/Tasks?widgetId=16243&count=30`);
            setTodos(response.data)
            console.log(response.data)
        };
        fetchData();

    }, []);

    return (
        // <>
        //     <p>Fuck the Internet!</p>
        // </>
        <Todo todos={todos} />
    )

}

export default TasksComponent;