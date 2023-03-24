import axios from "axios";
import Cookies from "js-cookie";
import { orderRoute } from "../../utils/APIRoutes";
import { ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/order.constant";

const accessToken = Cookies.get('accessToken')

export const listOrder = () => async (dispatch) => {
  
  try{

    dispatch({ type: ORDER_LIST_REQUEST });

    const { data } = await axios.get(orderRoute, {
      headers: {
        Authorization: accessToken
      }
    })

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}

export const detailOrder = (id) => async (dispatch) => {

  try{

    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { data } = await axios.get(`${orderRoute}/orderId/${id}`, {
      headers: {
        Authorization: accessToken
      }
    })

    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}