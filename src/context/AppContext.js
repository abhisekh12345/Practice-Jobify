import React, { useReducer } from 'react'
import { useEffect, useContext } from 'react'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_BEGIN,
  REGISTER_SUCESS,
  REGISTER_ERRORS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERRORS,
  LOGIN_USER_SUCESS,
} from './action'

import axios from "axios"

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('userlocation')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userlocation: userlocation || '',
  joblocation: userlocation || "",
}








const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT
      })
    }, 3000);
  }


  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  
  }

  const removeUserToLocalStorage = ({ user, token, location }) => {
    localStorage.removeItem('user', JSON.stringify(user))
    localStorage.removeItem('token', token)
    localStorage.removeItem('location', location)
  
  }


  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      console.log(response)
      const { user, token, location } = response.data
      dispatch({
        type: REGISTER_SUCESS,
        payload: { user, token, location }
      })

      addUserToLocalStorage({ user, token, location })
      removeUserToLocalStorage({user,token,location})

    } catch (error) {
      console.log(error.response)
      dispatch({ type: REGISTER_ERRORS, payload: { msg: error.response.data.msg } })
    }
    clearAlert()

  }

  const loginUser = async (currentUser) => {
    console.log(currentUser)
  }


  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser }}>{children}</AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, AppProvider, useAppContext }