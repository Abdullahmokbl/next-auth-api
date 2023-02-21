import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { deleteCookie, getCookie, setCookie } from "cookies-next";

const url = '/api/'

const addToken = () => {
  // get token
  // const token = getCookie('token')

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  }

  // if (token) axiosConfig.headers['x-auth-token'] = token;

  return axiosConfig
}

export const addProduct = createAsyncThunk('product/add', async (product, { rejectWithValue }) => {
  // get token
  // const token = getCookie('token')

  let axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=something',
      'Access-Control-Allow-Origin': '*',
    },
  }

  // if (token) axiosConfig.headers['x-auth-token'] = token;

  try {
    const res = await axios.post(url + '/products', product, axiosConfig)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const getSomeItems = createAsyncThunk('products/some', async ({ page, limit }) => {
  const res = await axios.get(url + '/products?page=' + page + '&limit=' + limit, addToken())
  return res.data
})
export const delProduct = createAsyncThunk('product/del', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + '/products?id=' + id)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const delAllProducts = createAsyncThunk('products/del', async (s, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + '/products', addToken())
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    someItems: null,
    page: 1,
    pageItems: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = [...action.payload]
    },
    getPageItems: (state, action) => {
      const { page, limit } = action.payload
      state.page = page
      state.pageItems = state.products.slice((page - 1) * limit, limit * page)
    },
  },
  extraReducers: {
    [addProduct.pending]: state => {},
    [addProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload)
    },
    [addProduct.rejected]: (state, error) => {},
    [getSomeItems.fulfilled]: (state, action) => {
      state.someItems = action.payload.products
    },
    [delProduct.pending]: state => {},
    [delProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        someItems: [...state.someItems].filter(p => p._id !== action.payload.id),
      }
    },
    [delProduct.rejected]: (state, error) => {},
    [delAllProducts.pending]: state => {},
    [delAllProducts.fulfilled]: (state, action) => {
      state.someItems = []
    },
    [delAllProducts.rejected]: (state, error) => {},
  },
})

export const { setProducts, getPageItems } = productsSlice.actions
export default productsSlice.reducer
