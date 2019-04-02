import { combineReducers } from 'redux';
import auctions from './auctionReducer';
import auth from './authReducer';

export default combineReducers({
    auctions, auth
});