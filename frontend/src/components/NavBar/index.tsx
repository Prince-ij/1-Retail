import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reducers/userReducer";
import '../../index.css'
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingCart,
} from "lucide-react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="eagle text-secondary">
            1-Retail
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 ">
              <Nav.Link
                as={Link}
                to="/"
                className="d-flex align-items-center gap-2 nav-action"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/sales"
                className="d-flex align-items-center gap-2 nav-action"
              >
                <ShoppingCart size={18} />
                Sales
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/products"
                className="d-flex align-items-center gap-2 nav-action"
              >
                <Package size={18} />
                Product
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/credits"
                className="d-flex align-items-center gap-2 nav-action"
              >
                <CreditCard size={18} />
                Debts
              </Nav.Link>
            </Nav>
            <Button variant="secondary" onClick={handleLogOut}>
              <LogOut />
              Log Out
            </Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
