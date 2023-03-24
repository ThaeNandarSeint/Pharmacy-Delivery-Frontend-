import { MEDICINE_DETAIL_FAIL, MEDICINE_DETAIL_REQUEST, MEDICINE_DETAIL_SUCCESS, MEDICINE_LIST_FAIL, MEDICINE_LIST_REQUEST, MEDICINE_LIST_SUCCESS } from "../constants/medicine.constant";

export const medicineListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case MEDICINE_LIST_REQUEST:
      return {
        loading: true,
        data: []
      }

    case MEDICINE_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case MEDICINE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const medicineDetailReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case MEDICINE_DETAIL_REQUEST:
      return {
        loading: true,
        data: []
      }

    case MEDICINE_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case MEDICINE_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}