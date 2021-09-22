import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
// reducers
import goodsReducer from './../../modules/Goods/reducers/goodsReducer'

let reducers = combineReducers({
  goodsReducer,
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));