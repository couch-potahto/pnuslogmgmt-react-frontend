import { ADD_TO_CART, REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, FIRST_NAME_FILLED_IN, CONTACT_FILLED_IN, SUBMIT_REQUEST, REQUEST_SUCCESS, REQUEST_FAILED } from './action-types/cart-actions';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/core/api/request/'
export const addToCart= (eq)=>{
	return{
	  type: ADD_TO_CART,
      eq
    }
}

export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(eq)=>{
    return{
        type: SUB_QUANTITY,
        eq
    }
}
//add qt action
export const addQuantity=(eq)=>{
    return{
        type: ADD_QUANTITY,
        eq
    }
}

export const fNameFilledIn=(val)=>{
    
    return{
        type: FIRST_NAME_FILLED_IN,
        val
    }
}

export const contactFilledIn=(val)=>{
    
    return{
        type: CONTACT_FILLED_IN,
        val
    }
}

const successRequest = res => ({
    type: REQUEST_SUCCESS,
    res
})

export const submitRequest = (cart) => {
    return dispatch => {
        axios.post(apiUrl + 'create', {cart})
            .then(res => {
                dispatch(successRequest(res))
            })
            .catch(error=>{
                throw(error);
            });
    };
};

