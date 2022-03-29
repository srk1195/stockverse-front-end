import React, { useEffect, useState } from "react";
import "../Css/CustomBasket.css";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { AdminNavigation } from "./AdminNavigation";
import "../Css/CustomBasket.css";

const CustomBasketListAdmin = () => {
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

  const navigate = useNavigate();

  const navigateToListing = (e) => {
    e.preventDefault();
    navigate("/CustomBasketForm");
  };

  return (
    <>
      <AdminNavigation />
      <div style={{ backgroundColor: "#e9ecef", paddingTop: 10 }}>
        <div className="text-center fs-1">Custom Basket List</div>
        <Button
          onClick={(e) => navigateToListing(e)}
          style={{
            backgroundColor: "#474d5a",
            color: "white",
            float: "right",
            display: "block",
            marginRight: "3.5rem",
          }}
        >
          Add Basket
        </Button>
        <br />
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
                  <td>{item.market_symbol.toString().replaceAll(",", ", ")}</td>
                  <td>
                    <div className="col-md-4 col-lg-2">
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => deleteCustomBasket(e, item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CustomBasketListAdmin;
