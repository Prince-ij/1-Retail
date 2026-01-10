import { Button, Form, Modal } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { ProductEntryType } from "../../types";
import productService from "../../services/productServices";
import { useAppDispatch } from "../../hooks";
import { notify } from "../../reducers/notificationReducer";
import { useQueryClient } from "@tanstack/react-query";

interface PropType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal = ({ show, setShow }: PropType) => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const AddProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      dispatch(
        notify({ type: "success", message: "Product added successfully" })
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      handleClose();
    },
    onError: () => {
      dispatch(notify({ type: "danger", message: "failed to add product !" }));
      handleClose();
    },
  });

  const isLoading = AddProductMutation.isPending;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEntryType>();

  const onSubmit: SubmitHandler<ProductEntryType> = (data) => {
    AddProductMutation.mutate({
      ...data,
      price: Number(data.price),
      cost: Number(data.cost),
      stock: Number(data.stock),
    });
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="px-3">
              <Form.Label className="text-info">Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name", {
                  required: "Name of product must be given",
                })}
              />
              <p className="text-danger">{errors?.name?.message}</p>
              <Form.Label className="text-info">Description</Form.Label>
              <Form.Control type="text" {...register("description")} />

              <Form.Label className="text-info">Size</Form.Label>
              <Form.Select {...register("size")}>
                <option value="">Select size</option>
                <option value="Extra Small">XS</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </Form.Select>
              <Form.Label className="text-info">Price</Form.Label>
              <Form.Control
                type="number"
                {...register("price", {
                  required: "Price of product must be given",
                })}
              />
              <p className="text-danger">{errors?.price?.message}</p>
              <Form.Label className="text-info">Cost</Form.Label>
              <Form.Control
                type="number"
                {...register("cost", {
                  required: "Cost of product must be given",
                })}
              />
              <p className="text-danger">{errors?.cost?.message}</p>
              <Form.Label className="text-info">Supplier</Form.Label>
              <Form.Control type="text" {...register("supplier")} />
              <Form.Label className="text-info">Initial Stock</Form.Label>
              <Form.Control
                type="number"
                {...register("stock", {
                  required: "you have to provide initial stock",
                })}
              />
              <p className="text-danger">{errors?.stock?.message}</p>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="m-2 justify-content-end"
              disabled={isLoading}
            >
              Add Product
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

export default AddModal;
