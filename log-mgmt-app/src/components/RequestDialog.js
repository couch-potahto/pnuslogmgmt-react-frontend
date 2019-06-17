import 'date-fns';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { addRequestApproverName, addApprovalCompletion, addDate, editRequest } from './actions/adminActions'
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from 'material-ui-pickers';
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  grid: {
    width: '60%',
  },
}));

function RequestDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [returnDate, setReturnDate] = React.useState(new Date());
  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleDateChangeBorrow(date) {
    setSelectedDate(date);
    props.addDate(date, 'borrow');
  }

  function handleDateChangeReturn(date) {
    setReturnDate(date);
    props.addDate(date, 'return');
  }

  function handleClose() {
    setOpen(false);
  }
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = id => () => {
    console.log(id)
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(props.token)
    props.editRequest(props.request_detail, props.token);
  }


  useEffect(() => {
    props.addDate(selectedDate, 'borrow')
  })

  return (
    <div>
      <Dialog
        open={props.request_detail['equipments'].length == [] ? false : true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Loan Detail</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please confirm/fulfill the loan accordingly
          </DialogContentText>
          <List
           dense
           subheader={
             <ListSubheader component="div" id="nested-list-subheader">
                Equipment Requested
              </ListSubheader>
            }
           className={classes.root}
           >
           
            {props.request_detail.equipments.map(value => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem 
                  key={value} 
                  button
                  selected={value.on_loan}
                  onClick={handleToggle(value.id)}
                >
                
                  <ListItemText id={labelId} primary={value.equipment_name} secondary={value.description}/>
                  
                  <ListItemText secondary={`${value.weeks_borrowed} weeks`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>

          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.grid} justify="space-between">
                <Grid item xs={12}>
                <DatePicker
                  margin="normal"
                  id="mui-pickers-date"
                  label="Date of Loan"
                  value={selectedDate}
                  onChange={handleDateChangeBorrow}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <DatePicker
                  margin="normal"
                  id="mui-pickers-date"
                  label="Date Returned"
                  value={returnDate}
                  onChange={handleDateChangeReturn}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size = "small"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Approved By"
                onChange = {(e) => props.handleApproverName(e)}
                placeholder = {props.request_detail.approver_name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={<Checkbox value="Approved" color="primary"/>}
                onChange = {(e) => props.handleTick(e)}
                label="Approved"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={<Checkbox value="Completed" color="primary"/>}
                onChange = {(e) => props.handleTick(e)}
                label="Completed"
              />
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {(e)=>handleSubmit(e)}
          >
            Sign Up
          </Button>
          </Grid>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          
        </DialogActions>
        
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state)=>{
    return{
        request_detail: state.adminReducer.request_detail,
        token: state.adminReducer.token
    }
}

const mapDispatchToProps= (dispatch)=>{
    
    return{
        handleApproverName: (e)=>{dispatch(addRequestApproverName(e.target.value))},
        handleTick: (e)=>{dispatch(addApprovalCompletion(e.target.value))},
        addDate: (date, type)=>{dispatch(addDate(date, type))},
        editRequest: (e)=>{dispatch(editRequest(e))}
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequestDialog)