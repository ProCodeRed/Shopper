import React from "react";
import products from "../products.js";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.js";

const Homepage = () => {
//   console.log(products);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homepage;
