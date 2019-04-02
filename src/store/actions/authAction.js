const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

export function loginUser(username) {
    return dispatch => {
        sessionStorage.setItem("user", username);
        dispatch({ type: LOGIN_USER, payload: username });
    }
}

export function logoutUser() {
    return dispatch => {
        sessionStorage.removeItem("user");
        dispatch({ type: LOGOUT_USER });
    }
}