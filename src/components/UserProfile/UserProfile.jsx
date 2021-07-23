import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TaskContainer } from '../Tasks/TaskContainer';
import { UserInformation } from './UserInformation';




const UserProfile = (props) => {
    const history = useHistory();

    const [isSettings, setIsSettings] = useState(false);

    const onSetSettings = () => {
        history.push("/settings")
    }


    return <>
        <UserInformation onSetSettings={onSetSettings} />
        <TaskContainer />
    </>
}

export default UserProfile;