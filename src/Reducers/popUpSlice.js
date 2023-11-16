import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isOpen: false,
  loading: false,
  error: false,
  popUpContent: null,
  query: "",
  currentIndex: null

};

const popUpSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    popUpHandler(state, action) {
      state.popUpContent = action.payload.img;
      state.currentIndex = action.payload.index;
      state.isOpen = true;
    },
    closePopUp(state) {
      state.popUpContent = null;
      state.isOpen = false;
    },
    incrementIndex(state, action) {

      state.currentIndex = state.currentIndex + 1
      state.popUpContent = action.payload.images[state.currentIndex];
    },
    decrementIndex(state, action) {
      state.currentIndex = state.currentIndex - 1;
      state.popUpContent = action.payload.images[state.currentIndex];
    },
    querySetHandler(state, action) {
      state.query = action.payload
    }
  }
});

export const { popUpHandler, closePopUp, querySetHandler, incrementIndex, decrementIndex } = popUpSlice.actions;
export default popUpSlice.reducer;