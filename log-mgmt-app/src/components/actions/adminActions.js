import axios from 'axios';
import { LOGIN_SUCCESS } from './action-types/admin-actions';
const apiUrl = 'http://localhost:8000/token-auth/'

const successLogin = res => ({
    type: LOGIN_SUCCESS,
    res
})

export const handleLogin= (details)=>{
    
    return dispatch => {
        
        axios.post(apiUrl, {username: details['AdminUser'], password: details['password'] })
        .then(res => {
            localStorage.setItem('token', res.token);
            dispatch(successLogin(res))
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

