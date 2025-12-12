import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../index.css";

const ResetLink = () => {
  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 lead display-5">Get Reset Link for Your Password</h1>
      <Form>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="email">Enter Your Email</Form.Label>
          <Form.Control type="email" id="email" required></Form.Control>

          <Button type="submit" variant="primary" className="mt-3 mb-3">
            Get Reset Link
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ResetLink;
