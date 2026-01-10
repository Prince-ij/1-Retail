import { Container } from "react-bootstrap";
import NavBar from "../NavBar";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productServices";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddModal from "./AddProductModal";
import { useState, useMemo } from "react";
import { Form } from "react-bootstrap";

const Product = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products.data;

    const term = search.toLowerCase();

    return products?.data?.filter((p) =>
      [p.name, p.description].join(" ").toLowerCase().includes(term)
    );
  }, [products, search]);

  if (products.isError) {
    return (
      <>
        <p className="display-5 text-warning text-center text-bg-info m-5">
          An Error Occured {`${products.error}`}
        </p>
      </>
    );
  }

  return (
    <Container fluid>
      <NavBar />
      <Button
        variant="primary"
        className="mt-5 mb-5"
        onClick={() => setShow(true)}
      >
        Add Product
      </Button>
      <AddModal show={show} setShow={setShow} />
      <Form className="d-flex mt-0 mb-3">
        <Form.Control
          type="search"
          placeholder="Search Product"
          className="me-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
      </Form>
      <p className="lead fw-bold">Products</p>
      <Table className="table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Size</th>
            <th>Price (₦)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-decoration-none text-info"
                  >
                    {product.name}
                  </Link>
                </td>
                <td>{product.description}</td>
                <td>{product.size}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Product;
