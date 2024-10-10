import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUsersAllOrders } from "../actions/orderAction";

const ProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;


  const usersOrderList = useSelector(state => state.usersOrderList)
  const {loading: loadingAllOrders, error: errorAllOrders, userOrders} = usersOrderList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name ) {
        dispatch(getUserDetails('profile'))
        dispatch(getUsersAllOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setMessage("Password do not match !");
    } else {
      dispatch(updateUserProfile({ id: user.id, name, email, password }))
    }
  };

  console.log("all orders", userOrders)
  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant={"danger"}>{message}</Message>}
          {error && <Message variant={"danger"}>{error}</Message>}
          {success && <Message variant={"success"}>Profile has been updated !</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} className="mb-3">
            <FormGroup controlId="name" className="mb-3">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="email" className="mb-3">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="password" className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="confirmPassword" className="mb-3">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter Your Confirm Password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <Button type="submit" variant="primary">Update</Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
