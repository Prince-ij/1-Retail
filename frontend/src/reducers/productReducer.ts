import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProd: (state) => {
      return state;
    },
  },
});

export const { deleteProd } = productSlice.actions;
export default productSlice.reducer;
