import React from 'react'
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_BEGIN,
    REGISTER_ERRORS,
    REGISTER_SUCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERRORS,
    LOGIN_USER_SUCESS
} from './action'

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return (
            {
                ...state,
                showAlert: true,
                alertType: "danger",
                alertText: "please provide all values!"
            }
        )
    }

    if (action.type === CLEAR_ALERT) {
        return ({
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        })
    }

    if (action.type === REGISTER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === REGISTER_SUCESS) {
        return (
            {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userlocation: action.payload.location,
                joblocation : action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Created Redirecting...'
            }
        )
    }

    if (action.type === REGISTER_ERRORS) {
        return (
            {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        )
    }


    throw new Error(`no such action : ${action.type}`)
}

export default reducer