import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TaskContainer } from '../Tasks/TaskContainer';
import { UserInformation } from './UserInformation';
import { UserSettings } from './UserSettings';




const UserProfile = (props) => {
    // console.log("UserProfile has been rendered")
    const history = useHistory();

    const [isSettings, setIsSettings] = useState(false);

    // const onSetSettings = () => {
    //     isSettings ? setIsSettings(false) : setIsSettings(true)
    // }
    const onSetSettings = () => {
        history.push("/settings")
    }


    return <>
        <UserInformation onSetSettings={onSetSettings} />
        <TaskContainer />
    </>
}

export default UserProfile;