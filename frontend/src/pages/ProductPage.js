import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import products from "../products";
import Rating from "../components/Rating";

const ProductPage = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
  console.log(product);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/" title="Click to go back">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>{product.name}</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem className="amount">Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col className="label">Price:</Col>
                        <Col className="amount">${product.price}</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col className="label">Availability:</Col>
                        <Col>{product.countInStock>0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Button className="btn-block" disabled={product.countInStock === 0}>Add to Cart</Button>
                </ListGroupItem>
            </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
