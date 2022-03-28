// Author: Sai Rahul Kodumuru (B00875628)
import React, { useEffect, useState } from 'react';
import { Navigation } from './Navigation';
import '../Css/Portfolio.css';
import { Row, Container, Col, Table, Form, Card } from 'react-bootstrap';
import { getPortfolioData } from '../../utils/apiCalls';
import getSymbolFromCurrency from 'currency-symbol-map';

const Portfolio = () => {
  const userId = '623fcb4036fe9031dcfd696e';
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    async function fetchPortfolioData(userId) {
      const response = await getPortfolioData(userId);
      setPortfolioData(response['data']['data']);
    }

    // Call the Async Function
    fetchPortfolioData(userId);
  }, []);

  const renderPortfolioData = () => {
    if (portfolioData.length === 0) {
      return <></>;
    } else {
      return portfolioData.map((portfolio, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{portfolio.instrumentName}</td>
            <td>{portfolio.instrumentSymbol}</td>
            <td>{portfolio.instrumentType.toLowerCase()}</td>
            <td>{portfolio.instrumentRegion}</td>
            <td>{portfolio.buyQuantity}</td>
            <td>{portfolio.avgBuyPrice}</td>
            <td>
              {getSymbolFromCurrency(portfolio.currency)}
              {portfolio.investmentValue}
            </td>
          </tr>
        );
      });
    }
  };

  const showTable = () => {
    return (
      <div>
        <Table
          className="border border-success"
          responsive
          striped
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Instrument Name</th>
              <th>Instrument Symbol</th>
              <th>Instrument Type</th>
              <th>Instrument Region</th>
              <th>Buy Quantity</th>
              <th>Avg Buy Price</th>
              <th>Invested Amount</th>
            </tr>
          </thead>
          <tbody>{renderPortfolioData()}</tbody>
        </Table>
      </div>
    );
  };

  const showCardOne = () => {
    return (
      <Card border="primary" className="m-2" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Navigation />
      <Container className="pf-bg-container pf-container">
        <Row className="p-3  border border-danger">
          <Col className="">
            <Form.Group className="" controlId="formText">
              <Form.Control type="text" placeholder="search" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="p-3 border border-primary">
          <Col xs={3} className="border border-danger">
            {showCardOne()}
            {showCardOne()}
            {showCardOne()}
          </Col>
          <Col>{showTable()}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Portfolio;
