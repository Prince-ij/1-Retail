import creditService from "../../services/creditServices";
import { notify } from "../../reducers/notificationReducer";
import { useAppDispatch } from "../../hooks";
import { Button, Form, Modal } from "react-bootstrap";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { SalesEntryType } from "../../types";
import { useNavigate } from "react-router-dom";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import productService from "../../services/productServices";
import Select from "react-select";

interface PropType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditModal = ({ show, setShow }: PropType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const options = products?.data?.map((product) => ({
    value: product.id,
    label: product.name + " - ₦" + product.price,
  }));

  const AddCreditMutation = useMutation({
    mutationFn: creditService.createDebt,
    onSuccess: (data) => {
      dispatch(
        notify({ type: "success", message: "Product Lent out successful" })
      );
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      navigate(`/credit-receipt/${data.id}`);
      handleClose();
    },
    onError: (err) => {
      // @ts-expect-error improper type cohesion from axios
      const errMsg = err.response.data.error.split(":")[1];
      dispatch(notify({ type: "danger", message: errMsg }));
      handleClose();
    },
  });

  const isLoading = AddCreditMutation.isPending;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SalesEntryType>({
    defaultValues: {
      product: "fufu",
    },
  });

  const onSubmit: SubmitHandler<SalesEntryType> = (data) => {
    AddCreditMutation.mutate({
      ...data,
      quantity: Number(data.quantity),
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const selectedProductId = useWatch({
    control,
    name: "product",
  });

  const quantity = useWatch({
    control,
    name: "quantity",
  });

  const selectedProduct = products.data?.find(
    (p) => p.id === selectedProductId
  );

  const totalPrice =
    selectedProduct && quantity ? selectedProduct.price * Number(quantity) : 0;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lend out a new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="px-3">
              <Form.Label className="text-info" htmlFor="product">
                Product
              </Form.Label>

              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    isSearchable
                    placeholder="Search for product"
                    value={options?.find((opt) => opt.value === field.value)}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />

              <Form.Label className="text-info">Quantity</Form.Label>
              <Form.Control
                type="number"
                {...register("quantity", {
                  required: "Price of product must be given",
                })}
              />
              <p className="mt-3 text-secondary fw-semibold">
                Total Price: {totalPrice}
              </p>
              <p className="text-danger">{errors?.quantity?.message}</p>

              <Form.Label className="text-info">Buyer</Form.Label>
              <Form.Control type="text" {...register("buyer")} />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="m-2 justify-content-end"
              disabled={isLoading}
            >
              Lend
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

export default CreditModal;
