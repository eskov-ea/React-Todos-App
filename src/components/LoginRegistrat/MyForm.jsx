import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
     root: {
         width: '100%',
         marginTop: theme.spacing(1),
         display: "flex",
         flexDirection: "column"
        
    },
})) 

export const MyForm = ({children, ...props}) => {
    const styles = useStyles();

    return <form  className={styles.root} {...props}> {children} </form>
}