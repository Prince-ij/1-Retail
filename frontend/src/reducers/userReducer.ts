import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state) => {
      return state;
    },
    register: (state) => {
      return state;
    },
  },
});

export const { logIn } = userSlice.actions;
export default userSlice.reducer;
