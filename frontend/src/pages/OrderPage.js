import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader.js";
import { getOrderDetails } from '../actions/orderAction'

const OrderPage = ({match}) => {
    const dispatch = useDispatch()
    const orderId = match.params.id


    const orderDetails = useSelector(state =>  state.orderDetails)
    const {order, loading, error} = orderDetails

    const fullAddress = order?.shippingAddress?.address +(", ") + order?.shippingAddress?.city +(", ") + order?.shippingAddress?.postalCode +(", ") + order?.shippingAddress?.country

    useEffect(() => {
      dispatch(getOrderDetails(orderId))
    },[])

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    if(!loading){
        
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    console.log("orderId", order)

    return loading ? <Loader /> : error ? 
    <Message variant={'danger'}>{error}</Message>
    :
    <>
        <h2>Order Details</h2>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush' className='py-3'>
                <ListGroup.Item className='py-3'>
                    <h2>Order Id</h2>
                    {order._id}
                </ListGroup.Item>
                <ListGroup.Item className='py-3'>
                    <h2>Shipping</h2>
                    <p><strong>Name: </strong>{(order?.user.name) ? order?.user.name : "Guest User"}</p>
                    <p><strong>Email: </strong><a href={`mailto:${order?.user.email}`}>{order?.user.email}</a></p>
                    <p>
                    <strong>Address:</strong>
                    {fullAddress}
                    </p>

                    {
                        (order?.isDelivered) ? <Message variant={'success'}>Order has been delivered on: {order?.isDelivered}</Message> : <Message variant={'danger'}>Order is yet to deliver</Message>
                    }
                </ListGroup.Item>
  
              <ListGroup.Item className='py-3'>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>
                {
                    (order?.isPaid) ? <Message variant={'success'}>Paid on: {order?.paidAt}</Message> : <Message variant={'danger'}>Payment is pending</Message>
                }
              </ListGroup.Item>
  
              <ListGroup.Item className='py-3'>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Oops! No order found.</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems?.map((item, index) => (
                      <ListGroup.Item key={index} className='py-3'>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item className='py-3'>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item className='py-3'>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='py-3'>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='py-3'>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='py-3'>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item >
              </ListGroup>
            </Card>
          </Col>
        </Row>
    </>
}

export default OrderPage