import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Reducers/authSlice"
import playersReducer from "./Reducers/playersSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    players:playersReducer
  },
})