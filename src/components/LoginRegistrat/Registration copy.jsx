import React, { useContext } from 'react';
import { MyForm } from './MyForm';
import { Input } from './Input';
import { MainContainer } from './MainContainer';
import { Field, Form } from 'react-final-form';
import { PrimaryButton } from './Button';
import { AxiosRequest } from '../Auth/AxiosRequest';
import { Context } from '../../Context';
import style from './LoginRegistrate.module.css'




export const Registration = (props) => {

    const { setHaveAccount } = useContext(Context);


    const required = value => (!value ? 'Field is required' : undefined)
    const isCorrect = value => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (re.test(String(value).toLowerCase())) {
            return 'You entered wrong e-mail'
        }
    }



    const onLogIn = () => {
        setHaveAccount(true);
    }


    const url = `https://api-nodejs-todolist.herokuapp.com/user/register`;
    const headers = {
        "Content-Type": "application/json"
    };
    const SubmitRegData = async (formObj) => {
        const response = await AxiosRequest(url, JSON.stringify(formObj), headers, "post");
        if (response.status === 201) {
            alert("user created")
            setHaveAccount(true)
        } else { console.log("An error occured") }
    }




    return (
        <>
            <MainContainer name={"Create your account"}>
                <Form onSubmit={(formObj) => {
                    SubmitRegData(formObj)
                }} >
                    {({ handleSubmit }) => (
                        <MyForm onSubmit={handleSubmit} >
                            <Field name="name" validate={required} >
                                {({ input, meta }) => (<>
                                    {(meta.error && meta.touched) && <span className={style.error}>{meta.error}</span>}
                                    <Input id="name" type="text"
                                        label="Name"  {...input} />
                                </>
                                )}
                            </Field>
                            <Field name="email" validate={[required, isCorrect(input.value)]}>
                                {({ input, meta }) => (<>
                                    {meta.error && meta.touched && <span className={style.error}>{meta.error}</span>}
                                    <Input id="email" type="email"
                                        label="E-mail"  {...input} />
                                </>
                                )}
                            </Field>
                            <Field name="password" validate={required}>
                                {({ input, meta }) => (<>
                                    {meta.error && meta.touched && <span className={style.error}>{meta.error}</span>}
                                    <Input id="password" type="password"
                                        label="Password"  {...input} />
                                </>
                                )}
                            </Field>
                            <Field name="age" validate={required}>
                                {({ input, meta }) => (<>
                                    {meta.error && meta.touched && <span className={style.error}>{meta.error}</span>}
                                    <Input id="age" type="number"
                                        label="Age"  {...input} />
                                </>
                                )}
                            </Field>

                            <PrimaryButton color={"primary"} >Submit</PrimaryButton>
                        </MyForm>
                    )}
                </Form>
                <div>
                    <p>I have an account</p>
                    <PrimaryButton onClick={onLogIn} color={"secondary"} >Log In</PrimaryButton>
                </div>
            </MainContainer>
        </>

    )
}