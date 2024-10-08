import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import FormContainer from "../components/FormContainer";
import { Button, FormControl, FormGroup, FormLabel, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginPage = ({location, history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] :  "/"

  useEffect(() => {
    if(userInfo){
        history.push(redirect)
    }
  },[history, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="mb-3">
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
          <Button type="submit" variant="primary">Sign In</Button>
          <Row className="py-3">
            <Col>
                New Customer? <Link to={redirect? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginPage;
