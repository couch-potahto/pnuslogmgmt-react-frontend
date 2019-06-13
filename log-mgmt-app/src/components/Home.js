import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fade, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { addToCart } from './actions/cartActions';
import { searchEquipment } from './actions/homeActions';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ErrorOutlined from '@material-ui/icons/ErrorOutlined'
import axios from 'axios';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

 var cardStyle = {
    height: '25vw'
}

var cardItemStyle ={
  height: 'auto',

  width: 'auto',

}

const useStylesReddit = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

class Home extends React.Component{

	state = {
		equip: [],
		currentDisabled: []
	}

	handleClick = (eq, index)=>{
		this.props.addToCart(eq);
		const newCurrentDisabled = [...this.state.currentDisabled]
		newCurrentDisabled[index] = true
		this.setState({
			currentDisabled: newCurrentDisabled
		})
		
	}

	onSearch = (e)=>{
		this.props.searchEquipment(e.target.value);
	}

	componentDidMount() {
		
		axios.get('http://localhost:8000/core/api/equipment/all')
			.then(res => {
				const equip = res.data;
				if(this.props.items.length===0){
					this.setState({
						equip: equip,
						currentDisabled: new Array(equip.length).fill(false)
					})
				}
				else{
					let currentDisabled = new Array(equip.length).fill(false)
					for(let i = 0; i < this.props.all_eq.length; i++){
						if ( this.props.items.includes(this.props.all_eq[i])){
							currentDisabled[i] = true
						}
					}
					this.setState({
						equip: equip,
						currentDisabled: currentDisabled
						
					})
				}
			})
	}

	render() {
		if(this.props.all_eq.length > 0){
		var equipmentList = this.props.all_eq.map((eq, index)=> {
		return (
		
			<Grid item xs={6} sm={4} md={4}>
			<Card key = {eq.id}>

			  <CardContent>
			  <Typography gutterBottom variant="h6" component="h5">
			    {eq.equipment_name}
			  </Typography>
			  <Typography variant="body2" color="textSecondary" component="p">
			    {eq.description}
			  </Typography>
			  <Typography>
			    ${eq.deposit}
			  </Typography>
			  
			  </CardContent>
			  <CardActions>
                  <Button 
                    disabled={this.state.currentDisabled[index]}
                    fullWidth variant='outlined'
                    color="secondary"
                    onClick={()=>{this.handleClick(eq, index)}}>
                    <AddIcon />
                  </Button>
                </CardActions>
			</Card>
			</Grid>
		
        )
    })
	}
	else {
		console.log('else')
		equipmentList = 
		<Grid>
		No such item exists! Try another search term
        </Grid>          
	}
	
	return(
		<div>
		<Container maxWidth="sm">
			<h3 className="center">Our items</h3>

      		  <Grid
  				container
  				spacing={0}
  				direction="row"
  				alignItems="center"
  				justify="center"
			  >
			  <FormControl fullWidth>
			  <RedditTextField
                label="Looking for something?"
                onChange={e=>this.onSearch(e)}
                defaultValue=""
                variant="filled"
                id="reddit-input"
              />
              </FormControl>
 			</Grid>
    		
		</Container>
		
		<Container maxWidth="md" component="main">

		<Box mt={5}>
		  <Grid container spacing={2} direction="row" justify="align-left" alignItems="stretch">
		  
		    {equipmentList}
		   
		  </Grid>
		  </Box>
		</Container>

		</div>
	)
}
}
		

const mapStateToProps = (state) =>{
	return {
		items: [...state.cartReducer.addedItems],
		searchItems: state.homeReducer.relevantItems,
		all_eq: state.homeReducer.allEquipment
	}
}

const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        searchEquipment: (term)=>{dispatch(searchEquipment(term))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)