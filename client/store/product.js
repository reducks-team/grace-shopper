import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
//const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  allProducts: [],
  singleProduct: {}
}

/**
 * ACTION CREATORS
 */
const gotProduct = product => ({type: GET_PRODUCT, product})
const gotProducts = products => ({type: GET_PRODUCTS, products})
//const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotProducts(res.data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/${id}`)
    dispatch(gotProduct(res.data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, singleProduct: action.product}
    case GET_PRODUCTS:
      return {...state, allProducts: action.products}
    default:
      return state
  }
}
