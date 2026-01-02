import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    makeSale: (state) => {
      return state;
    },
  },
});

export const { makeSale } = saleSlice.actions;
export default saleSlice.reducer;
