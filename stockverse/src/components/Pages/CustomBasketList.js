import React, { useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import "../Css/CustomBasket.css";
import { Table } from "react-bootstrap";
import axios from "axios";

const CustomBasketList = () => {
  const [basketList, setBasketList] = useState([]);

  useEffect(() => {
    fetchCustomBaskets();
  }, []);

  const fetchCustomBaskets = () => {
    axios
      .get("http://localhost:5000/api/customBasket/getCustomBasketByVisibility")
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
      <Navigation />
      <div style={{ backgroundColor: "#e9ecef" }}>
        <div className="text-center fs-1">Custom Basket List</div>
        <br />
        <div className="table-responsive">
          <Table striped bordered hover className="table">
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
              {basketList.map((item, i) => (
                <tr key={i}>
                  <td>{item.basket_name}</td>
                  <td>{item.description}</td>
                  <td>{item.age_group}</td>
                  <td>{item.confidence_level}</td>
                  <td>{item.market_symbol.toString().replaceAll(",", ", ")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CustomBasketList;
