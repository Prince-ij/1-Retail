import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { register, handleSubmit } from "react-hook-form";
import { useAppSelector } from "../../hooks";
import "../../index.css";
import { useQuery } from "@tanstack/react-query";
import userServices from "../../services/userServices";

interface FormType {
  email: string;
}

const ResetLink = () => {
  const selector = useAppSelector;
  const userId = selector((state) => state.user.user.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const resetLinkQuery = useQuery({
    queryKey: ["reset-link"],
    queryFn: () => userServices.getResetLink(userId),
  });

  const onSubmit: SubmitHandler<FormType> = ({ email }) => {};
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

          <Button type="submit" variant="primary" className="mt-3 mb-3">
            Get Reset Link
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ResetLink;
