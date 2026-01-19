import {
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  Package,
  AlertTriangle,
  Plus,
  ShoppingCart,
  FilePlus,
} from "lucide-react";
import productServices from "../../services/productServices";
import creditServices from "../../services/creditServices";
import saleServices from "../../services/saleServices";
import { useQuery } from "@tanstack/react-query";

import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

const formatNaira = (amount: number = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const Dashboard = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: productServices.getProducts,
  });
  const lowStock = products?.data?.filter((x) => x.stock < 5) || [];
  const totalSales = useQuery({
    queryKey: ["salesTotal"],
    queryFn: () =>
      saleServices.getTotalSalesByDate(new Date().toISOString().split("T")[0]),
  });

  const totalProfit = useQuery({
    queryKey: ["salesProfit"],
    queryFn: () =>
      saleServices.getProfitByDate(new Date().toISOString().split("T")[0]),
  });
  const totalDebts = useQuery({
    queryKey: ["credits"],
    queryFn: creditServices.getDebts,
  });

  const uniqueDebtors = totalDebts.data
    ? Array.from(
        new Set(
          totalDebts.data
            .filter((d) => d.status !== "settled")
            .map((d) => d.buyer)
        )
      ).length
    : 0;

  const totalDebtAmount = useQuery({
    queryKey: ["totalDebtAmount"],
    queryFn: creditServices.getTotalDebtAmount,
  });

  return (
    <Container fluid>
      <NavBar />
      <h4 className="lead fw-bold m-3">Quick Actions</h4>

      <Link
        to="/products"
        className="align-items-center justify-content-center p-3 m-3 btn btn-outline-primary"
      >
        <Plus size={18} />
        <span className="p-2">Add Stock</span>
      </Link>
      <Link
        to="/sales"
        className="p-3 align-items-center justify-content-center m-3 text-decoration-none btn btn-outline-info"
      >
        <ShoppingCart size={18} />
        <span className="p-2">Make Sale</span>
      </Link>

      <Link
        to="/credits"
        className=" p-3 align-items-center justify-content-center gap-2 m-3 btn btn-outline-warning"
      >
        <FilePlus size={18} />
        <span className="p-2">Record debt</span>{" "}
      </Link>

      {/* TODAY */}
      <h4 className="fw-bold m-3 lead">Today</h4>
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center gap-3">
              <TrendingUp size={28} className="text-primary" />
              <div>
                <small className="text-muted">Total Sales</small>
                <h5 className="mb-0 fw-bold">
                  {totalSales.isPending ? "..." : totalSales.data || 0}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center gap-3">
              <DollarSign size={28} className="text-success" />
              <div>
                <small className="text-muted">Total Profit</small>
                <h5 className="mb-0 fw-bold">
                  {totalProfit.isPending
                    ? "..."
                    : formatNaira(totalProfit.data)}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* DEBTORS */}
      <h4 className="fw-bold m-3 lead">Debtors</h4>

      <Row className="g-3 mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center gap-3">
              <Users size={28} className="text-warning" />
              <div>
                <small className="text-muted">People Owing</small>
                <h5 className="mb-0 fw-bold">
                  {totalDebts.isPending ? "..." : uniqueDebtors}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center gap-3">
              <CreditCard size={28} className="text-danger" />
              <div>
                <small className="text-muted">Total Debt</small>
                <h5 className="mb-0 fw-bold">
                  {totalDebtAmount.isPending
                    ? "..."
                    : formatNaira(totalDebtAmount.data)}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* STOCK */}
      <h4 className="fw-bold m-3 lead">Stock</h4>

      <Row className="g-3 mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center gap-3">
              <Package size={28} className="text-info" />
              <div>
                <small className="text-muted">Total Products</small>
                <h5 className="mb-0 fw-bold">
                  {products.isPending ? "..." : products?.data?.length || 0}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center gap-3">
              <AlertTriangle size={28} className="text-danger" />
              <div>
                <small className="text-muted">Low Stock</small>
                <h5 className="mb-0 fw-bold">{products.isPending? "...": lowStock?.length}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
