import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, FormControl, FormGroup, FormLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";

const ShippinPage = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city);
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
    const [country, setCountry] = useState(shippingAddress?.country);

    const dispatch = useDispatch()

    console.log(shippingAddress)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }


  return (
    <>
    <FormContainer>
        <Form onSubmit={submitHandler} className="mb-3">
            <FormGroup controlId="address" className="mb-3">
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></FormControl>
            </FormGroup>
            <FormGroup controlId="city" className="mb-3">
                    <FormLabel>City</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Your City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></FormControl>
            </FormGroup>
            <FormGroup controlId="postalcode" className="mb-3">
                    <FormLabel>Postal code</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Your Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></FormControl>
            </FormGroup>
            <FormGroup controlId="country" className="mb-3">
                    <FormLabel>Country</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter Your Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></FormControl>
            </FormGroup>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
    </>
  )
}

export default ShippinPage