import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../Images/Logo.png";
import "../Css/Navigation.css";
import { useNavigate } from "react-router-dom";
// import logo from '../logo.svg';
import { Container, NavDropdown } from "react-bootstrap";
import Payment from "./Payment";
import Portfolio from "./Portfolio";
import Dashboard from "./Dashboard";
import Wishlist from "./Wishlist";
import { Routes, Route } from "react-router-dom";
import CustomBasketList from "./CustomBasketList";

export class Navigation extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
    console.log(localStorage.getItem("token"));
  };
  handleProfile = () => {
    window.location = `/profile/${this.props.name}`;
  };

  render() {
    console.log(this.props.name);
    return (
      <>
        <h1>{this.props.value}</h1>
        <Navbar
          collapseOnSelect
          className=" App-header"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container style={{ marginLeft: "unset", minWidth: "100%" }}>
            <Navbar.Brand href="/home">
              {" "}
              <img
                src={logo}
                className="n-App-logo rounded-circle pe-3"
                alt="logo"
              />
              STOCKVERSE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link href="">
                  <i
                    className="fas fa-bell rounded-circle c-white "
                    alt="Notification"
                    width="30"
                  ></i>
                </Nav.Link>
                <NavDropdown
                  align="end"
                  title={
                    <i
                      className="fas fa-user-alt rounded-circle c-white"
                      alt="profile"
                      width="30"
                    ></i>
                  }
                >
                  <NavDropdown.Item href="">About</NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={this.handleProfile}
                    name={this.props.value}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="">Subscription</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.handleLogout}>
                    Logout
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="">Notification</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Navbar collapseOnSelect className="bg-secondary" expand="lg">
          <Container style={{ marginLeft: "unset" }}>
            <Navbar.Toggle aria-controls="responsive-navbaritem-nav" />
            <Navbar.Collapse id="responsive-navbaritem-nav">
              <Nav className="me-auto">
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/dashboard"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/portfolio"
                >
                  Portfolio
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/wishlist"
                >
                  Wishlist
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/payment"
                >
                  Payment
                </Nav.Link>
                <Nav.Link
                  className="d-inline p-2 bg-secondary text-white"
                  href="/customBasketList"
                >
                  Custom Basket
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/portfolio" element={<Portfolio />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route
            exact
            path="/customBasketList"
            element={<CustomBasketList />}
          />
        </Routes>
      </>
    );
  }
}
