import { AUTH_LOGIN_FAIL, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "../constants/auth.constant"

export const loginReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                loading: true,
                data: []
            }

        case AUTH_LOGIN_SUCCESS:
            return {
                loading: false,
                data: action.payload
            }

        case AUTH_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case AUTH_LOGOUT:
            return {
                loading: false,
                data: action.payload
            }

        default:
            return state
    }
}