import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import saleService from "../../services/saleServices";
import productService from "../../services/productServices";
import "../../index.css";

const ReceiptView = () => {
  const { id } = useParams();

  const saleQuery = useQuery({
    queryKey: ["sale", id],
    queryFn: () => saleService.getSale(id!),
    enabled: !!id,
  });

  const productQuery = useQuery({
    queryKey: ["product", saleQuery.data?.product],
    queryFn: () => productService.getProductById(saleQuery.data!.product),
    enabled: !!saleQuery.data?.product,
  });

  if (saleQuery.isLoading || productQuery.isLoading) {
    return <Spinner animation="border" />;
  }

  const sale = saleQuery.data;
  const product = productQuery.data;

  const formattedDate = sale?.date ? new Date(sale.date).toLocaleString() : "—";
  
  return (
    <Card className="mx-auto mt-4 shadow" style={{ maxWidth: 600 }}>
      <Card.Body>
        <div className="text-center mb-4">
          <h4 className="fw-bold">SALES RECEIPT</h4>
          <small className="text-muted">Receipt ID: {sale?.receiptId}</small>
        </div>

        <hr />

        <Row className="mb-3">
          <Col>
            <strong>Buyer:</strong>
            <div>{sale?.buyer}</div>
          </Col>
          <Col className="text-end">
            <strong>Date:</strong>
            <div>{formattedDate}</div>
          </Col>
        </Row>

        <hr />

        <Row className="mb-2">
          <Col>
            <strong>Product</strong>
            <div>{product?.name}</div>
            <small className="text-muted">{product?.description}</small>
          </Col>
          <Col className="text-end">
            <strong>Size</strong>
            <div>{product?.size}</div>
          </Col>
        </Row>

        <hr />

        {/* Pricing */}
        <Row className="mb-2">
          <Col>Price per unit</Col>
          <Col className="text-end">₦{product?.price}</Col>
        </Row>

        <Row className="mb-2">
          <Col>Quantity</Col>
          <Col className="text-end">{sale?.quantity}</Col>
        </Row>

        <Row className="fw-bold fs-5">
          <Col>Total</Col>
          <Col className="text-end">₦{sale?.totalPrice}</Col>
        </Row>

        <hr />

        {/* Footer */}
        <div className="text-center text-muted mb-3">
          Thank you for your business 🙏
        </div>

        <div className="d-grid">
          <Button variant="dark" onClick={() => window.print()}>
            Print Receipt
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReceiptView;
