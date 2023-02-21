import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// const url = process.env.NEXT_PUBLIC_API
const url = '/api/'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
}

export const signup = createAsyncThunk('user/add', async (user, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'signup', user, axiosConfig)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const getUsers = createAsyncThunk('users/get', async () => {
  const res = await axios.get(url + 'users', axiosConfig)
  return res.data
})
export const getSomeItems = createAsyncThunk('users/getsome', async ({ page, limit }) => {
  const res = await axios.get(url + 'users?page=' + page + '&limit=' + limit, axiosConfig)
  return res.data
})
export const updateUser = createAsyncThunk('user/update', async (user, { rejectWithValue }) => {
  try {
    const res = await axios.put(url + 'users', { data: user, headers: axiosConfig.headers })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const delUser = createAsyncThunk('user/del', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + 'users?id=' + id)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const delAllUsers = createAsyncThunk('users/del', async (s, { rejectWithValue }) => {
  try {
    const res = await axios.delete(url + 'users', axiosConfig)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const SearchByEmail = createAsyncThunk('user/forget', async (email, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'users/searchByEmail', { email })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const createCode = createAsyncThunk('code/create', async ({ email, mobile }, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'code/create', { email, mobile })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const verifyCode = createAsyncThunk('code/verify', async ({ email, code }, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'code/verify', { email, code })
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})
export const sendMail = createAsyncThunk('mail/send', async (email, { rejectWithValue }) => {
  try {
    const res = await axios.post(url + 'mail', email)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const initialState = {
  users: [],
  someItems: null,
  page: 1,
  pageItems: null,
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: null,
  email: null,
  mobile: null,
}
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [...action.payload]
    },
    getPageItems: (state, action) => {
      const { page, limit } = action.payload
      state.page = page
      state.pageItems = state.users.slice((page - 1) * limit, limit * page)
    },
  },
  extraReducers: {
    [getSomeItems.fulfilled]: (state, action) => {
      state.someItems = action.payload.users
    },
    [delUser.fulfilled]: (state, action) => {
      return {
        ...state,
        someItems: [...state.someItems].filter(p => p._id !== action.payload.id),
      }
    },
    [delAllUsers.fulfilled]: state => {
      state.someItems = []
    },
    // [SearchByEmail.fulfilled]: (state, action) => {
    //     state.email = action.payload.email
    // }
  },
})

export const { setUsers, getPageItems } = usersSlice.actions

export default usersSlice.reducer
