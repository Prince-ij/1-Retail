import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../index.css";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../../reducers/notificationReducer";
import { useAppDispatch } from "../../hooks";
import userServices from "../../services/userServices";

interface FormType {
  email: string;
}

const ResetLink = () => {
  const dispatch = useAppDispatch();
  const resetLinkMutation = useMutation({
    mutationFn: userServices.getResetLink,
    onSuccess: () => {
      return (
        <Container fluid className="bg-dark p-5">
          <p className="text-center mt-5 mb-5 text-success display-5">
            Reset Link sent Successfully ✔
          </p>
          <p className="text-center mt-5 mb-5 text-warning display-5">
            Check Your Email to Reset Your Password
          </p>
        </Container>
      );
    },
    onError: () => {
      dispatch(
        notify({ type: "danger", message: "could not send reset link!" })
      );
    },
  });

  const isLoading = resetLinkMutation.isPending;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = ({ email }) => {
    resetLinkMutation.mutate(email);
  };
  return (
    <Container className="mt-5 mb-5">
      <h1 className="mx-5 my-5 lead display-5">
        Get Reset Link for Your Password
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mx-5 my-5">
          <Form.Label htmlFor="email">Enter Your Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            {...register("email", { required: "Email required" })}
          ></Form.Control>
          <div className="text-warning">{errors.email?.message}</div>

          <Button
            type="submit"
            variant="primary"
            className="mt-3 mb-3"
            disabled={isLoading}
          >
            Get Reset Link
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ResetLink;
