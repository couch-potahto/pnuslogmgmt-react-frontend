import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { getRequestData } from './actions/adminActions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Generate Order Data



const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function Loan(props) {
  const classes = useStyles();
  const [data, setData] = useState({hits:[]})

  const openRequestDialog = (id) => {
    
    props.getRequestData(id, props.token)
  }
  
  
  
  return (

    <React.Fragment>
      <Title>Loan Requests</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ref.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Complete</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...props.all_requests.data].map(row => (
            <TableRow key={row.id}>
              <TableCell>

                  {row.transaction_ref}

              </TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrower_contact}</TableCell>
              <TableCell>{row.approved ? 'Approved' : 'Not Approved'}</TableCell>
              <TableCell>{row.fulfilled ? 'Returned' : 'Not Returned'}</TableCell>
              <TableCell align="right">
                <Button 
                  size="small"
                  variant="outlined"
                  color="primary" 
                  className={classes.button}
                  onClick={()=>{openRequestDialog(row.id)}}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state)=>{
  console.log(state.adminReducer)
    return{
        all_requests: state.adminReducer.all_requests,
        token: state.adminReducer.token
    }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators( {getRequestData}, dispatch);
    /*return{
        submitRequest: (cart)=>{dispatch(submitRequest(cart))}
    }*/
}
export default connect(mapStateToProps, mapDispatchToProps)(Loan)