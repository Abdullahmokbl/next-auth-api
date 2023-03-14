import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = '/api/'
// const url = process.env.NEXT_PUBLIC_API

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
}

export const addItemToCart = createAsyncThunk('cart/add', async (cart, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'cart', cart, axiosConfig)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
// export const decItemInCart = createAsyncThunk('cart/del', async (cart, { rejectWithValue }) => {
//   try {
//     const res = await axios.put(url + 'cart', { data: cart, headers: axiosConfig.headers })
//     return res.data.msg
//   } catch (e) {
//     return rejectWithValue(e.response.data)
//   }
// })
export const delItemFromCart = createAsyncThunk('cart/del', async (cart, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + 'cart', { data: cart, headers: axiosConfig.headers })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const clearAllCart = createAsyncThunk('cart/clear', async (cart, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + 'cart', { data: cart, headers: axiosConfig.headers })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

// const getFromLocalStorage = key => {
//   if (!key || typeof window === 'undefined') {
//     return ''
//   }
//   return localStorage.getItem(key)
// }

const initialState = {
  cart: [],
  // cart: getFromLocalStorage('cart') ? JSON.parse(getFromLocalStorage('cart')) : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    makeCart: (state, action) => {
      console.log(action.payload)
      state.cart = [...action.payload]
      console.log(state.cart)
    },
    //   addCart: (state, action) => {
    //     const items = JSON.parse(localStorage.getItem('cart')) || []
    //     // console.log(items)
    //     const item = state.cart.find(product => product._id === action.payload._id)
    //     if (item) {
    //       items.forEach(i => i._id === item._id && i.qty++)
    //       localStorage.setItem('cart', JSON.stringify(items))
    //       item.qty++
    //       // state.cart = [...state.cart, {...action.payload, qty: item.qty +1}];
    //     } else {
    //       items.push({ ...action.payload, qty: 1 })
    //       localStorage.setItem('cart', JSON.stringify(items))
    //       state.cart.push({ ...action.payload, qty: 1 })
    //       // state.cart = [...state.cart, {...action.payload, qty:1}];
    //     }
    //     // state.cart = [...state.cart, action.payload];
    //   },
    //   decCart: (state, action) => {
    //     const items = JSON.parse(localStorage.getItem('cart'))
    //     items.forEach(i => i._id === action.payload._id && i.qty--)
    //     localStorage.setItem('cart', JSON.stringify(items))
    //     state.cart.map(i => i._id === action.payload._id && i.qty--)
    //   },
    //   delCart: (state, action) => {
    //     const items = JSON.parse(localStorage.getItem('cart'))
    //     const newItems = items.filter(product => product._id !== action.payload)
    //     localStorage.setItem('cart', JSON.stringify(newItems))
    //     state.cart = [...state.cart].filter(product => product._id !== action.payload)
    //   },
    //   clearCart: state => {
    //     localStorage.removeItem('cart')
    //     state.cart = []
    //   },
  },
  extraReducers: {
    [addItemToCart.fulfilled]: (state, action) => {
      const { product, type } = action.payload
      const item = state.cart.find(i => i._id === product._id)
      if (item) {
        state.cart.map(i => {
          if (i._id === product._id) {
            if (type === 'inc') {
              i.qty++
              toast.success('Product quantity increased', { position: 'bottom-left' })
            } else {
              i.qty--
              toast.success('Product quantity decreased', { position: 'bottom-left' })
            }
          }
        })
      } else {
        state.cart = [...state.cart, product]
        toast.success('Product added to cart', { position: 'bottom-left' })
      }
    },
    [delItemFromCart.fulfilled]: (state, action) => {
      state.cart = [...state.cart].filter(product => product._id !== action.payload)
      toast.error('Product removed from cart', { position: 'bottom-left' })
    },
    [clearAllCart.fulfilled]: state => {
      state.cart = []
      toast.error('Cart is clear', { position: 'bottom-left' })
    },
  },
})

export const { makeCart } = cartSlice.actions

export default cartSlice.reducer
