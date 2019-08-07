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
const gotProduct = singleProduct => ({type: GET_PRODUCT, singleProduct})
const gotProducts = allProducts => ({type: GET_PRODUCTS, allProducts})
//const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products', {isAdmin: true})
    dispatch(gotProducts(res.data || defaultProduct.allProducts))
  } catch (err) {
    console.error(err)
  }
}

export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(gotProduct(res.data || defaultProduct.singleProduct))
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
      return {...state, singleProduct: action.singleProduct}
    case GET_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    default:
      return state
  }
}
