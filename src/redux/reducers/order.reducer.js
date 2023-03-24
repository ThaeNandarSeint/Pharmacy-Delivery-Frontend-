import { ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/order.constant"

export const orderListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
        data: []
      }

    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const orderDetailReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
        data: []
      }

    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}