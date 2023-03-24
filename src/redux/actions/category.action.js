import axios from "axios";
import { categoryRoute } from "../../utils/APIRoutes";
import { CATEGORY_DETAIL_FAIL, CATEGORY_DETAIL_REQUEST, CATEGORY_DETAIL_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/category.constant";

export const listCategory = () => async (dispatch) => {
  try{

    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(categoryRoute)

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}

export const detailCategory = (id) => async (dispatch) => {
  try{

    dispatch({ type: CATEGORY_DETAIL_REQUEST });

    const { data } = await axios.get(`${categoryRoute}/${id}`)

    dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: CATEGORY_DETAIL_FAIL,
      payload: error.response.data.msg
      // error.response && error.response.data.message ?
      // error.response.data.message : error.message
    })

  }
}