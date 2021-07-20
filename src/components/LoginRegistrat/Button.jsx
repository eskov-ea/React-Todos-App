import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

export const PrimaryButton = ({children , ...props }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(4, 0, 2),
        }
    }))
    const styles = useStyles();

    return (
        <Button className={styles.root} type="submit" fullWidth 
        variant="contained"  {...props}>
            {children}
        </Button>
    )

}