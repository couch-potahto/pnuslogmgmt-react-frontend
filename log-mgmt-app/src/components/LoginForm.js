import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { handleLogin } from './actions/adminActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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



function LoginForm(props) {
  const classes = useStyles();

  const state = {
    AdminUser: '',
    password:'',
    loggedIn:false,
    jsonwt:'',
  }

  const handleChange = (e) => {
    console.log(e.target);
    const {name, value} = e.target;
    state[name]= value;
    console.log(state);
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    props.handleLogin(state)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logistics Admin
        </Typography>
        <form className={classes.form} onSubmit={(e)=>onSubmit(e) }>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Admin User"
            name="AdminUser"
            autoComplete="email"
            autoFocus
            onChange = {(e)=>handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {(e)=>handleChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In

          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state)=>{
    return{
        loggedIn: state.adminReducer.logged_in

    }
}
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators( {handleLogin}, dispatch);
    /*return{
        submitRequest: (cart)=>{dispatch(submitRequest(cart))}
    }*/
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)