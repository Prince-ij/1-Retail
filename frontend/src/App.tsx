import { Route, Routes } from "react-router-dom";
import Home from "./components/Authentication";
import Dashboard from "./components/DashBoard";
import LogIn from "./components/Authentication/LogIn";
import SignUp from "./components/Authentication/SignUp";
import { VerifyPage, VerifyLogic } from "./components/Authentication/Verify";
import ResetLink from "./components/Authentication/ResetLink";
import ResetPassword from "./components/Authentication/Reset";
import Sales from "./components/Sales";
import Product from "./components/Products";
import Debts from "./components/Debts";
import { useAppSelector, useAppDispatch } from "./hooks";
import AlertDismissable from "./components/AlertDismissable";
import { setUser } from "./reducers/userReducer";
import { useEffect } from "react";
import ProductView from "./components/Products/ProductViewPage";
import ReceiptView from "./components/Sales/ReceiptView";
import CreditReceipt from "./components/Debts/CreditReceipt";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    dispatch(setUser({ token: token, user: user }));
  });

  const token = useAppSelector((state) => state.user.token);
  const notification = useAppSelector((state) => state.notification);
  return (
    <>
      <AlertDismissable
        type={notification.type}
        message={notification.message}
      />

      <Routes>
        {!token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/verify-page" element={<VerifyPage />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/reset-link" element={<ResetLink />} />
            <Route path="/:id/:token" element={<VerifyLogic />} />
            <Route path="/:id/:email/:token" element={<ResetPassword />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/credits" element={<Debts />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductView />} />
            <Route path="/receipt/:id" element={<ReceiptView />} />
            <Route path="/credit-receipt/:id" element={<CreditReceipt />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default App;
