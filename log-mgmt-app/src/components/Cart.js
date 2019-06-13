import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class Cart extends Component{

    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (eq)=>{
        this.props.addQuantity(eq);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (eq)=>{
        this.props.subtractQuantity(eq);
    }

    handleSubmitRequest = (data) =>{
      this.props.submitRequest(data)
    }

    render(){
        
        let addedItems = this.props.items.length ?
            (
              
                this.props.items.map(item=>{
                    return(
                       
                        <TableRow key={item.id}>                         
                          <TableCell colSpan = {2}>
                            {item.equipment_name}
                            <IconButton size = 'small' className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Typography variant = "caption" display="block" gutterBottom>
                              {item.description}
                            </Typography>

                          </TableCell>
                          
                          <TableCell align="right">${item.deposit}</TableCell>
                            <TableCell align="right">
                              <b>Weeks on Loan: {item.quantity}</b> 
                                        
                                        
                          <div>
                            <IconButton size = 'small' className="material-icons" onClick={()=>{this.handleAddQuantity(item)}}>
                              <SvgIcon>
                                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                              </SvgIcon>
                            </IconButton >
                            <IconButton size = 'small' className="material-icons" onClick={()=>{this.handleSubtractQuantity(item)}}><SvgIcon>
                              <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                              </SvgIcon>
                            </IconButton>

                            
                          </div>
                        </TableCell>
                                                                   
                      </TableRow>
                                    
                    )
                })

            ):

             (
                <p>Nothing.</p>
             )
        
       return(
       <Container> 
       <Box width="auto">
           
              
                <h5>You have ordered:</h5>
                <Card>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan = {2}>Eq. Name</TableCell>
                      
                      <TableCell align="right">Deposit</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addedItems}
                    <TableRow>
            <TableCell rowSpan={3} colSpan={1}/>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{this.props.total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>M. Fee</TableCell>
            <TableCell align="right">5%</TableCell>
            <TableCell align="right">{(this.props.total*0.05).toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Returned</TableCell>
            <TableCell align="right">{(this.props.total*0.95).toFixed(2)}</TableCell>
          </TableRow>
                  </TableBody>
                </Table>
                </Card>
                <CardActions style={{justifyContent: 'flex-end'}}>
                    <Button style = {{width:'420px'}}variant='contained' color="secondary" component={AdapterLink} to="/checkout">
                       <Typography variant="button" display="block" gutterBottom>Proceed to Checkout</Typography>
                    </Button>
                    
                </CardActions>

                
                
              </Box>
              </Container>
       )
    }
}
const mapStateToProps = (state)=>{
    return{
        items: state.cartReducer.addedItems,
        total: state.cartReducer.total
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (eq)=>{dispatch(addQuantity(eq))},
        subtractQuantity: (eq)=>{dispatch(subtractQuantity(eq))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)