import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { MainContainer } from '../LoginRegistrat/MainContainer';
import { MyForm } from '../LoginRegistrat/MyForm';
import style from './UserSettings.module.css';
import { TextField } from '@material-ui/core';
import { PrimaryButton } from '../LoginRegistrat/Button';
import { AxiosRequest } from '../Auth/AxiosRequest';
import userAvatar from '../../Images/defaultUserAvatar.png';
import { Button } from 'react-bootstrap';
import { Context } from '../../Context';
import { useHistory } from 'react-router-dom';



export const UserSettings = (props) => {

    const { rerenderUserData, token, userData, buttonIsActive, setButtonActive, } = useContext(Context);
    const history = useHistory();


    const disSetSettings = () => {
        history.push("/")
    }

    const onSubmitChanges = async (formObj) => {
        setButtonActive(true);
        const url = `https://api-nodejs-todolist.herokuapp.com/user/me`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const body = JSON.stringify(formObj);
        const method = "PUT";
        const response = await AxiosRequest(url, body, headers, method);
        if (response.status === 200) {
            rerenderUserData();
            alert("Your name/age have been changed successfully");
            history.push("/");
            setButtonActive(false);
        } else {
            alert("Something went wrong");
            console.log(response);
            setButtonActive(false);
        }
    }



    return <>
    <div>

    <h3>Settings: you can change your name and age information</h3>
    </div>
        <div className={style.wrapper} >
            <div className={style.box} >
                <div>
                    <div className={style.imgPart} >
                        <img className={style.userAvatar} src={userAvatar} />
                        <PrimaryButton disabled color={"primary"} >Upload avatar</PrimaryButton>
                    </div>


                </div>
                <MainContainer  >
                    <Form onSubmit={(formObj) => {
                        onSubmitChanges(formObj)
                    }} >
                        {({ handleSubmit }) => (
                            <MyForm onSubmit={handleSubmit} >
                                <p>Please enter your name</p>
                                <Field name="name"  >
                                    {({ input, meta }) => (<>
                                        <TextField
                                            variant="outlined"
                                            placeholder={userData.name}
                                            {...input} />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                    )}
                                </Field>
                                <p>Please enter your age</p>
                                <Field name="age"  >
                                    {({ input, meta }) => (<>
                                        <TextField
                                            variant="outlined"
                                            placeholder={   userData.age.toString()} {...input} />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                    )}
                                </Field>
                                <PrimaryButton disabled={buttonIsActive} 
                                    color={"primary"}>Submit changes</PrimaryButton>
                            </MyForm>
                        )}
                    </Form>

                </MainContainer>
            </div>
            <div className={style.backBtnBox} >
                <Button onClick={disSetSettings} > Back</Button>
            </div>
        </div>
    </>

}