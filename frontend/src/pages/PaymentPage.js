import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress) history.push('/shipping')
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


  return (
    <>
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as={'legend'}>Select Payment Method</Form.Label>
            </Form.Group>
            <Row className="justift-content-center mb-4">
                <Col>
                    <Form.Check
                        type="radio"
                        label="PayPal or Credit Card"
                        id="PayPal"
                        name="paymentMethod"
                        value={'PayPal'}
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
                {/* <Col>
                    <Form.Check
                        type="radio"
                        label="Stripe or Credit Card"
                        id="Stripe"
                        name="paymentMethod"
                        value={'Stripe'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col> */}
            </Row>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default PaymentPage