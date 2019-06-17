//import { ADD_TO_CART, ADD_QUANTITY, REMOVE_ITEM, SUB_QUANTITY, FIRST_NAME_FILLED_IN, CONTACT_FILLED_IN, SUBMIT_REQUEST, REQUEST_SUCCESS, REQUEST_FAILED } from '../actions/action-types/cart-actions'
import { LOGIN_SUCCESS, GET_REQUEST_SUCCESS, REQUEST_DETAIL_SUCCESS, ADD_APPROVER, ADD_TICKS, ADD_DATE, EDIT_REQUEST_SUCCESS } from '../actions/action-types/admin-actions';

const initState = {

    username: "",
    password: "",
    token: localStorage.getItem('token'),
    logged_in: false,
    all_requests: [],
    request_detail:{'equipments':[]},

}

function isRequest(request, id){
    return request.id == id
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

    if(action.type === ADD_APPROVER){
        console.log(action)
        let new_request_detail = state.request_detail
        console.log(state)
        new_request_detail.approver_name = action.res
        console.log(new_request_detail)
        return{
            ...state,
            request_detail: new_request_detail
        }
    }

    if(action.type === ADD_TICKS){
        let new_request_detail = state.request_detail
        if(action.res == 'Approved'){
            new_request_detail.approved = !new_request_detail.approved
        }
        else{
            new_request_detail.fulfilled = !new_request_detail.fulfilled
        }
        console.log(new_request_detail)
        return{
            ...state,
            request_detail: new_request_detail
        }
    }

    if(action.type===ADD_DATE){
        let new_request_detail = state.request_detail
        if(action.payload.type == 'borrow'){
            new_request_detail.borrow_date = action.payload.date
        }
        else{
            new_request_detail.return_date = action.payload.date
        }
        return{
            ...state,
            request_detail: new_request_detail
        }
    }

    if(action.type === EDIT_REQUEST_SUCCESS){
        //const index = state.all_requests.data.findIndex(request => request['id'] == action.res.data['id'])
        //let new_all_requests = state.all_requests
        //new_all_requests.data[index] = action.res.data
        //console.log(index)
        return{
            ...state,
            //all_requests: new_all_requests,
            request_detail: {'equipments':[]}

        }

    }

    return state
}

export default adminReducer