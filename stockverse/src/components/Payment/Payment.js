import React from 'react'
import {Navigation} from '../../components/Navigation';
import "./Payment.css"
import {
    Row,
    Container,
    Col,
} from "react-bootstrap";
const Payment = () => {
  return (
    <>
    <Navigation/>
    <Container className="p-bg-container p-container"> 
        <Row className="p-3">
            <Col>
                <h3>Payment</h3>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Payment