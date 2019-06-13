import { SEARCH_EQ, FETCH_EQ } from '../actions/action-types/home-actions'

const initialState={
	allEquipment: []
}

export default function homeReducer(state = initialState, action){
	switch(action.type){
		case SEARCH_EQ:
		  return {
		  	...state,
		  	allEquipment: action.payload
		  }
		case FETCH_EQ:
		  return{
		  	...state,
		  	allEquipment: action.eq
		  }
		default:
		  return state;
	}
}