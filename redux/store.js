import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './productsSlice'
import usersSlice from './usersSlice'
import { createWrapper } from 'next-redux-wrapper'
import cartSlice from './cartSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      users: usersSlice,
      products: productsSlice,
      cart: cartSlice,
    },
  })

export const wrapper = createWrapper(makeStore)
