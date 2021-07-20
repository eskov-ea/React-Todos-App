import React from 'react';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

export const PrivateRoute = ({ children, ...rest }) => {
    const { token } = useContext(Context);
    return (
        <Route {...rest} render={() => {
          return token !== ""
            ? children
            : <Redirect to='/login' />
        }} />
      )
}