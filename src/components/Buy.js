import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const Buy = ({ provider, price, crowdsale, setLoading }) => {

    const buyHandler = async (e) => {
        e.preventDefault()
        console.log("buy tokens")
    }
  return (
    <Form onSubmit={buyHandler} style={{ maxWidth: "800px", margin: "50px auto" }}>
      <Form.Group as={Row}>
        <Col>
          <Form.Control type="number" placeholder="Enter amount" />
        </Col>
        <Col className="text-center">
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Buy Tokens
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Buy;
