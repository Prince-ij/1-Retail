import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user);
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { logIn, setUser } = userSlice.actions;
export default userSlice.reducer;
