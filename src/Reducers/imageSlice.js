import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 
  loading: false,
  error: false,

};
const accessKey = process.env.REACT_APP_API_KEY;

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  (args) => {

    const { onSuccess, onFailure, pageNumber, query } = args;

    return axios
      .get(`https://api.pexels.com/v1/search?query=${query}&page=${pageNumber}&per_page=60`,
        {
          headers: {
            Accept: "application/json",
            Authorization: accessKey,
          }
        }

      )
      .then((res) => {
        onSuccess();
        return res.data.photos;
      })
      .catch((err) => {

        onFailure()
      });
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchImages.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.loading = false
      state.images = [...state.images, ...action.payload]
      // to check if anymore data is left
      state.hasMore = action.payload.length > 0 ? true : false
      state.error = false
    })
    builder.addCase(fetchImages.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  },
  reducers: {
    emptyImages(state) {

      state.images = []
    },

  }
});

export const { emptyImages } = imageSlice.actions;
export default imageSlice.reducer;