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

export const addProduct = createAsyncThunk('product/add', async (product, {rejectWithValue}) => {
    // get token
    // const token = getCookie('token')

    let axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=something',
            'Access-Control-Allow-Origin': '*',
        }
    }

    // if (token) axiosConfig.headers['x-auth-token'] = token;
        
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_API+"/products", product, axiosConfig);
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const getSomeProducts = createAsyncThunk('products/some', async(pageNum) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+'/products?page='+pageNum, addToken())
    return res.data;
})
export const delProduct = createAsyncThunk('product/del', async (id, {rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/products?id="+id);
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const delAllProducts = createAsyncThunk('products/del', async (s,{rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/products", addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        someProducts: null
        },
    extraReducers: {
        [addProduct.pending]: state => {},
        [addProduct.fulfilled]: (state, action) => {
            state.products.push(action.payload)
        },
        [addProduct.rejected]: (state, error) => {},
        [getSomeProducts.fulfilled]: (state, action) => {
            state.someProducts = action.payload.products
        },
        [delProduct.pending]: state => {},
        [delProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                someProducts: [...state.someProducts].filter(p => p._id !== action.payload.id)
            }
        },
        [delProduct.rejected]: (state, error) => {},
        [delAllProducts.pending]: state => {},
        [delAllProducts.fulfilled]: (state, action) => {
            state.someProducts = []
        },
        [delAllProducts.rejected]: (state, error) => {},
    }
})

export default productsSlice.reducer;