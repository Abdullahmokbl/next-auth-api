import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { deleteCookie, getCookie, setCookie } from "cookies-next";

const addToken = () => {
    // get token
    // const token = getCookie('token')
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    }

    // if (token) axiosConfig.headers['x-auth-token'] = token;

    return axiosConfig;
}

export const getUsers = createAsyncThunk('users/get', async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/users", addToken());
    return res.data;
})
export const getSomeUsers = createAsyncThunk('users/getsome', async (pageNum) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/users?page="+pageNum, addToken());
    return res.data;
})
// export const addToCart = createAsyncThunk('cart/add', async (cart, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(process.env.NEXT_PUBLIC_API+"/users/cart", cart, addToken());
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const delFromCart = createAsyncThunk('cart/del', async (cart, {rejectWithValue}) => {
//     try{
//         const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/users/cart", {data: cart, headers: addToken().headers});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
export const delUser = createAsyncThunk('user/del', async (id, {rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/users?id="+id);
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const delAllUsers = createAsyncThunk('users/del', async (s, {rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/users", addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
// export const SearchByEmail = createAsyncThunk('user/forget', async(email, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(process.env.NEXT_PUBLIC_API+"/users/searchByEmail", {email});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const createCode = createAsyncThunk('code/create', async({email, mobile}, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(process.env.NEXT_PUBLIC_API+"/code/create", {email, mobile});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const verifyCode = createAsyncThunk('code/verify', async({email, code}, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(process.env.NEXT_PUBLIC_API+"/code/verify", {email, code});
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })
// export const sendMail = createAsyncThunk('mail/send', async (email, {rejectWithValue}) => {
//     try{
//         const res = await axios.post(process.env.NEXT_PUBLIC_API+"/mail", email);
//         return res.data;
//     }catch(e){
//         return rejectWithValue(e.response.data);
//     }
// })

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: null,
        cart: [],
        token: null,
        isAuthenticated: false,
        isLoading: null,
        someUsers: null,
        email: null,
        mobile: null
    },
    reducers: {
        // logout: state => {
        //     deleteCookie('token')
        //     state.token = null;
        //     state.user = null;
        //     state.isAuthenticated = false;
        // }
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
        },
        [getSomeUsers.fulfilled]: (state, action) => {
            state.someUsers = action.payload.users;
        },
        [getUsers.rejected]: (state, error) => {},
        [delUser.fulfilled]: (state, action) => {
            return {
                ...state,
                someUsers: [...state.someUsers].filter(p => p._id !== action.payload.id)
            }
        },
        [delAllUsers.fulfilled]: (state, action) => {
            state.someUsers = [];
        },
        // [addToCart.fulfilled]: (state, action) => {
        //     state.cart = [...state.cart, action.payload];
        // },
        // [delFromCart.fulfilled]: (state, action) => {
        //     state.cart = [...state.cart].filter(product => product._id !== action.payload)
        // },
        // [SearchByEmail.fulfilled]: (state, action) => { 
        //     state.email = action.payload.email
        // }
    }
});

// export const { logout } = usersSlice.actions;

export default usersSlice.reducer;