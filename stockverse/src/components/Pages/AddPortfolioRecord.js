import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Navigation } from './Navigation';
import '../Css/Portfolio.css';
import {
  validateInstrumentSymbol,
  validateInstrumentCrypto,
  addPortfolioRecord,
} from '../../utils/apiCalls';
import currencyCodes from '../../utils/currencyCodes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddPortfolioRecord() {
  const userId = '623fcb4036fe9031dcfd696e';
  const [portfolioData, setPortfolioData] = useState({
    instrumentName: '',
    instrumentSymbol: '',
    instrumentType: '',
    instrumentRegion: '',
    currency: '',
    buyQuantity: 0,
    avgBuyPrice: 0,
    remarks: 'NA',
    error: { status: false, message: '' },
  });

  const {
    instrumentName,
    instrumentSymbol,
    instrumentRegion,
    currency,
    buyQuantity,
    avgBuyPrice,
    remarks,
  } = portfolioData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({ ...portfolioData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if the quantity and price are positive numbers
    if (buyQuantity <= 0 || avgBuyPrice <= 0) {
      setPortfolioData({
        ...portfolioData,
        error: {
          status: true,
          message:
            'Please enter positive numbers for Quantity and Buy Price fields',
        },
      });
      return;
    }

    let nw;
    if (portfolioData.instrumentType.toLowerCase() === 'Equity'.toLowerCase()) {
      nw = await validateInstrumentSymbol(instrumentSymbol.toUpperCase());
    } else {
      nw = await validateInstrumentCrypto(instrumentSymbol.toUpperCase());
    }

    if (nw.status) {
      // console.log('Firing in the Nw Status!!');
      // console.log('Match Found for the Symbol : ' + instrumentSymbol);
      // console.log(nw.matchedItem);
      // console.log(
      //   nw.matchedItem['instrumentRegion'],
      //   nw.matchedItem['currency']
      // );

      const newPortfolioData = {
        ...portfolioData,
        instrumentRegion: nw.matchedItem['instrumentRegion'],
        currency: nw.matchedItem['currency'],
      };

      setPortfolioData(newPortfolioData);

      // Add it to the mongoDB!
      const addResult = await addPortfolioRecord(newPortfolioData, userId);
      if (addResult.status) {
        toast.success('Successfully added the record');
        console.log(addResult.data);
        navigate('/portfolio');
      } else {
        setPortfolioData({
          ...portfolioData,
          error: { status: true, message: addResult.message },
        });
      }
    } else {
      setPortfolioData({
        ...portfolioData,
        instrumentSymbol: '',
        error: {
          status: true,
          message: 'Invalid instrument Symbol...please check it',
        },
      });
    }
  };

  const displayInstrumentRegion = () => {
    return (
      <Col>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Instrument Region</Form.Label>
          <Form.Control
            type="text"
            className="fw-lighter fst-italic"
            size="sm"
            placeholder="Ex:USA"
            required
            onChange={handleChange}
            name="instrumentRegion"
            value={instrumentRegion}
          />
        </Form.Group>
      </Col>
    );
  };

  const displayCurrency = () => {
    return (
      <Col>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Select Currency</Form.Label>
          <Form.Select
            className="mb-3 fw-lighter fst-italic"
            size="md"
            aria-label="Default select example"
            required
            onChange={handleChange}
            name="currency"
          >
            {Object.entries(currencyCodes).map((t, k) => (
              <option key={k} value={t[0]}>
                {t[0] + ' - ' + t[1]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    );
  };

  const displayForm = () => {
    return (
      <Form className="d-flex justify-content" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Name</Form.Label>
              <Form.Control
                type="text"
                className="fw-lighter fst-italic"
                size="sm"
                placeholder="Ex: IBM"
                required
                onChange={handleChange}
                name="instrumentName"
                value={instrumentName}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Type</Form.Label>
              <Form.Select
                className="mb-3 fw-lighter fst-italic"
                size="md"
                aria-label="Default select example"
                name="instrumentType"
                onChange={handleChange}
              >
                <option value="Equity">Equity</option>
                <option value="Crypto">Crypto</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Symbol</Form.Label>
              <Form.Control
                type="text"
                className="fw-lighter fst-italic"
                size="sm"
                placeholder="Ex: IBM.USA (or) BTC.USD"
                required
                onChange={handleChange}
                name="instrumentSymbol"
                value={instrumentSymbol}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type="text"
                className="fw-lighter fst-italic"
                size="sm"
                min="1"
                placeholder="Ex: short term buy"
                onChange={handleChange}
                name="remarks"
                value={remarks}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Buy Quantity</Form.Label>
              <Form.Control
                type="number"
                className="fw-lighter fst-italic"
                size="sm"
                placeholder="Ex:100"
                min="1"
                required
                onChange={handleChange}
                name="buyQuantity"
                value={buyQuantity}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Average Buy Price</Form.Label>
              <Form.Control
                type="number"
                step="any"
                className="fw-lighter fst-italic"
                size="sm"
                min="1"
                placeholder="Ex:1220"
                required
                onChange={handleChange}
                name="avgBuyPrice"
                value={avgBuyPrice}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="d-flex justify-content-center mt-4">
          <Button role="button" variant="outline-dark" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    );
  };

  const handleClose = () => {
    setPortfolioData({
      ...portfolioData,
      error: { status: false, message: '' },
    });
  };

  const displayErrorMessage = () => {
    if (portfolioData.error.status) {
      return (
        <div className="d-flex justify-content-center">
          <Alert size="sm" variant="danger" dismissible onClose={handleClose}>
            {portfolioData.error.message}
          </Alert>
        </div>
      );
    }
  };

  return (
    <>
      <Navigation />

      <Container fluid className="pf-bg-container p-2 pf-container">
        {displayErrorMessage()}
        <h3 className="text-center mb-5">
          {' '}
          Make a new entry to your portfolio
        </h3>
        {displayForm()}
      </Container>
    </>
  );
}

export default AddPortfolioRecord;
