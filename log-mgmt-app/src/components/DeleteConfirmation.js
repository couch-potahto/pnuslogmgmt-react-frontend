import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeDialog, deleteRequestConfirm } from './actions/adminActions'
import { connect } from 'react-redux';

function DeleteConfirmation(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (

    <div>
    {console.log(props.request_detail)}
      <Dialog
        open={props.openDialog.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This operation is not reversible. Please confirm again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleClose()} color="primary">
            No
          </Button>
          <Button onClick={(id, token)=>props.handleDelete(props.request_detail.id, props.token)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state)=>{
    return{
        openDialog: state.adminReducer.delete_confirm,
        token: state.adminReducer.token,
        request_detail: state.adminReducer.request_detail
    }
}

const mapDispatchToProps= (dispatch)=>{
    
    return{
        //handleApproverName: (e)=>{dispatch(addRequestApproverName(e.target.value))},
        //handleTick: (e)=>{dispatch(addApprovalCompletion(e.target.value))},
        //addDate: (date, type)=>{dispatch(addDate(date, type))},
        handleDelete: (id, token)=>{dispatch(deleteRequestConfirm(id, token))},
        handleClose: ()=>{dispatch(closeDialog())}

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeleteConfirmation)