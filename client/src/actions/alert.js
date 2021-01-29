import { v4 as uuid } from 'uuid'

import { SET_ALERT, REMOVE_ALERT, EMPTY_ALERT } from './types'

export const setAlert = (msg, alertType, timeout = -1) => (dispatch) => {
  const id = uuid()
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  })

  if (timeout !== -1) {
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    )
  }
}

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  })
}

export const emptyAlert = () => (dispatch) => {
  dispatch({
    type: EMPTY_ALERT,
  })
}
