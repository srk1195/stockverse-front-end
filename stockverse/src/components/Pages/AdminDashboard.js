import React from "react";
import "../Css/AdminDashboard.css";
import { AdminNavigation } from "./AdminNavigation";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/usersList");
  };
  const handleCustomBasket = (e) => {
    e.preventDefault();
    navigate("/customBasketListAdmin");
  };

  return (
    <div className="adminDashboard">
      <AdminNavigation />
      <div>
        <div class="page">
          <Card className="totalCard">
            <div className="container">
              <Card.Body
                onClick={() => handleClick()}
                className="cardLeft eachCard bg-secondary"
              >
                Check Activity
              </Card.Body>
              <Card.Body className="cardRight eachCard bg-secondary">
                Investment Video Strategy
              </Card.Body>
            </div>
            <div className="container">
              <Card.Body className="cardLeft eachCard bg-secondary">
                Mail Management
              </Card.Body>
              <Card.Body className="cardRight eachCard bg-secondary">
                My blogs
              </Card.Body>
            </div>
            <div className="container">
              <Card.Body
                onClick={(e) => handleCustomBasket(e)}
                className="eachCard bg-secondary"
              >
                Custom Basket Management
              </Card.Body>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
