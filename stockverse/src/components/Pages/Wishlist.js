import React,{useState} from 'react';
import {Navigation} from './Navigation';
import {useNavigate} from "react-router-dom";
import "../Css/Wishlist.css"
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
    Table
} from "react-bootstrap";
function Wishlist() {
    const [state, setState] = useState('start');
    const [stateView, setStateView] = useState('startView');
    var btnAdd= e =>
    {
        e.preventDefault();
        setState('btnAdd');
    }
    var btnNewState= e =>
    {
        e.preventDefault();
        setState('none');
        setStateView('PageViewState');
    }
    var btnEdit= e =>
    {
        e.preventDefault();
        setState('btnEdit');
        setStateView('startView');
    }
    var btnDelete= e =>
    {
        e.preventDefault();
        handleDeleteShow();
    }
    var btnSave= e =>
    {
        e.preventDefault();            
        if(Name==="")
        { 
            setWarnFN(true); 
            setMsgFN("Please Enter a valid First Name."); 
            return;                   
        } 
        else if(!warnFN )
        {
            alert("Submitted Successfully");
            setState('start');
        } 
        
    }
    const navigate =useNavigate();
        const[Name,setName]=React.useState("");       
        const regexName = /^[a-zA-Z]+$/;
        const[warnFN,setWarnFN]= React.useState(false);
        const [msgFN, setMsgFN] = React.useState("");
        const initialList = [];
        const defaultArray = [
            {   id: 'UAN',firstname: 'Cvr Partners LP',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'ZIM',firstname: 'Zim Integrated Shipping Services Ltd',wtd:"+221.98",last:"73.75",change:"+0.27",pchng:"+0.37%"},
            {   id: 'CLMT',firstname: 'Calumet Specialty Pr',wtd:"+223.10",last:"15.96",change:"+0.43",pchng:"+2.77%"},
            {   id: 'AA',firstname: 'Alcoa Corp',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'CPSS',firstname: 'Consumer Portfol',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'METC',firstname: 'Ramaco Resources Inc',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'VET',firstname: 'Vermilion Energy Inc',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'NRT',firstname: 'North European Oil Royality Trust',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'DDS',firstname: "Dillard's",wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'PTSI',firstname: 'P A M Transport Sv',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'WFRD',firstname: 'Weatherford International Plc',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'RRD',firstname: 'Donnelley R.R. & Sons Company',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'TGLS',firstname: 'Tecnoglass Inc',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'DVN',firstname: 'Devon Energy Corp',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'SGML',firstname: 'Sigma Lithium Corp',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
            {   id: 'RENN',firstname: 'Renren Inc ADR',wtd:"+266.78",last:"101.20",change:"-0.40",pchng:"-0.39%"},
          ];
        const [investArray, setInvestArray] = React.useState(initialList);
        const [searchArray, setSearchArray] = React.useState(defaultArray);
        const changeName = (e) => {
            e.preventDefault();
            const name=e.target.name;
            if(name==="firstName"){           
                if(!regexName.test(e.target.value) && e.target.value)
                {
                    setWarnFN(true);
                    setMsgFN("Invalid First Name! Only alphabets allowed!");
                }
                else
                {
                    setWarnFN(false);
                    setName(e.target.value);
                }
            }
            setName(e.target.value);
        };
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        function plusClicked(props) {            
            
            const demo = [
                {
                  id: props.id,
                  firstname: props.firstname,
                  wtd: props.wtd,
                  last: props.last,
                  change: props.change,
                  pchng: props.pchng,
                }
              ];
            const investcount =investArray.length;
            if(investcount<5)
            {
                const searchList = searchArray.filter((item) => item.id !== props.id);
                setSearchArray(searchList);
                const investList = investArray.concat(demo);
                setInvestArray(investList); 
            }
            else
            {
                handleShow();
            }   
        }
        function minusClicked(props) {
            const investList = investArray.filter((item) => item.id !== props.id);
            setInvestArray(investList);
            const demo = [
                {
                  id: props.id,
                  firstname: props.firstname,
                  wtd: props.wtd,
                  last: props.last,
                  change: props.change,
                  pchng: props.pchng,
                }
              ];
            const searchList = searchArray.concat(demo);
            setSearchArray(searchList);
            console.log(investArray);
            console.log(searchArray);
        }
        const[searchTerm,setSearchTerm]=useState("");
        const [deleteShow, setDeleteShow] = useState(false);
        const handleDeleteNo = () => setDeleteShow(false);
        const handleDeleteShow = () => setDeleteShow(true);
        const handleDeleteYes = (e) => {
            setState('start');
            setStateView('startView');
            setName("");
            setInvestArray(initialList);
            setSearchArray(defaultArray);
            setDeleteShow(false);
        };
        const handlePayment = (e) => {
            navigate(`/payment`);
        };
    return (
        <>
        <Navigation/>
        <div>
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    To add more than five Investments, Please get Premium Subscription or delete at least one Investments !!
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePayment}>Get Premium</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={deleteShow} onHide={handleDeleteNo} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Are you sure, to delete this Wishlist?
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteNo}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDeleteYes}>Yes</Button>
                    </Modal.Footer>
                </Modal>
                <div className="d-flex justify-content-left" >
                    <Container className="p-1 w-bg-container w-container">  
                        
                        {state === 'start' && (
                            <div>
                                <Row className="p-3">
                                    <Col>
                                        <h3>Wishlist</h3>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        {state === 'start' && stateView === "startView" && (
                                            <Button style={{fontSize:18}} variant="outline-primary" onClick={btnAdd}><i className="fas fa-plus-circle" ></i>  Add New</Button>
                                        )}
                                    </Col>
                                </Row>
                                <div>
                                    { Name !== "" && (
                                        <div>
                                            <Row className="p-3">
                                                <Col className="p-3" sm={4}>
                                                    <Card>
                                                        <Card.Header>
                                                        <div onClick={btnNewState}><a href="">{Name}</a></div>                                                          
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>
                                                            <ListGroup >
                                                                    {investArray.map(item => (
                                                                        <ListGroup.Item>
                                                                            <span>  {item.id} - {item.firstname}</span>
                                                                        </ListGroup.Item>
                                                                    ))}
                                                                </ListGroup>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </div> 
                            </div>                               
                        )}
                        {stateView === 'PageViewState' && (
                            <div>
                                <Row className="p-3">
                                    <Col>
                                        <h3> View Wishlist</h3>
                                       
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button style={{fontSize:18,marginRight:10}} variant="outline-primary" onClick={btnEdit}><i className="fas fa-pencil-alt" ></i>  Edit</Button>
                                        <Button style={{fontSize:18}} variant="outline-primary" onClick={btnDelete}><i className="fas fa-trash-alt" ></i>  Delete</Button>
                                    </Col>
                                </Row>
                                <div>
                                <h5>Wishlist Name :{Name}</h5>
                                <Table striped bordered hover className="p-1">
                                    <thead>
                                        <tr>
                                        <th>Symbol</th>
                                        <th>Investments</th>
                                        <th>Wtd Alpha</th>
                                        <th>Last</th>
                                        <th>Change</th>
                                        <th>%Chg</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {investArray.map(item => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.wtd}</td>
                                            <td>{item.last}</td>
                                            <td>{item.change}</td>
                                            <td>{item.pchng}</td>
                                        </tr>                                       
                                    ))} 
                                    </tbody>
                                    </Table>
                                </div> 
                            </div>                               
                        )}
                        
                        {(state === 'btnAdd' || state === 'btnEdit') && (
                            <div>
                                
                                <Row className="p-3">
                                    <Col>
                                        {state==="btnAdd" && (
                                            <h3>Add Wishlist</h3>
                                        )}
                                        {state==="btnEdit" && (
                                            <h3>Edit Wishlist</h3>
                                        )}
                                    </Col>
                                    {state==="btnEdit" && (
                                        <Col className="d-flex justify-content-end">
                                            <Button style={{fontSize:18}} variant="outline-primary" onClick={btnDelete}><i className="fas fa-trash-alt" ></i>  Delete</Button>
                                        </Col>
                                    )}
                                    
                                </Row>
                            <Container className="p-1 bg-container container">  
                                <div className="inner">
                                    <div className="input_text">
                                        <FloatingLabel controlId="floatingName" label="Name">
                                            <Form.Control type="text" className={` ${warnFN ? "warning" : "" }`}  name="firstName"  value={Name} onChange={changeName}  placeholder="Enter Name" />
                                        </FloatingLabel>
                                        {warnFN ? <p style={{color:"red"}}><i className="fa fa-warning"></i>{msgFN}</p> : null}     
                                        
                                    </div>
                                </div>
                                <Row className="p-3">
                                    <Col className="p-3">
                                        <Card>
                                            <Card.Header as="h5">Investments</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    <ListGroup >
                                                        {investArray.map(item => (
                                                            <ListGroup.Item action onClick={() => minusClicked(item)}>
                                                                <i className="fas fa-minus-circle"></i>
                                                                <span>  {item.id} - {item.firstname}</span>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col className="p-3">
                                        <Card>
                                            <Card.Header as="h5">
                                                <div>
                                                    <input type="text" style={{"width" : "100%"}} placeholder="Search ..." onChange={e => {setSearchTerm(e.target.value)}}/> 
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                <ListGroup style={{"overflow": "auto","height": "400px"}}>
                                                    {searchArray.filter((val)=>{
                                                        if(searchTerm === "")
                                                        {
                                                            return val
                                                        }
                                                        else if(val.id.toLowerCase().includes(searchTerm.toLowerCase()))
                                                        {
                                                            return val
                                                        }
                                                    }).map((val,key)=>{
                                                        return (
                                                            <div>
                                                                <ListGroup.Item action onClick={() => plusClicked(val)}>
                                                                    <i className="fas fa-plus-circle"></i>
                                                                    <span>  {val.id} - {val.firstname}</span>
                                                                </ListGroup.Item>
                                                            </div>
                                                        );
                                                        
                                                    })}
                                                    </ListGroup>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="d-flex justify-content-end">
                                        <Button style={{fontSize:18}} variant="outline-primary" onClick={btnSave}><i className="fas fa-save" ></i>  Save</Button>
                                    </Col>
                                </Row>
                            </Container> 
                            </div>
                            )
                        }
                        
                    </Container>                
                </div>
            </div>
        </>
        
         
    );
  }
  
  export default Wishlist;