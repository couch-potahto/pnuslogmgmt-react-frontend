import { SEARCH_EQ, FETCH_EQ } from './action-types/home-actions';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/core/api/equipment/'
export const searchEquipment=(term)=>{
	console.log(apiUrl + term)
	return (dispatch) => {
		return axios.get(apiUrl + 'search/' + term)
			.then(response => {
				dispatch(searchSuccess(response.data))
				
			})
			.catch(error => {
				dispatch(fetchAllEquipment())
			});
	};
};

export const searchSuccess = (data) => {
	return {

		type: SEARCH_EQ,
		payload: data
	}
}

export const fetchEq = (eq) => {
	return {
		type: FETCH_EQ,
		eq
	}
}

export const fetchAllEquipment = () =>{
  return(dispatch)=>{
  	return axios.get(apiUrl+'all')
  	  .then(response => {
  	  	dispatch(fetchEq(response.data))
  	  })
  	  .catch(error=>{
  	  	throw(error);
  	  });
  };
};