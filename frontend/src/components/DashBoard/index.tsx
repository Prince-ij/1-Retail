import { Container, NavLink } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import NavBar from "../NavBar";

const Dashboard = () => (
  <Container className="mt-5 mb-5">
    <NavBar />
    <h1>Dashboard</h1>
    <Row>
      <Col className="col-2 m-3">
        <NavLink className="m-2" href="#">
          Products
        </NavLink>
        <NavLink className="m-2" href="#">
          Sales
        </NavLink>
        <NavLink className="m-2" href="#">
          Debts
        </NavLink>
        <NavLink className="m-2" href="#">
          LogOut
        </NavLink>
        <NavLink className="m-2" href="#">
          Delete Account
        </NavLink>
      </Col>
      <Col className="m-3">
        <p>Search For Product</p>

        <Row>
          <Col>Total Stocks</Col>
          <Col>Total Profits</Col>
        </Row>
        <Row>
          <Col>
            <p>Total Sales</p>
          </Col>
          <Col>Total Debts</Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Dashboard;
