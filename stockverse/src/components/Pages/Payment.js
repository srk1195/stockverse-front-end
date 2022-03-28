import React, { useEffect, useState } from 'react'
import { Navigation } from './Navigation';
import "../Css/Payment.css"
import {
  Row,
  Container,
  Col,
  Table,
  Form,
} from "react-bootstrap";
import {
  getPayments
} from '../../utils/apiCalls';
import PaymentForm from './PaymentForm'
import { useNavigate } from 'react-router-dom';

const Payment = () => {

  const navigate = useNavigate();

  const [paymentList, setPaymentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [search, setSearch] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const listPayments = async () => {
    //userId given for now
    let userId = "6241a51dc3b605106b626d06";
    let list = await getPayments(userId);
    setPaymentList(list?.payments);
    setFilteredList(list?.payments);
  }
  useEffect(async () => {
    await listPayments();
  }, [])

  useEffect(() => {
    let list = paymentList && [...paymentList];
    if (search && search.length > 0) {
      list = list.filter((item) => {
        return item['transactionId'].toString().toLowerCase().includes(search)
      })
    }

    if (statusFilter && statusFilter.length > 0) {
      list = list.filter((item) => {
        return item['status'] === statusFilter;
      })
    }
    setFilteredList(list);
  }, [search, statusFilter, paymentList])


  return (
    <>
      <Navigation />
      <Container className="p-bg-container p-container">
        <Row className="p-3">
          <Col className="d-flex justify-content-start mt-4">
            <h3>Payment</h3>
          </Col>
          <Col>
            <PaymentForm callback={setPaymentList} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ marginBottom: '2%' }}>
              <input className="searchText" placeholder="Search by ID" type="text" name="search" onChange={(e) => setSearch(e.target.value)}>
              </input>
            </div>
          </Col>
          <Col>
            <Form.Group className="" onChange={(e) => setStatusFilter(e.target.value || null)}>
              <Form.Select>
                <option value="">Select Status</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="FAILURE">FAILURE</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {filteredList.length === 0 && <div className="d-flex justify-content-center mt-4">
          <p className='text'>No Transactions found</p>
        </div>}
        {filteredList.length > 0 &&
          <div>
            <Table striped bordered hover className="p">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map(item => (
                  <tr>
                    <td><a href="" onClick={() => navigate(`/payment/users/6241a51dc3b605106b626d06/transactions/${item.transactionId}`)}>{item?.["transactionId"]}userId</a></td>
                    <td>{item.status}</td>
                    <td>{item?.createdDate ? new Date(item?.createdDate * 1000).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        }
      </Container>
    </>
  )
};


export default Payment;