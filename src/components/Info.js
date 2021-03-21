import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Info = ({ info: {open, message, style = 'info'}, setInfo}) => {
  const classes = useStyles();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setInfo({
        open: false,
        message: '',
        style: ''
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={style}>
         { message }
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Info