import React, { useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { useNavigate } from "react-router-dom";
import "../Css/CustomBasket.css";

import {
  Button,
  Card,
  Row,
  FloatingLabel,
  ListGroup,
  Form,
  Container,
  Col,
  Modal,
  Table,
} from "react-bootstrap";
import axios from "axios";

const CustomBasketList = () => {
  const [basketList, setBasketList] = useState([]);

  useEffect(() => {
    fetchCustomBaskets();
  }, []);

  const fetchCustomBaskets = () => {
    axios
      .get("http://localhost:5000/api/customBasket/getCustomBasketList")
      .then((res) => {
        if (res.status === 200) {
          setBasketList(res.data);
        } else {
          alert("Error with the api");
        }
      });
  };

  return (
    <>
      <div className="container">
        <div>CustomBasketList</div>(
        <div>
          <Row className="p-3"></Row>
          <Container className="p-1 bg-container container">
            <Row className="p-3">
              <Col className="p-3">
                <Card>
                  <Table striped bordered hover className="p-1">
                    <thead>
                      <tr>
                        <th>Basket Name</th>
                        <th>Description</th>
                        <th>Age Group</th>
                        <th>Confidence Level</th>
                        <th>MarketSymbol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basketList.map((item) => (
                        <tr>
                          <td>{item.basket_name}</td>
                          <td>{item.description}</td>
                          <td>{item.age_group}</td>
                          <td>{item.confidence_level}</td>
                          <td>
                            {item.market_symbol
                              .toString()
                              .replaceAll(",", ", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      )
    </>
  );
};

export default CustomBasketList;
