import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../../reducers/notificationReducer";
import { useAppDispatch } from "../../hooks";
import "../../index.css";
import userServices from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

interface FormType {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, token } = useParams();

  const ResetPasswordMutation = useMutation({
    mutationFn: userServices.resetPassword,
    onError: () => {
      dispatch(notify({ type: "danger", message: "reset password failed" }));
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = ({ password }) => {
    const credentials = {
      email,
      password,
      token,
    };
    ResetPasswordMutation.mutate(credentials);
  };

  if (ResetPasswordMutation.isSuccess) {
    navigate("/login");
    dispatch(notify({ type: "success", message: "Password reset successful, log in" }));
  }

  const isLoading = ResetPasswordMutation.isPending;

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 lead display-5">Reset Your Password</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="passwd">Enter New Password</Form.Label>
          <Form.Control
            type="password"
            id="passwd"
            {...register("password", {
              required: "password must be provided",
              minLength: { value: 6, message: "must be 6 or more chars" },
            })}
          />
          <div className="text-warning">{errors.password?.message}</div>

          <Form.Label htmlFor="passwd2">Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            id="passwd2"
            {...register("confirmPassword", {
              required: "confirm password cannot be empty",
              minLength: { value: 6, message: "must be 6 or more chars" },
              validate: (value) => {
                // eslint-disable-next-line
                return value === watch("password") || "Passwords must match";
              },
            })}
          />
          <div className="text-warning">{errors.confirmPassword?.message}</div>

          <Button
            type="submit"
            variant="primary"
            className="mt-3 mb-3"
            disabled={isLoading}
          >
            CHANGE PASSWORD
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ResetPassword;
