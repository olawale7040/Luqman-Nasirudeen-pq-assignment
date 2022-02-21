import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewConversion: null,
  conversionHistory: [],
};

const slice = createSlice({
  name: "conversionHistory",
  initialState,
  reducers: {
    setViewConversion(state, action) {
      state.viewConversion = action.payload;
    },
    updateConversionHistory(state, action) {
      let { payload } = action;
      payload.id = Math.floor(1000 + Math.random() * 9000);
      if (state.conversionHistory) {
        state.conversionHistory.push(payload);
      } else {
        const historyArray = [];
        historyArray.push(payload);
        state.conversionHistory = historyArray;
      }
      state.viewConversion = null;
    },
    deleteConversionHistory(state, action) {
      const updatedHistory = state.conversionHistory.filter(
        (item) => item.id !== action.payload
      );
      state.conversionHistory = updatedHistory;
    },
  },
});

export const reducer = slice.reducer;
export const {
  setViewConversion,
  updateConversionHistory,
  deleteConversionHistory,
} = slice.actions;

export default slice;
