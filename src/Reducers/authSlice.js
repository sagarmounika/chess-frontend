import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {setLocalStorage} from "../utils"
const signupEndpoint = "https://chess-dashboard.onrender.com/auth/signup"
const loginEndpoint = "https://chess-dashboard.onrender.com/auth/login"
// const signupEndpoint = "http://127.0.0.1:8000/auth/signup"
// const loginEndpoint = "http://127.0.0.1:8000/auth/login"
export const signUpHandler = createAsyncThunk("auth/signup", async args => {
  const {onSuccess, onFailure, userData} = args
  try {
    const response = await axios.post(signupEndpoint, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    onSuccess()
    return response.data
  } catch (error) {
    onFailure()
    throw error
  }
})
export const loginHandler = createAsyncThunk("auth/login", async args => {
  const {onSuccess, onFailure, userData} = args
  try {
    const response = await axios.post(loginEndpoint, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    onSuccess(response.data)
    setLocalStorage("token", response.data.token)
    return response.data
  } catch (error) {
    onFailure()
    console.log(error, "error")
    throw error?.response?.data ? error?.response?.data?.detail : error.message
  }
})
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    loginLoading: false,
    loginError: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    clearError(state) {
      state.loginError = null;
       state.error= null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signUpHandler.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(signUpHandler.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(loginHandler.pending, state => {
        state.loginLoading = true
        state.loginError = null
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.loginLoading = false
        state.user = action.payload
      })
      .addCase(loginHandler.rejected, (state, action) => {
        console.log(action.error, "action.error")
        state.loginLoading = false
        state.loginError = action.error.message
      })
  },
})

export const {setUser, clearUser,clearError} = authSlice.actions
export default authSlice.reducer
