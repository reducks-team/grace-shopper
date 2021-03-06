import axios from 'axios'
axios.defaults.withCredentials = true
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const GET_CART = 'GET_CART'
const CREATE_USER = 'CREATE_USER'
const CLEAR_USER = 'CLEAR_USER'
const CHECKOUT = 'CHECKOUT'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

/**
 * INITIAL STATE
 */
const defaultUser = {
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const gotUser = singleUser => ({type: GET_USER, singleUser})
const createdUser = singleUser => ({type: CREATE_USER, singleUser})
const removedUser = user => ({type: REMOVE_USER, user})
const addedToCart = updatedCart => ({type: ADD_TO_CART, updatedCart})
const updatedCart = updatedCart => ({type: UPDATE_CART, updatedCart})
const gotCart = activeCart => ({type: GET_CART, activeCart})
const checkedOut = () => ({type: CHECKOUT})
const clearedUser = () => ({type: CLEAR_USER})
const gotOrderHistory = history => ({type: GET_ORDER_HISTORY, history})
const updatedUser = updatedUser => ({type: UPDATE_USER, updatedUser})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(gotUser(res.data || defaultUser.singleUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }

  try {
    dispatch(gotUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const createUser = state => async dispatch => {
  let postRes
  let newUser
  let formData
  let userDataForState

  //setting this allowed parameter on the body to be sent protects the route from unauthorized access.  An attacker would not know to have this paramenter, but the code will always include it
  state.allowed = true
  try {
    postRes = await axios.post('/api/users', state)
    newUser = postRes.data.newUser

    //Formdata is required to check the user's password in the form against the hash that was just created (will always match, but the login route will break if there's nothing to check) to log them in immediately upon signup
    formData = postRes.data.body
    formData.allowed = true
  } catch (authError) {
    return dispatch(createdUser({error: authError}))
  }
  try {
    await axios.post(`/api/cart/new/${newUser.id}`, {allowed: true})
  } catch (err) {
    console.error(err)
  }
  try {
    userDataForState = await axios.post(`/auth/login`, formData)
  } catch (err) {
    console.error(err)
  }
  try {
    dispatch(createdUser(userDataForState.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const updateUser = (user, userId) => async dispatch => {
  let res

  //setting this allowed parameter on the body to be sent protects the route from unauthorized access.  An attacker would not know to have this paramenter, but the code will always include it
  user.allowed = true
  try {
    res = await axios.put(`/api/users/${userId}`, user)
  } catch (authError) {
    return dispatch(updatedUser({error: authError}))
  }
  try {
    dispatch(updatedUser(res.data))
    dispatch(gotUser(res.data))
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
    dispatch(removedUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = (userId, productId, productCost) => async dispatch => {
  try {
    const updatedCart = await axios.put('/api/cart/add', {
      userId: userId,
      productId: productId,
      productCost: productCost,
      allowed: true
    })
    dispatch(addedToCart(updatedCart))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

export const updateCart = (
  userId,
  productId,
  productCost,
  quantity
) => async dispatch => {
  try {
    const newCart = await axios.put('/api/cart/update', {
      userId: userId,
      productId: productId,
      productCost: productCost,
      quantity: quantity,
      allowed: true
    })
    dispatch(updatedCart(newCart))
  } catch (err) {
    console.error(err)
  }
}

export const getCart = userId => async dispatch => {
  try {
    const activeCart = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCart(activeCart))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderHistory = userId => async dispatch => {
  try {
    const historicalOrders = await axios.get(`/api/cart/history/${userId}`)
    dispatch(gotOrderHistory(historicalOrders))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = userId => async dispatch => {
  try {
    await axios.put(`/api/cart/checkout/${userId}`, {allowed: true})
    await axios.post(`/api/cart/new/${userId}`, {allowed: true})
    dispatch(checkedOut())
    history.push('/Checkout')
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
    case CREATE_USER:
      return {...state, singleUser: action.singleUser}
    case UPDATE_USER:
      return {...state, singleUser: action.updatedUser}
    case REMOVE_USER:
      return {...state, singleUser: {}}
    case ADD_TO_CART:
      return {
        ...state,
        singleUser: {...state.singleUser, cart: action.updatedCart}
      }
    case GET_CART:
      return {
        ...state,
        singleUser: {...state.singleUser, cart: action.activeCart}
      }
    case UPDATE_CART:
      return {
        ...state,
        singleUser: {...state.singleUser, cart: action.updatedCart}
      }
    case CLEAR_USER:
      return {...state, singleUser: {}}
    case CHECKOUT:
      return {...state}
    case GET_ORDER_HISTORY:
      return {
        ...state,
        singleUser: {...state.singleUser, orderHistory: action.history}
      }
    default:
      return state
  }
}
