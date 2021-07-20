import React, { createContext, useContext, useState } from 'react';

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

    const rerenderTasks = () => trigger ? setTrigger(false) : setTrigger(true) 
    const rerenderUserData = () => rerender ? setRerender(false) : setRerender(true)

    return <DataContext.Provider value={{  haveAccount,
        setHaveAccount, token, setToken, 
        rerender, setRerender, userData,
        setUserData, isFetching, setIsFetching,
        tasks, setTasks, trigger, setTrigger,
        buttonIsActive, setButtonActive, rerenderTasks,
        rerenderUserData
    }} >
        {children}
    </DataContext.Provider>
};

export const useData = () => useContext(DataContext);