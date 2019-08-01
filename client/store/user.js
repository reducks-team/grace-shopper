import axios from 'axios'
axios.defaults.withCredentials = true
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = singleUser => ({type: GET_USER, singleUser})
//const removeUser = user => ({type: REMOVE_USER, user})
//const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser.singleUser))
  } catch (err) {
    console.error(err)
  }
}
// get single user THUNK  ---  UNNECESSARY?
/* export const getSingleUser = user => async dispatch => {
  try {
    const userData = await axios.get(`/api/users/:${user.id}`)
    dispatch(gotSingleUser(userData))
  } catch (err) {
    console.error(err)
  }
} */

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, singleUser: action.singleUser}
    case REMOVE_USER:
      return state
    case UPDATE_USER:
      return state
    default:
      return state
  }
}
