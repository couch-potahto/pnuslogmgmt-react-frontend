//import { ADD_TO_CART, ADD_QUANTITY, REMOVE_ITEM, SUB_QUANTITY, FIRST_NAME_FILLED_IN, CONTACT_FILLED_IN, SUBMIT_REQUEST, REQUEST_SUCCESS, REQUEST_FAILED } from '../actions/action-types/cart-actions'
import { LOGIN_SUCCESS } from '../actions/action-types/admin-actions';

const initState = {
    username: "",
    password: "",
    token: "",
    logged_in: false
}

const adminReducer= (state = initState, action)=>{
    //INSIDE HOME COMPONENT
    console.log(action)
    if(action.type === LOGIN_SUCCESS){
        return{
            ...state,
            username: action.res.config.data['username'],
            token: action.res.token,
            logged_in: true
        }
    }
    return state
}

export default adminReducer