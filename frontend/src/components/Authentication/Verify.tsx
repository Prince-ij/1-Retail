import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userServices";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";
import { notify } from "../../reducers/notificationReducer";

export const VerifyPage = () => {
  return (
    <Container fluid className="bg-dark p-5">
      <p className="text-center mt-5 mb-5 text-success display-5">
        Account Created Successfully ✔
      </p>
      <p className="text-center mt-5 mb-5 text-warning display-5">
        Check Your Email to Verify Your Account
      </p>
    </Container>
  );
};

export const VerifyLogic = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const token = useParams().token;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify"],
    queryFn: () => userService.verifyEmail(id, token),
  });

  if (data) {
    navigate("/login");
    dispatch(
      notify({ type: "success", message: "Email Verified , you can now login" })
    );
  }

  if (isLoading) {
    return (
      <div className="text-center m-5 p-5">
        <Spinner animation="border" />
        <p className="display-5 text-info text-center">Verifying your Email</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center m-5 p-5 bg-dark">
        <p className="display-5 text-danger">Email Verification Failed !</p>
      </div>
    );
  }
};
