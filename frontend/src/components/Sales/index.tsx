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
  const [buyerFilter, setBuyerFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

  const filteredSales = sales.data?.filter((debt) => {
    const matchesBuyer =
      buyerFilter === "" ||
      debt.buyer.toLowerCase().includes(buyerFilter.toLowerCase());

    const matchesProduct =
      productFilter === "" || debt.product === productFilter;

    const matchesDate =
      dateFilter === "" ||
      new Date(debt.date).toISOString().slice(0, 10) === dateFilter;

    return matchesBuyer && matchesProduct && matchesDate;
  });

  return (
    <Container fluid>
      <NavBar />
      <Button variant="primary" className="m-3" onClick={() => setShow(true)}>
        New Sale
      </Button>
      <SaleModal setShow={setShow} show={show} />
      <p className="lead fw-bold">Sales</p>
      <div className="d-flex gap-3 m-3">
        {/* Buyer filter */}
        <input
          type="text"
          className="form-control"
          placeholder="Filter by buyer"
          value={buyerFilter}
          onChange={(e) => setBuyerFilter(e.target.value)}
        />

        {/* Product filter */}
        <select
          className="form-select"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        >
          <option value="">All products</option>
          {products.data?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {/* Date filter */}
        <input
          type="date"
          className="form-control"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        {/* Clear filters */}
        <Button
          variant="outline-secondary"
          onClick={() => {
            setBuyerFilter("");
            setProductFilter("");
            setDateFilter("");
          }}
        >
          Clear
        </Button>
      </div>

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
          {filteredSales?.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>{formatDate(sale.date)}</td>
                <td>{getProductName(sale.product)}</td>
                <td>{getProductPrice(sale.product)}</td>
                <td>{sale.quantity}</td>
                <td>{sale.buyer}</td>
                <td>
                  <Link
                    to={`/receipt/${sale.id}`}
                    className="text-decoration-none"
                  >
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
