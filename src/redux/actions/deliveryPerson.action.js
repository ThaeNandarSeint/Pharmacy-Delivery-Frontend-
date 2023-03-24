import axios from "axios";
import Cookies from "js-cookie";
import { deliveryPersonRoute } from "../../utils/APIRoutes";
import { DELIVERYPERSON_DETAIL_FAIL, DELIVERYPERSON_DETAIL_REQUEST, DELIVERYPERSON_DETAIL_SUCCESS, DELIVERYPERSON_LIST_FAIL, DELIVERYPERSON_LIST_REQUEST, DELIVERYPERSON_LIST_SUCCESS } from "../constants/deliveryPerson.constant";

const accessToken = Cookies.get('accessToken')

export const listDeliveryPerson = () => async (dispatch) => {
  try{

    dispatch({ type: DELIVERYPERSON_LIST_REQUEST });

    const { data } = await axios.get(deliveryPersonRoute, {
      headers: {
        Authorization: accessToken
      }
    })

    dispatch({ type: DELIVERYPERSON_LIST_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: DELIVERYPERSON_LIST_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}

export const detailDeliveryPerson = () => async (dispatch) => {
  try{

    dispatch({ type: DELIVERYPERSON_DETAIL_REQUEST });

    const { data } = await axios.get(`${deliveryPersonRoute}`, {
      headers: {
        Authorization: accessToken
      }
    })

    dispatch({ type: DELIVERYPERSON_DETAIL_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: DELIVERYPERSON_DETAIL_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}