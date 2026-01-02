import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    addCredit: (state) => {
      return state;
    },
  },
});

export const { addCredit } = creditSlice.actions;
export default creditSlice.reducer;
