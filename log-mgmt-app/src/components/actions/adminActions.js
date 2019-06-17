import axios from 'axios';
import { LOGIN_SUCCESS, GET_REQUEST_SUCCESS, REQUEST_DETAIL_SUCCESS, ADD_APPROVER, ADD_TICKS, ADD_DATE, EDIT_REQUEST_SUCCESS } from './action-types/admin-actions';

const apiUrl = 'http://localhost:8000/token-auth/'
const requestURL = 'http://localhost:8000/core/api/request/'

const successLogin = res => ({
    type: LOGIN_SUCCESS,
    res
})

const getRequestSuccess = res => ({
    type: GET_REQUEST_SUCCESS,
    res
})

const requestDetailSuccess = res => ({
    type: REQUEST_DETAIL_SUCCESS,
    res
})

const updateRequestSuccess = res => ({
    type: EDIT_REQUEST_SUCCESS,
    res
})

export const addRequestApproverName = res => ({

    type: ADD_APPROVER,
    res
})

export const addApprovalCompletion = res => ({
    type: ADD_TICKS,
    res
})

export const addDate = (date, type) => ({
    type: ADD_DATE,
    payload:{
        date: date,
        type: type
    }
})

export const editRequest = (res, token) => {
    return (dispatch)=>{
      axios.patch(requestURL + 'submit/' + res.id + '/',
        {
          headers: {Authorization: "JWT " + token},
          res
        })
        .then(res => {
          dispatch(updateRequestSuccess(res))
        })
    }
}


export const handleLogin= (details)=>{
    
    return(dispatch) => {
        
        axios.post(apiUrl, {username: details['AdminUser'], password: details['password'] })
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token);
            dispatch(successLogin(res))
        })
        .then(
            axios.get(requestURL + 'all')
            .then(res => {
                dispatch(getRequestSuccess(res))
            })

        )
        .catch(error=>{
            throw(error);
        })
    }
}

export const getRequestData = (id, token) => {
    console.log(token)
    return dispatch => {
        axios.get(requestURL + id, 
            {headers: {Authorization: "JWT " + token}}
        )
        .then(res=>{
            dispatch(requestDetailSuccess(res))
        })
        .catch(error=>{
            throw(error);
        })
    }
}

/*export const submitRequest = (cart) => {
    return dispatch => {
        axios.post(apiUrl + 'create', {cart})
            .then(res => {
                dispatch(successRequest(res))
            })
            .catch(error=>{
                throw(error);
            });
    };
};*/

