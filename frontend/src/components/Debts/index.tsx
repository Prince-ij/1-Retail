import { Button, Container, Table } from "react-bootstrap";
import NavBar from "../NavBar";
import { useState } from "react";
import creditService from "../../services/creditServices";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productServices";
import CreditModal from "./CreditModal";
import { Link } from "react-router-dom";
import PayModal from "./PayModal";

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Debt = () => {
  const [show, setShow] = useState(false);
  const [payDebtId, setPayDebtId] = useState<string | null>(null);
  const [buyerFilter, setBuyerFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const credits = useQuery({
    queryKey: ["credits"],
    queryFn: creditService.getDebts,
  });

  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const getProductName = (productId: string) => {
    const product = products.data?.find((p) => p.id === productId);
    return product ? product.name : "—";
  };

  const filteredCredits = credits.data?.filter((debt) => {
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
        New Credit
      </Button>
      <CreditModal setShow={setShow} show={show} />
      <p className="lead fw-bold">Debts</p>
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
            <th>Buyer</th>
            <th>Amount Paid</th>
            <th>Total Debt</th>
          </tr>
        </thead>
        <tbody>
          {filteredCredits?.map((debt) => {
            return (
              <tr key={debt.id}>
                <td>{formatDate(debt.date)}</td>
                <td>{getProductName(debt.product)}</td>
                <td>{debt.buyer}</td>
                <td>
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <td className="fw-medium">{"₦" + debt.amountPaid}</td>
                        <td className="text-end">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setPayDebtId(debt.id)}
                          >
                            Pay
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td>
                  {debt.totalDebt === 0 ? debt.status : "₦" + debt.totalDebt}
                </td>
                <td>
                  <Link to={`/credit-receipt/${debt.id}`}>View Receipt</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PayModal
        id={payDebtId || ""}
        show={!!payDebtId}
        setShow={() => setPayDebtId(null)}
      />
    </Container>
  );
};

export default Debt;
