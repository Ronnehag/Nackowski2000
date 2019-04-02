import {
    LOGIN_USER, LOGOUT_USER
} from '../actions/authAction';

const intialState = {
    user: {
        username: "",
        isLoggedIn: false
    }
};

export default function authReducer(state = intialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: {
                    username: action.payload,
                    isLoggedIn: true
                }
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: {
                    username: "",
                    isLoggedIn: false
                }
            }

        default: return state;
    }
}