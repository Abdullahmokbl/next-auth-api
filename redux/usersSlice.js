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
export const getSomeUsers = createAsyncThunk('users/getsome', async ({ page, limit }) => {
  const res = await axios.get(url + 'users?page=' + page + '&limit=' + limit, axiosConfig)
  return res.data
})
// export const addToCart = createAsyncThunk('cart/add', async (cart, { rejectWithValue }) => {
//   try {
//     const res = await axios.post(url + 'cart', cart, axiosConfig)
//     return res.data
//   } catch (e) {
//     return rejectWithValue(e.response.data)
//   }
// })
// export const delFromCart = createAsyncThunk('cart/del', async (cart, { rejectWithValue }) => {
//   try {
//     const res = await axios.delete(url + 'cart', { data: cart, headers: axiosConfig.headers })
//     return res.data
//   } catch (e) {
//     return rejectWithValue(e.response.data)
//   }
// })
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
// export const SearchByEmail = createAsyncThunk('user/forget', async(email, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(url+"users/searchByEmail", {email});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const createCode = createAsyncThunk('code/create', async({email, mobile}, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(url+"code/create", {email, mobile});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const verifyCode = createAsyncThunk('code/verify', async({email, code}, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(url+"code/verify", {email, code});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const sendMail = createAsyncThunk('mail/send', async (email, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(url+"mail", email);
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })

// const getFromLocalStorage = key => {
//   if (!key || typeof window === 'undefined') {
//     return ''
//   }
//   return localStorage.getItem(key)
// }

const initialState = {
  users: [],
  someUsers: null,
  pageUsers: null,
  user: null,
  // cart: getFromLocalStorage('cart') ? JSON.parse(getFromLocalStorage('cart')) : [],
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
    getPageUsers: (state, action) => {
      const { page, limit } = action.payload
      state.pageUsers = state.users.slice((page - 1) * limit, limit * page)
    },
    // addCart: (state, action) => {
    //   const items = JSON.parse(localStorage.getItem('cart')) || []
    //   // console.log(items)
    //   const item = state.cart.find(product => product._id === action.payload._id)
    //   if (item) {
    //     items.forEach(i => i._id === item._id && i.qty++)
    //     localStorage.setItem('cart', JSON.stringify(items))
    //     item.qty++
    //     // state.cart = [...state.cart, {...action.payload, qty: item.qty +1}];
    //   } else {
    //     items.push({ ...action.payload, qty: 1 })
    //     localStorage.setItem('cart', JSON.stringify(items))
    //     state.cart.push({ ...action.payload, qty: 1 })
    //     // state.cart = [...state.cart, {...action.payload, qty:1}];
    //   }
    //   // state.cart = [...state.cart, action.payload];
    // },
    // decCart: (state, action) => {
    //   const items = JSON.parse(localStorage.getItem('cart'))
    //   items.forEach(i => i._id === action.payload._id && i.qty--)
    //   localStorage.setItem('cart', JSON.stringify(items))
    //   state.cart.map(i => i._id === action.payload._id && i.qty--)
    // },
    // delCart: (state, action) => {
    //   const items = JSON.parse(localStorage.getItem('cart'))
    //   const newItems = items.filter(product => product._id !== action.payload)
    //   localStorage.setItem('cart', JSON.stringify(newItems))
    //   state.cart = [...state.cart].filter(product => product._id !== action.payload)
    // },
  },
  extraReducers: {
    [getSomeUsers.fulfilled]: (state, action) => {
      state.someUsers = action.payload.users
    },
    [delUser.fulfilled]: (state, action) => {
      return {
        ...state,
        someUsers: [...state.someUsers].filter(p => p._id !== action.payload.id),
      }
    },
    [delAllUsers.fulfilled]: state => {
      state.someUsers = []
    },
    // [addToCart.fulfilled]: (state, action) => {
    //   state.cart = [...state.cart, action.payload]
    // },
    // [delFromCart.fulfilled]: (state, action) => {
    //   state.cart = [...state.cart].filter(product => product._id !== action.payload)
    // },
    // [SearchByEmail.fulfilled]: (state, action) => {
    //     state.email = action.payload.email
    // }
  },
})

export const { setUsers, getPageUsers } = usersSlice.actions

export default usersSlice.reducer
