import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom'
import red from '@material-ui/core/colors/red';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';

const primary = red[500];
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

function Navbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Button disabled = {props.loggedIn} color="inherit" component={AdapterLink} to="/">
            Powerlifting NUS
          </Button>
          </Typography>
          <Button color="inherit" component={AdapterLink} to="/cart">
            <ShoppingCartIcon />
          </Button>
          <Button color="inherit">Login</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state)=>{
    return{
        loggedIn: state.adminReducer.logged_in
    }
}

export default connect(mapStateToProps)(Navbar)