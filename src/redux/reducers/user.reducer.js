import { MY_INFO_DETAIL_FAIL, MY_INFO_DETAIL_SUCCESS, MY_INFO_REQUEST, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/user.constant"

export const userListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
        data: []
      }

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const userDetailReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {
        loading: true,
        data: []
      }

    case USER_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case USER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const myInfoReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case MY_INFO_REQUEST:
      return {
        loading: true,
        data: []
      }

    case MY_INFO_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }

    case MY_INFO_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}