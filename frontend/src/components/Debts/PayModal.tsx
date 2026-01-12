import creditService from "../../services/creditServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal } from "react-bootstrap";
import { type SubmitHandler, useForm } from "react-hook-form";
import { notify } from "../../reducers/notificationReducer";
import { useAppDispatch } from "../../hooks";

interface propType {
  id: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormType {
  amount: number;
}
const PayModal = ({ id, show, setShow }: propType) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const payMutation = useMutation<unknown, unknown, { id: string; amount: number }>(
    {
      mutationFn: ({ id, amount }) => creditService.payPartDebt(id, amount),
      onSuccess: () => {
        dispatch(
          notify({ type: "success", message: "Payment made successfully" })
        );
        queryClient.invalidateQueries({ queryKey: ["credits"] });
        handleClose();
      },
      onError: (err) => {
        // @ts-expect-error improper type cohesion from axios
        const errMsg = err.response.data.error.split(":")[1];
        dispatch(notify({ type: "danger", message: errMsg }));
        handleClose();
      },
    }
  );

  const handleClose = () => {
    setShow(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = ({ amount }) => {
    payMutation.mutate({ id, amount: Number(amount) });
  };

  const isLoading = payMutation.isPending;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Amount to settle debt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="px-3">
              <Form.Label className="text-info">Amount to pay</Form.Label>
              <Form.Control
                type="number"
                {...register("amount", {
                  required: "Amount to be paid must be given",
                })}
              />
              <p className="text-danger">{errors?.amount?.message}</p>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="m-2 justify-content-end"
              disabled={isLoading}
            >
              Pay Amount
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PayModal;
