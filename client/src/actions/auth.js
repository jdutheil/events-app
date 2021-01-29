import axios from 'axios'

import { setAlert } from './alert'

import { ARTIST_REGISTER_SUCCESS, ARTIST_REGISTER_FAIL } from './types'

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

    dispatch(setAlert('Inscription réussie, bienvenue !', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ARTIST_REGISTER_FAIL,
    })
  }
}
