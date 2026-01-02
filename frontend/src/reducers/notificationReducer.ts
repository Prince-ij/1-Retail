import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  type: "danger" | "success" | "";
  message: string;
};

const initialState: NotificationState = {
  type: "",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      return state;
    },
  },
});

export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
