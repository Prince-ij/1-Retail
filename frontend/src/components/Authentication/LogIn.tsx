import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { notify } from "../../reducers/notificationReducer";
import { logIn } from "../../reducers/userReducer";
import userService from "../../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../hooks";
import { LogInIcon } from "lucide-react";
interface FormType {
  email: string;
  password: string;
}

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginUserMutation = useMutation({
    mutationFn: userService.loginUser,
    onSuccess: (data) => {
      dispatch(
        logIn({
          token: data.token,
          user: {
            username: data.username,
            id: data.id,
          },
        })
      );
      dispatch(notify({ type: "success", message: "Login successful!" }));
      navigate("/");
    },
    onError: (err) => {
      // @ts-expect-error improper type cohesion from axios
      const errMsg = err.response.data.error.split(":")[1]
      dispatch(notify({ type: "danger", message: errMsg }));
    },
  });

  const isLoading = loginUserMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = ({ email, password }) => {
    loginUserMutation.mutate({ email, password });
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 lead display-5 text-info">
        Sign In to Your Account
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            {...register("email", {
              required: "Email must be provided",
            })}
          />
          <div className="text-warning">{errors.email?.message}</div>

          <Form.Label htmlFor="passwd">Password</Form.Label>
          <Form.Control
            type="password"
            id="passwd"
            {...register("password", {
              required: "password",
            })}
          />
          <div className="text-warning">{errors.password?.message}</div>

          <Button
            type="submit"
            variant="primary"
            className="mt-3 mb-3"
            disabled={isLoading}
          >
           <LogInIcon /> Log In
          </Button>
          <p className="text-secondary">
            Forgot your password?{" "}
            <a
              onClick={() => navigate("/reset-link")}
              className="link-opacity-50 pointer"
            >
              reset
            </a>
          </p>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LogIn;
