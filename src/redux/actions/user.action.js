import axios from "axios";
import Cookies from "js-cookie";
import { userRoute } from "../../utils/APIRoutes";
import { MY_INFO_DETAIL_FAIL, MY_INFO_DETAIL_SUCCESS, MY_INFO_REQUEST, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/user.constant";

const accessToken = Cookies.get('accessToken')

export const listUser = () => async (dispatch) => {
  const accessToken = Cookies.get("accessToken");

  try {

    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await axios.get(userRoute, {
      headers: {
        Authorization: accessToken,
      },
    })

    dispatch({ type: USER_LIST_SUCCESS, payload: data });

  } catch (error) {

    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}

export const detailUser = () => async (dispatch) => {
  try {

    dispatch({ type: USER_DETAIL_REQUEST });

    const { data } = await axios.get(`${userRoute}`)

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });

  } catch (error) {

    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}

export const myInfo = () => async (dispatch) => {
  try {

    dispatch({ type: MY_INFO_REQUEST });

    const { data } = await axios.get(`${userRoute}/me`, {
      headers: {
        Authorization: accessToken
      }
    })

    dispatch({ type: MY_INFO_DETAIL_SUCCESS, payload: data });

  } catch (error) {

    dispatch({
      type: MY_INFO_DETAIL_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}