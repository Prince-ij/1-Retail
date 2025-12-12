import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../index.css"
const SignUp = () => {
  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 text-secondary">
        Get Started with <span className="eagle text-nowrap text-info">1-Retail</span> for free
      </h1>
      <Form>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control type="text" id="firstName" required></Form.Control>

          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control type="text" id="lastName" required></Form.Control>

          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="email" id="email" required></Form.Control>

          <Form.Label htmlFor="passwd">Password</Form.Label>
          <Form.Control type="password" id="passwd" required></Form.Control>

          <Form.Label htmlFor="confirm">Confirm Password</Form.Label>
          <Form.Control type="password" id="confirm" required></Form.Control>

          <Button type="submit" variant="primary" className="mt-3">
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SignUp;
