import React from 'react';
import { useContext } from 'react';
import { LoginMain } from './components/LoginRegistrat/LoginMain';
import UserProfile from './components/UserProfile/UserProfile';
import { Context } from './Context';


export const Main = (props) => {

        const {token} = useContext(Context);
console.log(token)
    return <>
    
    {
            // в данном случае использую token как isAuth
            token != ""
              ? <UserProfile />
              : <LoginMain />
          }
    
    </>
}