import React from 'react'
import {Navigation} from '../../components/Navigation';
import "./Portfolio.css"
import {
    Row,
    Container,
    Col,
  } from "react-bootstrap";
const Portfolio = () => {
  return (
    <>
    <Navigation/>
    <Container className="pf-bg-container pf-container"> 
        <Row className="p-3">
            <Col>
                <h3>Portfolio</h3>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Portfolio