import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {setLocalStorage} from "../utils"

const playersEndpoint = "https://chess-dashboard.onrender.com/chess/top-players"
const ratingsEndPoint = "https://chess-dashboard.onrender.com/chess/player"
// const playersEndpoint = "http://127.0.0.1:8000/chess/top-players"
// const ratingsEndPoint = "http://127.0.0.1:8000/chess/player"
export const getPlayersData = createAsyncThunk("auth/players", async args => {
  const {onSuccess, onFailure, token} = args
  try {
    const response = await axios.get(playersEndpoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    onSuccess()
    return response.data
  } catch (error) {
    console.log(error, "error")
    if (error.response.status===403){
    onFailure(true)
    }else{
        onFailure(false)
    }
    throw error
  }
})
export const ratingsHandler = createAsyncThunk("auth/ratings", async args => {
  const {onSuccess, onFailure, username, token} = args
  try {
    const response = await axios.get(
      `${ratingsEndPoint}/${username}/rating-history`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    onSuccess(response.data)

    return response.data
  } catch (error) {
    onFailure()
    console.log(error, "error")
    throw error?.response?.data ? error?.response?.data?.detail : error.message
  }
})
const playersSlice = createSlice({
  name: "players",
  initialState: {
    players: null,
    loading: false,
    error: null,
    loginLoading: false,
    ratingsLoading: false,
    loginError: null,
    ratingError: null,
  },

  extraReducers: builder => {
    builder
      .addCase(getPlayersData.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getPlayersData.fulfilled, (state, action) => {
        state.loading = false
        state.players = action.payload
      })
      .addCase(getPlayersData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(ratingsHandler.pending, state => {
        state.ratingsLoading = true
        state.ratingError = null
      })
      .addCase(ratingsHandler.fulfilled, (state, action) => {
        state.ratingsLoading = false
        state.ratingHistory = action.payload.rating_history
      })
      .addCase(ratingsHandler.rejected, (state, action) => {
        state.ratingsLoading = false
        state.ratingError = action.error.message
      })
  },
})

export default playersSlice.reducer
