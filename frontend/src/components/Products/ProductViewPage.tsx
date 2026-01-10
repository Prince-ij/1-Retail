import productService from "../../services/productServices";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { notify } from "../../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Container, Form, Modal } from "react-bootstrap";
import type { ProductEntryType } from "../../types";
import NavBar from "../NavBar";
import { useState } from "react";

const ProductView = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const product = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const EditProductMutation = useMutation({
    mutationFn: productService.updateProduct,
    onSuccess: () => {
      dispatch(
        notify({ type: "success", message: "Product updated successfully" })
      );
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setIsEditing(false);
    },
    onError: () => {
      dispatch(
        notify({ type: "danger", message: "failed to update product !" })
      );
    },
  });

  const isLoading = EditProductMutation.isPending;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEntryType>({
    defaultValues: {
      name: product?.data?.name,
    },
  });

  const onSubmit: SubmitHandler<ProductEntryType> = (data) => {
    EditProductMutation.mutate({
      ...data,
      price: Number(data.price),
      cost: Number(data.cost),
      stock: Number(data.stock),
    });
  };

  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProductById,
    onSuccess: () => {
      dispatch(
        notify({ type: "success", message: "Product deleted successfully" })
      );
      queryClient.invalidateQueries({ queryKey: ["product"] });
      navigate("/products");
    },
    onError: () => {
      dispatch(
        notify({ type: "danger", message: "Error: could not delete product" })
      );
    },
  });

  const handleDelete = () => {
    deleteProductMutation.mutate(product.data?.id);
  };

  const toggleShow = () => setShow(!show);

  return (
    <Container fluid>
      <NavBar />
      <Form onSubmit={handleSubmit(onSubmit)} className="m-2">
        {show && (
          <ConfirmDelete handleDelete={handleDelete} toggleShow={toggleShow} />
        )}
        <Form.Group className="d-flex flex-column">
          <div className="d-flex flex-row gap-3">
            <p className="lead fw-bold">Name: {product?.data?.name}</p>
          </div>
          <p className="text-danger">{errors?.name?.message}</p>

          <div className="d-flex gap-3 flex-row">
            <Form.Label className="lead fw-bold">Description: </Form.Label>
            <Form.Control
              type="text"
              plaintext={!isEditing}
              readOnly={!isEditing}
              placeholder={product?.data?.description}
              {...register("description")}
            />
          </div>
        </Form.Group>

        <div className="border border-secondary m-3 border-3 p-3 rounded-2">
          {isEditing && (
            <Form.Group className="d-flex gap-2 fw-semibold">
              <Form.Label className="text-dark mt-2"> Size: </Form.Label>
              <Form.Select {...register("size")}>
                <option value="">Select size</option>
                <option value="Extra Small">XS</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="d-flex justify-content-around mt-2 mb-2 flex-column">
            <div className="d-flex gap-2">
              <Form.Label className="text-dark mt-2">Price: </Form.Label>
              <Form.Control
                type="number"
                plaintext={!isEditing}
                readOnly={!isEditing}
                placeholder={product?.data?.price.toString()}
                {...register("price", {
                  required: "Price of product must be given",
                })}
              />
            </div>
            <p className="text-danger">{errors?.price?.message}</p>
            <div className="d-flex gap-2">
              <Form.Label className="text-dark mt-2">Cost: </Form.Label>
              <Form.Control
                type="number"
                plaintext={!isEditing}
                readOnly={!isEditing}
                placeholder={product?.data?.cost.toString()}
                {...register("cost", {
                  required: "Cost of product must be given",
                  min: { value: 0, message: "cost must be greater than 0" },
                })}
              />
            </div>
            <p className="text-danger">{errors?.cost?.message}</p>

            <div className="d-flex gap-2">
              <Form.Label className="text-dark mt-2">Supplier: </Form.Label>
              <Form.Control
                type="text"
                plaintext={!isEditing}
                readOnly={!isEditing}
                placeholder={product?.data?.supplier}
                {...register("supplier")}
              />
            </div>

            <div className="d-flex gap-2">
              <Form.Label className="text-dark mt-2">Stock: </Form.Label>
              <Form.Control
                type="number"
                plaintext={!isEditing}
                readOnly={!isEditing}
                placeholder={product?.data?.stock.toString()}
                {...register("stock", {
                  required: "you have to provide initial stock",
                  min: { value: 0, message: "cost must be greater than 0" },
                })}
              />
            </div>
            <p className="text-danger">{errors?.stock?.message}</p>
          </Form.Group>
        </div>
        {isEditing ? (
          <Button
            type="submit"
            variant="primary"
            className="m-2 justify-content-end"
            disabled={isLoading}
          >
            Save
          </Button>
        ) : (
          <Button variant="warning" onClick={() => setIsEditing(true)}>
            Edit Product
          </Button>
        )}
      </Form>
      <Button variant="danger" onClick={toggleShow}>
        Delete Product
      </Button>
    </Container>
  );
};

interface deleteProp {
  handleDelete: () => void;
  toggleShow: () => void;
}

const ConfirmDelete = ({ handleDelete, toggleShow }: deleteProp) => {
  return (
    <Modal show centered onHide={toggleShow}>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShow}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductView;
