import axios from "axios";
import { medicineRoute } from "../../utils/APIRoutes";
import { MEDICINE_DETAIL_FAIL, MEDICINE_DETAIL_REQUEST, MEDICINE_DETAIL_SUCCESS, MEDICINE_LIST_FAIL, MEDICINE_LIST_REQUEST, MEDICINE_LIST_SUCCESS } from "../constants/medicine.constant"

export const listMedicine = () => async (dispatch) => {
  try{

    dispatch({ type: MEDICINE_LIST_REQUEST });

    const { data } = await axios.get(medicineRoute)

    dispatch({ type: MEDICINE_LIST_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: MEDICINE_LIST_FAIL,
      payload: error.response.data.message
    })

  }
}

export const detailMedicine = (id) => async (dispatch) => {
  try{

    dispatch({ type: MEDICINE_DETAIL_REQUEST });

    const { data } = await axios.get(`${medicineRoute}/${id}`)

    dispatch({ type: MEDICINE_DETAIL_SUCCESS, payload: data });    

  }catch(error){

    dispatch({
      type: MEDICINE_DETAIL_FAIL,
      payload: error.response.data.message
    })

  }
}