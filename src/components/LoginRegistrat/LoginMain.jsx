import React, { useContext } from 'react';
import { Context } from '../../Context';
import { Login } from './Login';
import { Registration } from './Registration';


export const LoginMain = (props) => {
    const { haveAccount } = useContext(Context);


    return <>
        {
            haveAccount
              ? <Login  />
              : <Registration  />
          }
          </>
}