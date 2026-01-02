import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/reducers/userReducer";
import notificationReducer from "../src/reducers/notificationReducer";
import salesReducer from "../src/reducers/salesReducer";
import productReducer from "../src/reducers/productReducer";
import creditReducer from "../src/reducers/creditReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    sales: salesReducer,
    credits: creditReducer,
    products: productReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
