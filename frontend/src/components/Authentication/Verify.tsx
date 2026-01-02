import { Container } from "react-bootstrap";
const VerifyPage = () => {
return (
  <Container fluid className="bg-dark p-5" >
    <p className="text-center mt-5 mb-5 text-success display-5">
      Account Created Successfully ✔
    </p>
    <p className="text-center mt-5 mb-5 text-warning display-5">
      Check Your Email to Verify Your Account
    </p>
  </Container>
);
}

export default VerifyPage;
