import { DELIVERYPERSON_DETAIL_FAIL, DELIVERYPERSON_DETAIL_REQUEST, DELIVERYPERSON_DETAIL_SUCCESS, DELIVERYPERSON_LIST_FAIL, DELIVERYPERSON_LIST_REQUEST, DELIVERYPERSON_LIST_SUCCESS } from "../constants/deliveryPerson.constant"


export const deiveryPersonListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case DELIVERYPERSON_LIST_REQUEST:
      return {
        loading: true,
        data: []
      }

    case DELIVERYPERSON_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case DELIVERYPERSON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const deiveryPersonDetailReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case DELIVERYPERSON_DETAIL_REQUEST:
      return {
        loading: true,
        data: []
      }

    case DELIVERYPERSON_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case DELIVERYPERSON_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}