import axios from "axios";
import { authRoute } from "../../utils/APIRoutes";
import { AUTH_LOGIN_FAIL, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from "../constants/auth.constant";

export const login = (email, password) => async (dispatch) => {
  try{

    dispatch({ type: AUTH_LOGIN_REQUEST });

    const { data } = await axios.post(`${authRoute}/login`, {
        email, password
    })

    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });    

    localStorage.setItem('userInfo', JSON.stringify(data))

  }catch(error){

    dispatch({
      type: AUTH_LOGIN_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}