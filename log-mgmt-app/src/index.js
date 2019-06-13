import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './components/reducers/index';
import thunk from 'redux-thunk';
import {fetchAllEquipment} from './components/actions/homeActions'

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(fetchAllEquipment());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
