import { Route, Routes } from "react-router-dom";
import Home from "./components/Authentication";
import Dashboard from "./components/DashBoard";
import LogIn from "./components/Authentication/LogIn";
import SignUp from "./components/Authentication/SignUp";
import { VerifyPage, VerifyLogic } from "./components/Authentication/Verify";
import ResetLink from "./components/Authentication/ResetLink";
import ResetPassword from "./components/Authentication/Reset";
import Sales from "./components/Sales";
import Debts from "./components/Debts";
import { useAppSelector } from "./hooks";
import AlertDismissable from "./components/AlertDismissable";

const App = () => {
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
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/debts" element={<Debts />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default App;
