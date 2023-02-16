import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = '/api/'

export const addToCart = createAsyncThunk('cart/add', async (cart, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'cart', cart, axiosConfig)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const delFromCart = createAsyncThunk('cart/del', async (cart, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + 'cart', { data: cart, headers: axiosConfig.headers })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const getFromLocalStorage = key => {
  if (!key || typeof window === 'undefined') {
    return ''
  }
  return localStorage.getItem(key)
}

const initialState = {
  cart: getFromLocalStorage('cart') ? JSON.parse(getFromLocalStorage('cart')) : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const items = JSON.parse(localStorage.getItem('cart')) || []
      // console.log(items)
      const item = state.cart.find(product => product._id === action.payload._id)
      if (item) {
        items.forEach(i => i._id === item._id && i.qty++)
        localStorage.setItem('cart', JSON.stringify(items))
        item.qty++
        // state.cart = [...state.cart, {...action.payload, qty: item.qty +1}];
      } else {
        items.push({ ...action.payload, qty: 1 })
        localStorage.setItem('cart', JSON.stringify(items))
        state.cart.push({ ...action.payload, qty: 1 })
        // state.cart = [...state.cart, {...action.payload, qty:1}];
      }
      // state.cart = [...state.cart, action.payload];
    },
    decCart: (state, action) => {
      const items = JSON.parse(localStorage.getItem('cart'))
      items.forEach(i => i._id === action.payload._id && i.qty--)
      localStorage.setItem('cart', JSON.stringify(items))
      state.cart.map(i => i._id === action.payload._id && i.qty--)
    },
    delCart: (state, action) => {
      const items = JSON.parse(localStorage.getItem('cart'))
      const newItems = items.filter(product => product._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(newItems))
      state.cart = [...state.cart].filter(product => product._id !== action.payload)
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, action) => {
      state.cart = [...state.cart, action.payload]
    },
    [delFromCart.fulfilled]: (state, action) => {
      state.cart = [...state.cart].filter(product => product._id !== action.payload)
    },
  },
})

export const { addCart, decCart, delCart } = cartSlice.actions

export default cartSlice.reducer
