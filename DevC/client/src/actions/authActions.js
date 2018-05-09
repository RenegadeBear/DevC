import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
//  REGISTER  User
export const  registerUser = (userData, history) => dispatch => {
     axios
          .post("http://localhost:8080/user/register", userData)
          .then(res => {
                if(res.data.success){
                    // const token = res.data;
                    // localStorage.setItem('IdKey', token);
                    // setAuthToken(token)
                    // dispatch(setCurrentUser(token))
                    history.push('/login')
                }else{
                    dispatch({
                    type: GET_ERRORS,
                    payload: res.data
                    });
                }
          })
          .catch(err => console.log(err));
}

// Login - get user Id
export const loginUser = userData => dispatch => {
    axios.post("http://localhost:8080/user/login", userData)
        .then(res => {
            if(res.data.success){                
            // save to localstore
                const  token  = res.data;
            // set id to localStorage
                localStorage.setItem('IdKey', token.user_id);
                // Set token to auth header
                setAuthToken(token);
                // Set current user
                dispatch(setCurrentUser(token))
            }else{
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data
                })                
            }
        })
        .catch(err => console.log(err))
}

// Set loggin in user 
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // remove token from localStorage
    localStorage.removeItem('IdKey');
    // remove auth header fro future requests
    setAuthToken(false);
    // set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}