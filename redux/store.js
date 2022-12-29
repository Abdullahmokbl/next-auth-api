import { configureStore } from "@reduxjs/toolkit";
import productsSlice from './productsSlice';
import usersSlice from "./usersSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
        users: usersSlice,
        products: productsSlice
    }
})

export const wrapper = createWrapper(makeStore)