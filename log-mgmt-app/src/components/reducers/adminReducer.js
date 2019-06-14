//import { ADD_TO_CART, ADD_QUANTITY, REMOVE_ITEM, SUB_QUANTITY, FIRST_NAME_FILLED_IN, CONTACT_FILLED_IN, SUBMIT_REQUEST, REQUEST_SUCCESS, REQUEST_FAILED } from '../actions/action-types/cart-actions'
import { LOGIN_SUCCESS, GET_REQUEST_SUCCESS, REQUEST_DETAIL_SUCCESS } from '../actions/action-types/admin-actions';

const initState = {

    username: "",
    password: "",
    token: localStorage.getItem('token'),
    logged_in: false,
    all_requests: [],
    request_detail:{'equipments':[]},

}

const adminReducer= (state = initState, action)=>{
    //INSIDE HOME COMPONENT
    console.log(action)
    
    if(action.type === LOGIN_SUCCESS){
        return{
            ...state,
            username: action.res.config.data['username'],
            token: action.res.data.token,
            logged_in: true
        }
    }
    if(action.type === GET_REQUEST_SUCCESS){
        
        return{
            ...state,
            all_requests: action.res
        }
        
    }
    if(action.type === REQUEST_DETAIL_SUCCESS){
        return{
            ...state,
            request_detail: action.res.data
        }
    }
    return state
}

export default adminReducer