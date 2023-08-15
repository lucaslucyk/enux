import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    // RESET_PASSWORD_SUCCESS,
    // RESET_PASSWORD_FAIL,
    // RESET_PASSWORD_CONFIRM_SUCCESS,
    // RESET_PASSWORD_CONFIRM_FAIL,
    LOGOUT
} from './types'
import { setAlert } from './alert'
import axios from 'axios'
import { tokenCreate, tokenVerify } from '../../services/auth'


export const checkAuthenticated = () => async dispatch => {
    const token = localStorage.getItem('access');
    if(token){
        try {
            if (await tokenVerify(token)) {
                dispatch({type: AUTHENTICATED_SUCCESS});
            } else {
                dispatch(refresh());
            }
        } catch {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}


export const signup = ({first_name, last_name, email, password, re_password}) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/users/`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam','success'))
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error al crear cuenta', 'error'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'error'));
    }
};

export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `${import.meta.env.VITE_TOKEN_TYPE} ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/users/me/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const login = ({email, password}) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const token = await tokenCreate({email, password})
        dispatch({
            type: LOGIN_SUCCESS,
            payload: token
        });
        dispatch(setAlert('Successful login', 'success'));
    }
    catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch(setAlert(err.message || "Login error.", 'error'));
    }
    
    dispatch({
        type: REMOVE_AUTH_LOADING
    });
}

export const activate = ({uid, token}) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/users/activation/`, body, config);
    
        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS
            });
            dispatch(setAlert('Account activated successfully', 'success'));
        } else {
            dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert('Error activating account', 'error'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
    catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error connecting to the server, please try again later.', 'error'));
    }
};

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Succesfully logged out', 'success'));
}