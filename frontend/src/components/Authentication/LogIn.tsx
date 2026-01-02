import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../index.css";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 lead display-5 text-info">
        Sign In to Your Account
      </h1>
      <Form>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="email" id="email" required></Form.Control>

          <Form.Label htmlFor="passwd">Password</Form.Label>
          <Form.Control type="password" id="passwd" required></Form.Control>

          <Button type="submit" variant="primary" className="mt-3 mb-3">
            Sign In
          </Button>
          <p className="text-secondary">
            Forgot your password?{" "}
            <a onClick={() => navigate("/reset-link")} className="link-opacity-50 pointer">
              reset
            </a>
          </p>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LogIn;
