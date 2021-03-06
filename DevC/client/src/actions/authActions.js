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
// this is justa message
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
export const setCurrentUser = (decoded)=> {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
    // axios.get(`http://localhost:8080/user/find/${decoded}`)
    //     .then(res => {
    //         dispatch({
    //             type: SET_CURRENT_USER,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => console.log(err))
}

// Log user out
export const logoutUser = (history) => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('IdKey');
    // Remove auth header fro future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    // history.push("/");
}