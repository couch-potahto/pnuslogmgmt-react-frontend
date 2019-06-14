import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
    
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

        {props.items.map(product => (
          <ListItem className={classes.listItem} key={product.ide}>
            <ListItemText primary={product.equipment_name} secondary={product.description + ' for ' + product.quantity + ' week '} />
            <Typography variant="body2">${product.deposit} </Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${props.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Loaning To:
          </Typography>
          <Typography gutterBottom>{props.borrower_name}</Typography>
          
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Contact Detail
          </Typography>
          <Typography gutterBottom>{props.borrower_contact}</Typography>
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
/*const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (eq)=>{dispatch(addQuantity(eq))},
        subtractQuantity: (eq)=>{dispatch(subtractQuantity(eq))}
    }
}*/
export default connect(mapStateToProps)(Review)