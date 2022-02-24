import React from 'react'
import "./Dashboard.css"
import {Navigation} from '../../components/Navigation';
import {
  Row,
  Container,
  Col,
} from "react-bootstrap";
const Dashboard = () => {
  return (
    <>
    <Navigation/>
    <Container className="d-bg-container d-container"> 
        <Row className="p-3">
            <Col>
                <h3>Dashboard</h3>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Dashboard