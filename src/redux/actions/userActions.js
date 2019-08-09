import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED
} from "../reducers/types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
        setAuthorisation(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
        setAuthorisation(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch =>{
    localStorage.removeItem('fbIdToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({type:SET_UNAUTHENTICATED})
}
export const getUserData = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

const setAuthorisation = (bearer) => {
    const fbIdToken = `Bearer ${bearer}`;
      localStorage.setItem("fbIdToken", fbIdToken);
      axios.defaults.headers.common["Authorization"] = fbIdToken;
      
}