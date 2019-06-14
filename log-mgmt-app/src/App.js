import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import PaymentForm from './components/PaymentForm'
import Checkout from './components/Checkout'
import LoginForm from './components/LoginForm'
import AdminAppBar from './components/AdminAppBar'
import Dashboard from './components/Dashboard'
import Admin from './components/Admin'
import { connect } from 'react-redux';

class App extends Component {
  render(){
    console.log(this.props.loggedIn)
    
    return (
       <BrowserRouter>
            <div className="App">
              <div>{this.props.loggedIn ? <AdminAppBar/> : <Navbar/>}</div>
              
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/admin" component = {Admin}/>
                    <Route exact path="/admin/dashboard" component = {Dashboard}/>
                    <Route exact path='/payment' component={PaymentForm}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/Checkout" component={Checkout}/>
                  </Switch>
              
              
             </div>
       </BrowserRouter>
      
    );
  }
}

const mapStateToProps = (state)=>{
    return{
        loggedIn: state.adminReducer.logged_in,
        token: state.adminReducer.token
    }
}

export default connect(mapStateToProps)(App)
