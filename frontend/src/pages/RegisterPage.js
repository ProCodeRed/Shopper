import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import FormContainer from "../components/FormContainer";
import { Button, FormControl, FormGroup, FormLabel, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterPage = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] :  "/"

  useEffect(() => {
    if(userInfo){
        history.push(redirect)
    }
  },[history, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmedPassword){
        setMessage('Password do not match !')
    }else{
        dispatch(register(name, email, password))
    }
  }

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
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
          <Button type="submit" variant="primary">Register</Button>
          <Row className="py-3">
            <Col>
                Existing User? <Link to={redirect? `/login?redirect=${redirect}` : '/login'}>Login In</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default RegisterPage;
