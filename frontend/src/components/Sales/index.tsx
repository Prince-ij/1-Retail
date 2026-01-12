import { Button, Container } from "react-bootstrap";
import NavBar from "../NavBar";
import saleService from "../../services/saleServices";
import productService from "../../services/productServices";
import SaleModal from "./SaleModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Sales = () => {
  const [show, setShow] = useState(false);
  const sales = useQuery({
    queryKey: ["sales"],
    queryFn: saleService.getSales,
  });
  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const getProductName = (productId: string) => {
    const product = products.data?.find((p) => p.id === productId);
    return product ? product.name : "—";
  };

  const getProductPrice = (productId: string) => {
    const product = products.data?.find((p) => p.id === productId);
    return product ? product.price.toLocaleString() : "—";
  };

  return (
    <Container fluid>
      <NavBar />
      <Button variant="primary" className="m-3" onClick={() => setShow(true)}>
        New Sale
      </Button>
      <SaleModal setShow={setShow} show={show} />
      <Table className="table-bordered table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Price (₦)</th>
            <th>Quantity</th>
            <th>Buyer</th>
          </tr>
        </thead>
        <tbody>
          {sales.data?.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>{formatDate(sale.date)}</td>
                <td>{getProductName(sale.product)}</td>
                <td>{getProductPrice(sale.product)}</td>
                <td>{sale.quantity}</td>
                <td>{sale.buyer}</td>
                <td>
                  <Link to={`/receipt/${sale.id}`} className="text-decoration-none">
                    View Reciept
                  </Link>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Sales;
