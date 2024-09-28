import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.js";
import { ListProducts } from "../actions/productAction";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const Homepage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(ListProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {loading
          ? <Loader />
          : error
          ? <Message variant='danger'>{error}</Message>
          : products.map((product) => (
              <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
      </Row>
    </>
  );
};

export default Homepage;
