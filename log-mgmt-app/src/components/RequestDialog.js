import 'date-fns';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { addRequestApproverName, addApprovalCompletion, addDate, editRequest, closeDialog, deleteRequest } from './actions/adminActions'
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
import Divider from '@material-ui/core/Divider';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from 'material-ui-pickers';
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));



function RequestDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [returnDate, setReturnDate] = React.useState(new Date());
  const classes = styles();

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

  const handleDelete = () =>{
    console.log(props.request_detail.id)
    props.deleteRequest(props.request_detail.id, props.token);
  }

  useEffect(() => {
    props.addDate(selectedDate, 'borrow')
  })

  return (

    <div>

      <Dialog
        fullScreen
        open={props.request_detail['equipments'].length == [] ? false : true}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>props.handleClose()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Loan Detail
            </Typography>
            <Button color="secondary" onClick={handleDelete}>
              <IconButton>
                <DeleteIcon/>
              </IconButton>
            </Button>
          </Toolbar>
        </AppBar>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please confirm/fulfill the loan accordingly
          </DialogContentText>
          <List
           dense
           
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
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>

          <Divider variant="middle" />

          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.grid} justify="space-around">
               
                <DatePicker
                  disabled = {props.request_detail.borrow_date != null}
                  margin="normal"
                  id="mui-pickers-date"
                  label="Date of Loan"
                  value={props.request_detail.borrow_date == null ? selectedDate : props.request_detail.borrow_date}
                  onChange={handleDateChangeBorrow}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                
                
                <DatePicker
                disabled = {props.request_detail.return_date != null}
                  margin="normal"
                  id="mui-pickers-date"
                  label="Return By"
                  value={props.request_detail.return_date == null ? null : props.request_detail.return_date}
                  onChange={handleDateChangeReturn}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                
              </Grid>
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={9}>
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
                control={<Checkbox value="Approved" color="primary" disabled = {props.request_detail.approved}/>}
                onChange = {(e) => props.handleTick(e)}
                label="Approved"
              />
            </Grid>

            <Divider variant="middle" />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.grid} justify="space-around">
              <DatePicker
                  disabled = {!props.request_detail.approved}
                  margin="normal"
                  id="mui-pickers-date"
                  label="Date of Return"
                  value={null}
                  onChange={handleDateChangeReturn}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              </MuiPickersUtilsProvider>


            <Grid item xs={12} sm={9}>
              <TextField
                size = "small"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Items Returned To"
                onChange = {(e) => props.handleApproverName(e)}
                placeholder = {props.request_detail.approver_name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={<Checkbox value="Completed" color="primary" />}
                onChange = {(e) => props.handleTick(e)}
                label="Completed"
              />
            </Grid>

            <Divider variant="middle" />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {(e)=>handleSubmit(e)}
          >
            {props.request_detail.approved ? 'Close Loan' : 'Open Loan'}
          </Button>
          </Grid>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleClose()} color="primary" >
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
        editRequest: (e)=>{dispatch(editRequest(e))},
        handleClose: ()=>{dispatch(closeDialog())},
        deleteRequest: (id, token)=>{dispatch(deleteRequest(id, token))}

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequestDialog)