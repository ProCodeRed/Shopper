import React, { useEffect } from "react";
import {
  Col,
  Image,
  ListGroup,
  Row,
  FormControl,
  Button,
  ListGroupItem,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty));
  }, [productId, qty, dispatch]);

  const removeCartHandler = (id) => {
    console.log("remove");
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    console.log("checkout");
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="cartPage-wrapper">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="warning">
              Oops looks link you haven't added anything in your cart yet ! why
              not{" "}
              <Link className="text-bold font-18" to={"/"}>
                Go back and Shop little
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="cart-subtotal">
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal: (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
                </h2>
              </ListGroupItem>
              <ListGroupItem>
                <div className="total-amount font-16">
                  <span className="text-bold">Total Amount:</span>{" "}
                  <span className="text-bold font-18 text-extrabold">
                    $(
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                    )
                  </span>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
