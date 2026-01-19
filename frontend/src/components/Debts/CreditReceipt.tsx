import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import creditService from "../../services/creditServices";
import productService from "../../services/productServices";
import type { DebtType } from "../../types";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatCurrency = (amount: number) =>
  "₦" + amount.toLocaleString(undefined, { minimumFractionDigits: 2 });

const CreditReceipt = () => {
  const { id } = useParams<{ id: string }>();



  const {
    data: debt,
    isLoading,
    isError,
  } = useQuery<DebtType>({
    queryKey: ["debt", id],
    queryFn: () => creditService.getDebt(id!),
    enabled: !!id,
  });

    const productQuery = useQuery({
      queryKey: ["product", debt?.product],
      queryFn: () => productService.getProductById(debt?.product),
      enabled: !!debt?.product,
    });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !debt) return <p>Credit not found.</p>;



  return (
    <Container
      className="my-5 p-4 border rounded shadow-sm"
      style={{ maxWidth: 800, width: "100%" }}
    >
      {/* Header */}
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <h2 className="fw-bold">Credit Receipt</h2>
          <p className="text-muted">Receipt ID: {debt.receiptId || debt.id}</p>
        </Col>
        <Col xs={12} md={6} className="text-md-end">
          <p>Date: {formatDate(debt.date)}</p>
          <p>Buyer: {debt.buyer}</p>
        </Col>
      </Row>

      {/* Items Table */}
      <div className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount Paid</th>
              <th>Total Debt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {productQuery.isLoading
                  ? "..."
                  : productQuery.data?.name || debt.product}
              </td>
              <td>{debt.quantity}</td>
              <td>{formatCurrency(debt.amountPaid)}</td>
              <td>{formatCurrency(debt.totalDebt)}</td>
              <td>{debt.status}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Summary */}
      <Row className="mt-4">
        <Col xs={12} className="text-end">
          <h5>
            Total Paid: <span>{formatCurrency(debt.amountPaid)}</span>
          </h5>
          <h5>
            Remaining Debt: <span>{formatCurrency(debt.totalDebt)}</span>
          </h5>
        </Col>
      </Row>

      {/* Print / Action Buttons */}
      <Row className="mt-4">
        <Col xs={12} className="text-end">
          <Button
            variant="primary"
            onClick={() => window.print()}
            className="me-2 mb-2"
          >
            Print Receipt
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditReceipt;
