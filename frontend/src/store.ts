import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/reducers/userReducer";
import notificationReducer from "../src/reducers/notificationReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
