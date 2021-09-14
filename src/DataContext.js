import React, { createContext, useContext, useState } from 'react';
import { AxiosRequest } from './components/Auth/AxiosRequest';

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [haveAccount, setHaveAccount] = useState(true);
    const [token, setToken] = useState("");
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});
    const [isFetching, setIsFetching] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [buttonIsActive, setButtonActive] = useState(false);
    const [countTasks, setCountTasks] = useState(0);
    const [nextTasksOnPage, setIt] = useState(4)
    const [lastTaskOnPage, setLastTaskOnPage] = useState(4)

    // const rerenderTasks = () => trigger ? setTrigger(false) : setTrigger(true);
    const rerenderUserData = () => rerender ? setRerender(false) : setRerender(true);
    const getTasks = async () => {
        setIsFetching(true)
        const url = "https://api-nodejs-todolist.herokuapp.com/task";
        const body = null;
        const method = "GET";
        const header = { "Authorization": `Bearer ${token}` };
        const response = await AxiosRequest(url, body, header, method);
        setTasks(response.data.data)
        setCountTasks(response.data.count)
        setIsFetching(false)
    }

    return <DataContext.Provider value={{
        getTasks, haveAccount,
        setHaveAccount, token, setToken,
        rerender, setRerender, userData,
        setUserData, isFetching, setIsFetching,
        tasks, setTasks, trigger, setTrigger,
        buttonIsActive, setButtonActive,
        rerenderUserData, countTasks, setCountTasks,
        nextTasksOnPage, lastTaskOnPage, setLastTaskOnPage
    }} >
        {children}
    </DataContext.Provider>
};

export const useData = () => useContext(DataContext);