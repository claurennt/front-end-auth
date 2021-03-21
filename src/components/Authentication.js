import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import sheep from '../pics/sheep.jpg'
import sheep2 from '../pics/sheep2.jpg'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.google.com">
        Electric Sheep 🐑⚡
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const base = {
  variant:"outlined",
  margin:"normal",
  required: true,
  fullWidth: true,
}

const formData = {
  login: [
    {
      ...base,
      id: "username",
      label: "Username",
      name: "username",
      autoFocus: true
    },
    {
      ...base,
      name: "password",
      label: "Password",
      type: "password",
      id: "password"
    }
  ],
  register: [
    {
      ...base,
      id: "username",
      label: "Username",
      name: "username",
      autoFocus: true
    },
    {
      ...base,
      name: "email",
      label: "Email",
      type: "email",
      id: "email"
    },
    {
      ...base,
      name: "phone",
      label: "Phone",
      id: "phone"
    },
    {
      ...base,
      name: "password",
      label: "Password",
      type: "password",
      id: "password"
    }
  ]
}



const Authentication = ({onAuth, onSetCredentials, authType, setAuthType}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: `url(${authType === 'login' ? sheep2 : sheep})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const renderForm = (type) => {
    if (!formData[type]) return null;
      return formData[type].map(field => {
        return <TextField
        key={field.name}
        variant={field.variant}
        margin={field.margin}
        id={field.margin}
        label={field.label}
        name={field.name}
        type={field.type}
        required={field.required}
        fullWidth={field.fullWidth}
        autoFocus={field.autoFocus}
        onChange={e => onSetCredentials(e)}
      />
      })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <OfflineBoltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {authType === 'login' ? "Sign In" : "Register"}
          </Typography>
          <form className={classes.form} noValidate>
            {renderForm(authType)}
            <Button
              onClick={() => onAuth(authType)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {authType === 'login' ? "Sign In" : "Register"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{cursor: 'pointer'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link style={{cursor: 'pointer'}} onClick={() => setAuthType(authType === 'login' ? "register" : "login")}>
                  {authType === 'login' ? "Don't have an account? Sign Up!" : "Already have an account? Login!"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Authentication