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
import { integerPropType } from "@mui/utils";

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

  const deleteCustomBasket = (e, id) => {
    e.preventDefault();
    axios
      .delete("http://localhost:5000/api/customBasket/deleteCustomBasket/" + id)
      .then((res) => {
        if (res.status === 200) {
          fetchCustomBaskets();
        } else {
          alert("Error with the api");
        }
      });
  };

  return (
    <>
      <div>CustomBasketList</div>
      <div className="d-flex justify-content-left">
        <Container className="p-1 bg-container container">
          <Row className="p-3">
            <Table striped bordered hover className="p-1">
              <thead>
                <tr>
                  <th>Basket Name</th>
                  <th>Description</th>
                  <th>Age Group</th>
                  <th>Confidence Level</th>
                  <th>MarketSymbol</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {basketList.map((item, i) => (
                  <tr key={i}>
                    <td>{item.basket_name}</td>
                    <td>{item.description}</td>
                    <td>{item.age_group}</td>
                    <td>{item.confidence_level}</td>
                    <td>
                      {item.market_symbol.toString().replaceAll(",", ", ")}
                    </td>
                    <td>
                      <Button
                        type="danger"
                        onClick={(e) => deleteCustomBasket(e, item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CustomBasketList;
