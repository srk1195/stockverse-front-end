/*Author : Parthkumar Patel (B00899800)*/
import React,{useState, useEffect} from 'react';
import {Navigation} from './Navigation';
import {useNavigate} from "react-router-dom";
import "../Css/Wishlist.css"
import { addWishlist, getUserWishlist ,getWishlistById, updateWishlistById,deleteWishlistById} from '../../utils/axiosCall';
import { Button, Row, FloatingLabel, ListGroup, Form, Container, Col, Modal, Table } from "react-bootstrap"; 
import {Box, Grid, Card, CardContent, CardHeader, Divider}  from "@mui/material";
import CONSTANTS from '../../utils/constants';
import {isAuthenticated} from '../../utils/apiCalls';
import { toast } from 'react-toastify';

function Wishlist() {
    const [state, setState] = useState('start');
    const [stateView, setStateView] = useState('startView');
    const [wishlistData,setWishlistData] = useState({ WId:'',Name:'',Investments:'',InvestArray:[],SearchArray:[],ViewDetailsArray:[],UserId:'' });
  
    const navigate =useNavigate();
    const regexName = /^[a-zA-Z]+$/;
    const [warnFN,setWarnFN]= React.useState(false);
    const [msgFN, setMsgFN] = React.useState("");
    // Getting User Wishlist
    const [userWishlists, setUserWishlists] = useState([]);
    const [show, setShow] = useState(false);
    const [searchRegion,setSearchRegion]=useState(null);
    const [searchSymbol,setSearchSymbol]=useState(null);
    const [searchKeyword,setSearchKeyword]=useState(null);
    const [disableKeyword, setDisableKeyword] = useState(false);
    const [disableSymbol, setDisableSymbol] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteNo = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getUserWishlists();    
    }, []);
    
    const getUserWishlists = (e) =>  {
        const Authentication =isAuthenticated();
        if(Authentication !== false)
        {
            console.log("authn",Authentication);
            getUserWishlist(Authentication.id).then((res) => {
                if (res.status === 201) {
                    if (res.data !== null && res.data.Data !== null) {
                        setUserWishlists(res.data.Data);
                    } 
                }
            }).catch((err) => {
                if (!err?.response) {
                    toast.error('No Server Response');
                } else if (err.response?.status !== 201) {
                    toast.error(err.response?.data["Message"]);
                } else {
                    toast.error('Wishlist fetching Failed.');
                }
            }); 
        }
        else
        {
            toast.error("User Not Authenticated.");
        }
    }

    //-------------------------------
    var btnAdd= e =>
    {
        const Authentication =isAuthenticated();
        if(Authentication !== false)
        {
            e.preventDefault();
            setWishlistData({...wishlistData,ViewDetailsArray:[],Name:'',WId:'',InvestArray:[],Investments:'',SearchArray:[],UserId:Authentication.id});
            setState('btnAdd');
        }
        else
        {
            toast.error("User Not Authenticated.");
        }
        
    }
    var btnNewState= (e,reqid) =>
    {
        e.preventDefault();
        let wNameFunction = null,wIdFunction=null;
        let wViewDetailArrayFunction = [];
        let wInvestArrayFunction = [];
        let wInvestmentsFunction =[];
        getWishlistById(reqid).then((res) => {
            if (res.status === 201) {
                if (res.data !== null && res.data.Data !== null) {
                    wNameFunction=res.data.Data[0].Name;
                    
                    wIdFunction=res.data.Data[0]._id;
                    wInvestmentsFunction=res.data.Data[0].Investments;
                    console.log(res.data.Data[0].Investments);
                    if(wInvestmentsFunction === "" || wInvestmentsFunction === null)
                    {
                        setWishlistData({...wishlistData,ViewDetailsArray:wViewDetailArrayFunction,Name:wNameFunction,WId:wIdFunction,InvestArray:wInvestArrayFunction,Investments:wInvestmentsFunction,UserId:wishlistData.UserId});
                    }
                    else
                    {
                        var arr = res.data.Data[0].Investments.split(",");
                        for (var i=0; i < arr.length; i++) {
                            var demo = 
                                {
                                    Symbol: arr[i].split('-')[0],
                                    Name: arr[i].split('-')[1],
                                    Type: '',
                                    Region: '',
                                };
                            
                            wInvestArrayFunction.push(demo);
                            const url = CONSTANTS.GLOBAL_QUOTE(arr[i].split('-')[0]);
                            let Sym=arr[i].split('-')[0],Name=arr[i].split('-')[1];
                            fetch(url)
                            .then(
                                function(res){return res.json();}
                            )
                            .then( 
                                function(res){
                                    if(res["Global Quote"]){
                                        var apiSymbol=Sym,apiName=Name,apiOpen=res["Global Quote"]["02. open"],
                                        apiHigh=res["Global Quote"]["03. high"],apiLow=res["Global Quote"]["04. low"],apiPrice=res["Global Quote"]["05. price"],
                                        apiPreviousClose=res["Global Quote"]["08. previous close"],apiChng=res["Global Quote"]["09. change"],apiPChng=res["Global Quote"]["10. change percent"];
                                        const demo = 
                                                {
                                                    Symbol: apiSymbol,
                                                    Name: apiName,
                                                    Open: apiOpen,
                                                    High: apiHigh,
                                                    Low: apiLow,
                                                    Price: apiPrice,
                                                    PreviousClose: apiPreviousClose,
                                                    Change: apiChng,
                                                    PChng: apiPChng,
                                                };
                                        wViewDetailArrayFunction.push(demo);
                                        console.log(wViewDetailArrayFunction);
                                        setWishlistData({...wishlistData,ViewDetailsArray:wViewDetailArrayFunction,Name:wNameFunction,WId:wIdFunction,InvestArray:wInvestArrayFunction,Investments:wInvestmentsFunction,UserId:wishlistData.UserId});
                                    } 
                                }
                            )                       
                        }
                    }                    
                    setState('none');
                    setStateView('PageViewState'); 
                }
            }
        }).catch((err) => {
            if (!err?.response) {
                toast.error('No Server Response');
            } else if (err.response?.status !== 201) {
                toast.error(err.response?.data["Message"]);
            } else {
                toast.error('Wishlist fetching Failed.');
            }
        }); 
        
    }
    
    var btnEdit= e =>
    {
        e.preventDefault();
        setState('btnEdit');
        setStateView('startView');
    }
    var btnDelete=  (e,reqId) =>
    {
        e.preventDefault();
        handleDeleteShow(reqId);
    }
    var btnSave= e =>
    {
        e.preventDefault();            
        if(wishlistData.Name==="")
        { 
            setWarnFN(true); 
            setMsgFN("Please Enter a valid First Name."); 
            return;                   
        } 
        else if(!warnFN )
        {
            var SymbolsName="";
            wishlistData.InvestArray.forEach(data => SymbolsName += data.Symbol+"-"+data.Name+",")
            const newWishlist = {
                UserId:wishlistData.UserId,
                Name: wishlistData.Name,
                Investments: SymbolsName.slice(0, -1),
            };
            addWishlist(newWishlist).then((res) => {
                    //console.log(res);
                    if (res.status === 201) {
                        if (res.data["Status"]) {
                            toast.success(res.data["Message"]);
                            getUserWishlists(); 
                            setWishlistData({...wishlistData,ViewDetailsArray:[],Name:'',WId:'',InvestArray:[],Investments:'',SearchArray:[],UserId:wishlistData.UserId});
                            setState('start');
                        } 
                    }
                }).catch((err) => {
                    if (!err?.response) {
                        toast.error('No Server Response');
                    } else if (err.response?.status !== 201) {
                        toast.error(err.response?.data["Message"]);
                    } else {
                        toast.error('Wishlist saving Failed.');
                    }
                }); 
        }
    }
    var btnUpdate = (e,reqId) =>
    {
        e.preventDefault();            
        if(wishlistData.Name==="")
        { 
            setWarnFN(true); 
            setMsgFN("Please Enter a valid First Name."); 
            return;                   
        } 
        else if(!warnFN )
        {
            var SymbolsName="";
            wishlistData.InvestArray.forEach(data => SymbolsName += data.Symbol+"-"+data.Name+",")
            const newWishlist = {
                UserId:wishlistData.UserId,
                Name: wishlistData.Name,
                Investments: SymbolsName.slice(0, -1),
            };
            updateWishlistById(reqId,newWishlist).then((res) => {
                    //console.log(res);
                    if (res.status === 201) {
                        if (res.data !== null && res.data.Data !== null) {
                            toast.success(res.data["Message"]);
                            getUserWishlists(); 
                            setWishlistData({...wishlistData,ViewDetailsArray:[],Name:'',WId:wishlistData.WId,InvestArray:[],Investments:'',SearchArray:[],UserId:wishlistData.UserId});
                            setState('start');
                        } 
                    }
                }).catch((err) => {
                    if (!err?.response) {
                        toast.error('No Server Response');
                    } else if (err.response?.status !== 201) {
                        toast.error(err.response?.data["Message"]);
                    } else {
                        toast.error('Wishlist updating Failed.');
                    }
                }); 
        }
    }
    
    
    const changeName = (e) => {
        e.preventDefault();
        const name=e.target.name;
        if(name==="WishlistName"){           
            if(!regexName.test(e.target.value) && e.target.value)
            {
                setWarnFN(true);
                setMsgFN("Invalid First Name! Only alphabets allowed!");
            }
            else
            {
                setWarnFN(false);
                setWishlistData({...wishlistData,Name:e.target.value});
            }
        }
        setWishlistData({...wishlistData,Name:e.target.value});
    };
    
    function plusClicked(props) {
        //console.log(props); 
        const demo = [
            {
                Symbol: props.Symbol,
                Name: props.Name,
                Type: props.Type,
                Region: props.Region,
            }
        ];
        const Authentication =isAuthenticated();
        if(Authentication !== false)
        {
            if(Authentication.isPremium ===true)
            {
                const foundInvest = wishlistData.InvestArray.filter((item) => item.Symbol === demo[0]["Symbol"]); 
                if(foundInvest.length >0)
                {
                    toast.error("Investment has already been added");
                }
                else
                {
                    let investList = wishlistData.InvestArray.concat(demo);
                    setWishlistData({...wishlistData,InvestArray:investList});
                }
            }
            else{
                const investcount =wishlistData.InvestArray.length;
                if(investcount<5)
                {
                    const foundInvest = wishlistData.InvestArray.filter((item) => item.Symbol === demo[0]["Symbol"]); 
                    if(foundInvest.length >0)
                    {
                        toast.error("Investment has already been added");
                    }
                    else
                    {
                        let investList = wishlistData.InvestArray.concat(demo);
                        setWishlistData({...wishlistData,InvestArray:investList});
                    }
                    
                }
                else
                {
                    handleShow();
                } 
            }
        }
        else
        {
            toast.error("User Not Authenticated.");
        }   
    }
    function minusClicked(props) {
        let investList = wishlistData.InvestArray.filter((item) => item.Symbol !== props.Symbol);
        setWishlistData({...wishlistData,InvestArray:investList});
    }
    
    const handleDeleteYes = (e) => {
        deleteWishlistById(wishlistData.WId).then((res) => {
            if (res.status === 201) {
                if (res.data !== null && res.data.Data !== null) {
                    toast.success(res.data["Message"]);
                    setState('start');
                    setStateView('startView');
                    getUserWishlists(); 
                    setWishlistData({...wishlistData,ViewDetailsArray:[],Name:'',WId:'',InvestArray:[],Investments:'',SearchArray:[],UserId:wishlistData.UserId});
                    setDeleteShow(false);
                } 
            }
        }).catch((err) => {
            if (!err?.response) {
                toast.error('No Server Response');
            } else if (err.response?.status !== 201) {
                toast.error(err.response?.data["Message"]);
            } else {
                toast.error('Wishlist fetching Failed.');
            }
        }); 
        
    };
    const handlePayment = (e) => {
        navigate(`/payment`);
    };
    const btnSearch =(e)=>{
       
        let API_SEARCH = null;
        if(searchKeyword==null && searchSymbol== null)
        {
            toast.error("Please enter Search Symbol or Keyword for finding Investment.");
        }
        else
        {
            if(searchSymbol)
            {
                API_SEARCH=searchSymbol;
                if(searchRegion)
                {
                    if(searchRegion !== "-" && searchRegion !=="0"){API_SEARCH+="."+searchRegion;} 
                }
            }
            if(searchKeyword)
            {
                API_SEARCH = searchKeyword;
            }
            
            const url = CONSTANTS.SYMBOL_SEARCH(API_SEARCH);
        
            //alert(API_Call);
            fetch(url)
            .then(
                function(res){return res.json();}
            )
            .then( 
                function(res){
                    if(res["bestMatches"].length)
                    {
                        let searchList =[];
                        res["bestMatches"].forEach(obj => {
                            var apiSymbol=null,apiName=null,apiType=null,apiRegion=null;
                            Object.entries(obj).forEach(([key, value]) => {
                                if(key.toString() ==="1. symbol"){
                                    apiSymbol=value;
                                }
                                if(key.toString() ==="2. name"){
                                    apiName=value;
                                }
                                if(key.toString() ==="3. type"){
                                    apiType=value;
                                }
                                if(key.toString() ==="4. region"){
                                    apiRegion=value;
                                }
                            });
                            const demo = 
                                {
                                    Symbol: apiSymbol,
                                    Name: apiName,
                                    Type: apiType,
                                    Region: apiRegion,
                                };
                            searchList.push(demo);
                        });
                        setWishlistData({...wishlistData,SearchArray:searchList});
                    }
                }
            )
        } 
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
                                    <Box className='ucontainer' sx={{ flexGrow: 1 }}>
                                        <Grid container style={{marginLeft: '2px'}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                            {userWishlists.map((wishlist) => {
                                                var arr = wishlist.Investments.split(",");
                                                //console.log(wishlist._id);
                                                return (
                                                    <>
                                                        <Card className='udtitle' >
                                                            
                                                            <CardHeader title={<div onClick={(e) => {btnNewState(e,wishlist._id); }} style={{textAlign:'center'}}><a href="">{wishlist.Name}</a></div>   }/><Divider />
                                                            <CardContent>
                                                                <ListGroup style={{overflow: "auto",maxHeight: "500px"}}>
                                                                    {arr.map(item => (
                                                                        <ListGroup.Item key={item.split('-')[0]}>
                                                                            <span>  {item.split('-')[0]} - {item.split('-')[1]}</span>
                                                                        </ListGroup.Item>
                                                                    ))}
                                                                </ListGroup>
                                                            </CardContent>
                                                        </Card>
                                                    </>
                                                )
                                            })}
                                        </Grid>
                                    </Box>
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
                                        <Button style={{fontSize:18}} variant="outline-primary" onClick={(e) => {btnDelete(e,wishlistData.WId)}}><i className="fas fa-trash-alt" ></i>  Delete</Button>
                                    </Col>
                                </Row>
                                <div>
                                <h5>Wishlist Name :{wishlistData.Name}</h5>
                                
                                <Table striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>Symbol</th>
                                            <th>Name</th>
                                            <th>Open</th>
                                            <th>High</th>
                                            <th>Low</th>
                                            <th>Price($)</th>
                                            <th>Previous Close</th>
                                            <th>Change</th>
                                            <th>Change (%)</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                    {console.log(wishlistData.ViewDetailsArray)}
                                    {console.log(wishlistData.ViewDetailsArray.length)}
                                    {(wishlistData.ViewDetailsArray.length === 0) ? <> <tr><td colSpan="9">No Record Found.</td></tr></> : <>
                                    {wishlistData.ViewDetailsArray?.map(item => (
                                        <tr key={item.Symbol}>
                                            <td>{item.Symbol}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Open}</td>
                                            <td>{item.High}</td>
                                            <td>{item.Low}</td>
                                            <td>{item.Price}</td>
                                            <td>{item.PreviousClose}</td>
                                            <td>{item.Change}</td>
                                            <td>{item.PChng}</td>
                                        </tr>                                       
                                    ))}
                                    </>}
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
                                            <Button style={{fontSize:18}} variant="outline-primary" onClick={(e) => {btnDelete(e,wishlistData.WId)}}><i className="fas fa-trash-alt" ></i>  Delete</Button>
                                        </Col>
                                    )}
                                    
                                </Row>
                            <Container className="p-1 bg-container container">  
                                <div className="inner">
                                    <div className="input_text">
                                        <FloatingLabel controlId="floatingName" label="Name">
                                            <Form.Control type="text" className={` ${warnFN ? "warning" : "" }`}  name="WishlistName"  value={wishlistData.Name} onChange={changeName}  placeholder="Enter Name" />
                                        </FloatingLabel>
                                        {warnFN ? <p style={{color:"red"}}><i className="fa fa-warning"></i>{msgFN}</p> : null}     
                                        
                                    </div>
                                </div>
                                <Row className="p-3">
                                    <Col className="p-3">
                                        <Card>
                                            <CardHeader title="Investments"/><Divider />
                                            <CardContent>
                                                    <ListGroup style={{overflow: "auto",maxHeight: "500px"}}>
                                                        {/* { console.log("hi")}{ console.log(investArray)} */}
                                                        {wishlistData.InvestArray.map(item => (
                                                            <>
                                                            
                                                            <ListGroup.Item action key={item.Symbol} onClick={() => minusClicked(item)}>
                                                                <i className="fas fa-minus-circle"></i>
                                                               
                                                                <span>  {item.Symbol} - {item.Name}</span>
                                                            </ListGroup.Item>
                                                            </>
                                                        ))}
                                                    </ListGroup>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col className="p-3">
                                        <Card>
                                            <CardHeader subheader={
                                                <div>
                                                    <Form style={{flexDirection: 'row'}}>
                                                        <Col  style={{marginRight:'1%'}} sm={9}>
                                                        <Row className="g-2 mb-2">
                                                            <Col md>
                                                                <FloatingLabel controlId="txtSymbol" label="Symbol">
                                                                {disableSymbol ? <Form.Control type="text" placeholder="Example: IBM" disabled onChange={e => {setSearchSymbol(e.target.value); (e.target.value)? setDisableKeyword(true) : setDisableKeyword(false)}}/> 
                                                                : <Form.Control type="text" placeholder="Example: IBM" onChange={e => {setSearchSymbol(e.target.value); (e.target.value)? setDisableKeyword(true) : setDisableKeyword(false)} }/>}                                                                
                                                                </FloatingLabel>
                                                            </Col>
                                                            <Col md>
                                                                <FloatingLabel controlId="txtRegion" label="Region">
                                                                {disableSymbol ?  
                                                                <Form.Select aria-label="Floating label select example"  disabled onChange={e => {setSearchRegion(e.target.value); (e.target.value !== "0")? setDisableKeyword(true) : setDisableKeyword(false)}}>
                                                                    <option value="0">Open this select menu</option>
                                                                    <option value="-">United States</option>
                                                                    <option value="LON">UK - London Stock Exchange</option>
                                                                    <option value="FRK">Frankfurt</option>
                                                                    <option value="SAO">Brazil/Sao Paolo</option>
                                                                    <option value="BSE">India - BSE</option>
                                                                    <option value="TRT">Canada - Toronto Stock Exchange</option>
                                                                    <option value="TRV">Canada - Toronto Venture Exchange</option>
                                                                    <option value="DEX">Germany - XETRA</option>
                                                                    <option value="SHH">China - Shanghai Stock Exchange</option>
                                                                    <option value="SHZ">China - Shenzhen Stock Exchange</option>
                                                                </Form.Select>
                                                                :     
                                                                <Form.Select aria-label="Floating label select example"  onChange={e => {setSearchRegion(e.target.value); (e.target.value !== "0")? setDisableKeyword(true) : setDisableKeyword(false)}}>
                                                                    <option value="0">Open this select menu</option>
                                                                    <option value="-">United States</option>
                                                                    <option value="LON">UK - London Stock Exchange</option>
                                                                    <option value="FRK">Frankfurt</option>
                                                                    <option value="SAO">Brazil/Sao Paolo</option>
                                                                    <option value="BSE">India - BSE</option>
                                                                    <option value="TRT">Canada - Toronto Stock Exchange</option>
                                                                    <option value="TRV">Canada - Toronto Venture Exchange</option>
                                                                    <option value="DEX">Germany - XETRA</option>
                                                                    <option value="SHH">China - Shanghai Stock Exchange</option>
                                                                    <option value="SHZ">China - Shenzhen Stock Exchange</option>
                                                                </Form.Select>}
                                                                </FloatingLabel>
                                                            </Col>
                                                        </Row>
                                                        <Row className="g-2">
                                                            <FloatingLabel controlId="txtKeyword"  label="Keyword">
                                                                {disableKeyword ? <Form.Control type="text" disabled  placeholder="Example: microsoft" onChange={e => {setSearchKeyword(e.target.value); (e.target.value)? setDisableSymbol(true) : setDisableSymbol(false)}} /> 
                                                                : <Form.Control type="text"  placeholder="Example: microsoft" onChange={e => {setSearchKeyword(e.target.value); 
                                                                (e.target.value)? setDisableSymbol(true) : setDisableSymbol(false) }} />} 
                                                                
                                                            </FloatingLabel>
                                                        </Row>
                                                        </Col>
                                                        <Col  sm={3} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                                                        <Button style={{fontSize:18}} variant="outline-primary" onClick={btnSearch}><i className="fas fa-search" ></i>  Search</Button>
                                                        </Col>
                                                        
                                                    </Form>
                                                    {/* <input type="text" style={{"width" : "100%"}} placeholder="Search ..." onChange={e => {setSearchTerm(e.target.value)}}/>  */}
                                                </div> 
                                            }/><Divider />
                                            <CardContent>
                                                <ListGroup style={{overflow: "auto",maxHeight: "400px"}}>
                                                    {wishlistData.SearchArray.map((val,key)=>{
                                                        return (
                                                            <div>
                                                                <ListGroup.Item action key={val.Symbol} onClick={() => plusClicked(val)}>
                                                                    <i className="fas fa-plus-circle"></i>
                                                                    <span>  {val.Symbol} - {val.Name}</span>
                                                                </ListGroup.Item>
                                                            </div>
                                                        );
                                                        
                                                    })} 
                                                    </ListGroup>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="d-flex justify-content-end">
                                        {state==="btnAdd" && (
                                            <Button style={{fontSize:18}} variant="outline-primary" onClick={btnSave}><i className="fas fa-save" ></i>  Save</Button>
                                        )}
                                        {state==="btnEdit" && (
                                            <Button style={{fontSize:18}} variant="outline-primary" onClick={(e) => {btnUpdate(e,wishlistData.WId)}}><i className="fas fa-save" ></i>  Update</Button>
                                        )}
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
