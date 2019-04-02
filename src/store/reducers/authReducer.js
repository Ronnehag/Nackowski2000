import {
    LOGIN_USER, LOGOUT_USER
} from '../actions/authAction';

const intialState = { };

export default function authReducer(state = intialState, action) {
    console.log(action);
    switch(action.type){
        case LOGIN_USER:
        break;

        case LOGOUT_USER:
        break;

        default: return state;
    }
}