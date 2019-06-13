import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.js';
import Dashboard from './Dashboard.js';
import { connect } from 'react-redux';;

class Admin extends Component {
  render(){
    return <div>{this.props.loggedIn ? <Dashboard/> : <LoginForm/>}</div>
}
}

const mapStateToProps = (state)=>{
    return{
        loggedIn: state.adminReducer.logged_in
    }
}
export default connect(mapStateToProps)(Admin)