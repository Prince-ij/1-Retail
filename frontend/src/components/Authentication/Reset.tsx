import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../index.css";

const ResetPassword = () => {
  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 lead display-5">Reset Your Password</h1>
      <Form>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="passwd">Enter New Password</Form.Label>
          <Form.Control type="password" id="passwd" required></Form.Control>

          <Form.Label htmlFor="passwd2">Re-enter Password</Form.Label>
          <Form.Control type="password" id="passwd2" required></Form.Control>

          <Button type="submit" variant="primary" className="mt-3 mb-3">
            CHANGE PASSWORD
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ResetPassword;
