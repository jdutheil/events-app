import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'

import {
  ARTIST_REGISTER_SUCCESS,
  ARTIST_REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types'

// Handle errors linked to Auth
const manageAuthErrors = (err, dispatch, dispatchType = AUTH_ERROR) => {
  const errors = err.response.data.errors

  if (errors) {
    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
  }

  dispatch({
    type: dispatchType,
  })
}

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/artists/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// Register artist user
export const artistRegister = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/artists', body, config)

    dispatch({
      type: ARTIST_REGISTER_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())

    dispatch(setAlert('Inscription réussie, bienvenue !', 'success'))
  } catch (err) {
    manageAuthErrors(err, dispatch, ARTIST_REGISTER_FAIL)
  }
}

// Login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/artists/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())

    dispatch(setAlert('Vous êtes maintenant identifié', 'success', 5000))
  } catch (err) {
    manageAuthErrors(err, dispatch, LOGIN_FAIL)
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
  dispatch(setAlert('Vous êtes maintenant déconnecté', 'success', 5000))
}
