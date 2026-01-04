import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reducers/userReducer";
import { LogOut } from "lucide-react";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <>
      <Button variant="danger" onClick={handleLogOut}>
        <LogOut />
        Log Out
      </Button>
    </>
  );
};

export default NavBar;
