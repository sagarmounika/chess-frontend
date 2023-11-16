import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from './Reducers/imageSlice'
import popUpReducer from './Reducers/popUpSlice'
import authReducer from "./Reducers/authSlice"
import playersReducer from "./Reducers/playersSlice"
export const store = configureStore({
  reducer: {
    images: imagesReducer,
    auth: authReducer,
    players:playersReducer
  },
})