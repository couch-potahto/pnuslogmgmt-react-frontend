import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import cartReducer from './cartReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
	homeReducer: homeReducer,
	cartReducer: cartReducer,
	adminReducer: adminReducer
});

export default rootReducer;