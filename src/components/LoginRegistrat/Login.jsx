import React, { useContext } from 'react';
import { MyForm } from './MyForm';
import { Input } from './Input';
import { MainContainer } from './MainContainer';
import { Field, Form } from 'react-final-form';
import { PrimaryButton } from './Button';
import { AxiosRequest } from '../Auth/AxiosRequest';
import { Context } from '../../Context';
import { useHistory } from 'react-router-dom';
import style from './LoginRegistrate.module.css'



export const Login = (props) => {
    const { setHaveAccount, setToken, buttonIsActive, setButtonActive } = useContext(Context);
    const history = useHistory();



    // --------------   VALIDATION PART -----------------
    const isCorrectEmail = value => {
        if (!value) {
            return 'Field is required'
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(value).toLowerCase())) {
            return 'You entered wrong e-mail'
        }
        return undefined
    }
    const isCorrectPassword = value => {
        if (!value) {
            return 'Field is required'
        }
        if (value.length < 8) {
            return `Password should contain 8 symbols`
        }
        return undefined
    }




    const onSetUp = () => {
        setHaveAccount(false);
    };

    const onLogin = async (formObj) => {
        setButtonActive(true);
        const url = `https://api-nodejs-todolist.herokuapp.com/user/login`;
        const headers = {
            "Content-Type": "application/json"
        };
        const response = await AxiosRequest(url, JSON.stringify(formObj), headers, "post");
        if (response.status >= 400) {
            alert("something wrong")
            setButtonActive(false);
        } else {
            const token = response.data.token;
            setToken(token);
            history.push("/")
            setButtonActive(false);
        };
    }


    return (
        <>
            <MainContainer name={"Please Log In"}>
                <Form onSubmit={(formObj) => {
                    onLogin(formObj)
                }} >
                    {({ handleSubmit }) => (
                        <MyForm onSubmit={handleSubmit} >
                            <Field name="email" validate={isCorrectEmail}>
                                {({ input, meta }) => (<>
                                    {(meta.error && meta.touched) && <span className={style.error}>{meta.error}</span>}
                                    <Input id="email" type="email"
                                        label="E-mail"  {...input} />
                                </>
                                )}
                            </Field>
                            <Field name="password" validate={isCorrectPassword}>
                                {({ input, meta }) => (<>
                                    {(meta.error && meta.touched) && <span className={style.error}>{meta.error}</span>}
                                    <Input id="password" type="password"
                                        label="Password"  {...input} />
                                </>
                                )}
                            </Field>

                            <PrimaryButton disabled={buttonIsActive} color={"primary"} >Submit</PrimaryButton>
                        </MyForm>
                    )}
                </Form>
                <div>
                    <p>Don't have an account?</p>
                    <PrimaryButton onClick={onSetUp} color={"secondary"} >Sign Up</PrimaryButton>
                </div>
            </MainContainer>
        </>

    )
}