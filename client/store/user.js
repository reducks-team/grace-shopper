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
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CLEAR_USER = 'CLEAR_USER'

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
const removeUser = user => ({type: REMOVE_USER, user})
const addedToCart = updatedCart => ({type: ADD_TO_CART, updatedCart})
const gotCart = activeCart => ({type: GET_CART, activeCart})
const clearedUser = () => ({type: CLEAR_USER})
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

//This clearUser thunk exists to clear the singleUser.error field that pops up when you enter an incorrect username and password
export const clearUser = () => async dispatch => {
  dispatch(clearedUser())
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

export const addToCart = (userId, productId, productCost) => async dispatch => {
  try {
    const updatedCart = await axios.put(
      `/api/cart/${userId}/${productId}/${productCost}`
    )
    dispatch(addedToCart(updatedCart))
    history.push('/products')
  } catch (err) {
    console.error(err)
  }
}

export const getCart = userId => async dispatch => {
  try {
    console.log('getting cart')
    const activeCart = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCart(activeCart))
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
      return {...state, singleUser: {}}
    case ADD_TO_CART:
      return {...state}
    case GET_CART:
      return {
        ...state,
        singleUser: {...state.singleUser, cart: action.activeCart}
      }
    case CLEAR_USER:
      return {...state, singleUser: {}}
    default:
      return state
  }
}
