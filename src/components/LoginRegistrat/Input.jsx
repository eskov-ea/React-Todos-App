import React from 'react';
import TextField from '@material-ui/core/TextField';

export const Input = (input, meta) => {

    return <TextField variant="outlined" margin="normal"
        fullWidth {...input} />

}