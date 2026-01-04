import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userServices";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../index.css";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../hooks";
import { notify } from "../../reducers/notificationReducer";

interface FormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      dispatch(
        notify({ type: "success", message: "Account created successfully!" })
      );
      navigate("/verify-page");
    },
    onError: () =>
      dispatch(notify({ type: "danger", message: "An Error Occured" })),
  });

  const isLoading = newUserMutation.isPending;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    const newUser = {
      details: {
        firstName,
        lastName,
        email,
      },
      password,
    };
    newUserMutation.mutate(newUser);
  };
  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 text-secondary">
        Get Started with{" "}
        <span className="eagle text-nowrap text-info">1-Retail</span> for free
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            {...register("firstName", {
              required: "First Name must be provided",
            })}
          />
          <div className="text-warning">{errors.firstName?.message}</div>

          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            {...register("lastName", {
              required: "Last name must be provided",
            })}
          />
          <div className="text-warning">{errors.lastName?.message}</div>

          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email", { required: "Email required" })}
          />
          <div className="text-warning">{errors.email?.message}</div>

          <Form.Label htmlFor="passwd">Password</Form.Label>
          <Form.Control
            type="password"
            id="passwd"
            {...register("password", {
              required: "password must be provided",
              minLength: { value: 6, message: "must be 6 or more chars" },
            })}
          />
          <div className="text-warning">{errors.password?.message}</div>

          <Form.Label htmlFor="confirm">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirm"
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
            className="mt-3"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SignUp;
