import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fNameFilledIn, contactFilledIn } from './actions/cartActions'



function AddressForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={props.borrower_name}
            onChange={e=>props.fNameFilledIn(e.target.value)}
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="contact"
            name="contact"
            label="Contact Detail"
            fullWidth
            value={props.borrower_contact}
            onChange={e=>props.contactFilledIn(e.target.value)}
            placeholder="Mobile Number"
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state)=>{
    return{
        items: state.cartReducer.addedItems,
        total: state.cartReducer.total,
        borrower_name: state.cartReducer.borrower_name,
        borrower_contact: state.cartReducer.borrower_contact
    }
}
const mapDispatchToProps = (dispatch)=>{

    return{
        fNameFilledIn: (val)=>{dispatch(fNameFilledIn(val))},
        contactFilledIn:(val)=>{dispatch(contactFilledIn(val))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)