import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../../index.css";
import Card from "react-bootstrap/Card";
import inventoryImg from "../../assets/images/inventory.jpg";
import recieptImg from "../../assets/images/reciept.jpg";
import creditImg from "../../assets/images/credit.jpg";
import dashboardImg from "../../assets/images/dashboard.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <header className="mt-3 px-5 py-5">
        <h1 className="text-center mb-2 text-info eagle">1-Retail</h1>
        <p className="text-center mb-5">
          Your Complete Store Management Solution
        </p>
        <div className="text-center">
          <span className="px-3 py-3"> </span>
          <Button
            variant="outline-primary"
            className="mt-2"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
          <span className="px-3 py-3"> </span>
          <Button
            variant="outline-secondary"
            className="mx-5 mt-2"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </header>
      <main>
        <section className="about">
          <h2 className="px-5 mt-5 text-info">
            About <span className="eagle"> 1-Retail</span>
          </h2>
          <p className="text-secondary bg-light px-5 py-5">
            <span className="eagle">1-Retail</span> is a modern digital solution
            designed specifically for retail store owners and managers who want
            to streamline their daily business operations. Think of it as your
            all-in-one store assistant that helps you manage everything from
            tracking your inventory to processing sales and keeping records of
            customer transactions. Instead of juggling multiple notebooks,
            spreadsheets, or old-fashioned cash registers, 1-Retail brings
            everything together in one easy-to-use system that you can access
            from your computer or mobile device.
          </p>
          <p className="text-secondary bg-light px-5 py-5">
            The application handles all the essential aspects of running a
            retail business. You can easily add and track all your products -
            from the items you buy from suppliers to how much you sell them for
            and how many you have in stock. When customers make purchases, the
            system automatically generates receipts and keeps detailed records
            of every sale. One of the standout features is the credit management
            system, which helps you keep track of customers who buy items on
            credit, monitor how much they owe, and record their payments over
            time - eliminating the need for handwritten IOUs or complicated
            ledger books.
          </p>
          <p className="text-secondary bg-light px-5 py-5">
            What makes <span className="eagle">1-Retail</span> special is that
            it's built with small to medium-sized store owners in mind. Whether
            you run a grocery store, clothing shop, electronics store, or any
            other retail business, the system adapts to your needs without
            requiring technical expertise. You don't need to be a computer
            expert to use it - everything is designed to be intuitive and
            straightforward. The system helps you make better business decisions
            by keeping all your important information organized and easily
            accessible, so you can focus on what you do best: serving your
            customers and growing your business.
          </p>
        </section>
        <section className="features p-5">
          <h3 className="text-info mx-5 pb-3 pt-3">Core Features</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap-reverse",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <Card
              style={{
                width: "100%",
                maxWidth: "18rem",
                flex: "1 1 18rem",
                display: "flex",
                flexDirection: "column",
                minWidth: "250px",
              }}
            >
              <Card.Img
                variant="top"
                src={inventoryImg}
                style={{
                  height: "140px",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                }}
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Inventory Management</Card.Title>
                <Card.Text>
                  Track products, stock levels, cost price, selling price, and
                  supplier details.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card
              style={{
                width: "100%",
                maxWidth: "18rem",
                flex: "1 1 18rem",
                display: "flex",
                flexDirection: "column",
                minWidth: "250px",
              }}
            >
              <Card.Img
                variant="top"
                src={recieptImg}
                style={{
                  height: "140px",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                }}
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Sales & Receipt Processing</Card.Title>
                <Card.Text>
                  Record sales instantly, generate receipts automatically, and
                  maintain clean sales history.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card
              style={{
                width: "100%",
                maxWidth: "18rem",
                flex: "1 1 18rem",
                display: "flex",
                flexDirection: "column",
                minWidth: "250px",
              }}
            >
              <Card.Img
                variant="top"
                src={creditImg}
                style={{
                  height: "140px",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                }}
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Customer Credit Management</Card.Title>
                <Card.Text>
                  Monitor customers who buy on credit, track balances, and
                  record repayments - no more manual IOUs.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card
              style={{
                width: "100%",
                maxWidth: "18rem",
                flex: "1 1 18rem",
                display: "flex",
                flexDirection: "column",
                minWidth: "250px",
              }}
            >
              <Card.Img
                variant="top"
                src={dashboardImg}
                style={{
                  height: "140px",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                }}
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Unified Dashboard</Card.Title>
                <Card.Text>
                  All business activities in one place—no spreadsheets, no
                  confusion.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </section>
        <section className="work-concept">
          <h3 className="text-secondary text-center mt-5 mb-5 px-5 pt-3">
            How It Works in 4 steps
          </h3>
          <div className="circle-points">
            <div className="point">Add your products</div>
            <div className="point">Record daily sales</div>
            <div className="point">Manage inventory</div>
            <div className="point">View reports and insights</div>
          </div>
        </section>
      </main>

      <div className="mt-5 text-bg-dark pt-3">
        <h2 className="text-center m-3 ">
          “Start managing your store smarter today.”
        </h2>
        <div className="text-center">
          <Button
            variant="outline-light"
            className="mt-2 mb-3"
            onClick={() => navigate("/register")}
          >
            Sign Up Free
          </Button>
        </div>
        <p></p>
      </div>
    </Container>
  );
};

export default Home;
