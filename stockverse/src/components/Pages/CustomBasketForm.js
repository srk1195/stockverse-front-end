import { Navigation } from "./Navigation";
import "../Css/CustomBasket.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Alert, Button } from "react-bootstrap";

const CustomBasketAdmin = () => {
  const theme = useTheme();

  const [basketName, setBasketName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ageGroup, setAgeGroup] = React.useState("");
  const [confidenceLevel, setConfidenceLevel] = React.useState("");
  const [marketSymbol, setMarketSymbol] = React.useState([]);
  const [isVisibility, setIsVisibility] = React.useState(false);

  const addCustomBasket = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        basket_name: basketName,
        description: description,
        age_group: ageGroup,
        confidence_level: confidenceLevel,
        market_symbol: marketSymbol,
        visibility: isVisibility,
      }),
    };
    fetch(
      "http://localhost:5000/api/customBasket/addCustomBasket",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const printValues = (event) => {
    console.log("basketName " + basketName);
    console.log("description " + description);
    console.log("ageGroup " + ageGroup);
    console.log("confidenceLevel " + confidenceLevel);
    console.log("marketSymbol " + marketSymbol);
    console.log("isVisibility " + isVisibility);
  };

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setConfidenceLevel(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleBasketName = (e) => {
    setBasketName(e.target.value);
    console.log(basketName);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  return (
    <>
      <Navigation />
      <div className="vertical-center">CUSTOM BASKET</div>
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              style={{ width: "30ch" }}
              id="outlined-search"
              type="search"
              label="Custom Basket"
              value={basketName}
              onChange={handleBasketName}
            />
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={handleDescription}
            style={{ width: "30ch" }}
          />
          <TextField
            style={{ width: "30ch" }}
            id="outlined-search"
            type="Target Age Group"
            label="Target Age Group"
            value={ageGroup}
          />
          <FormControl sx={{ m: 1, width: "30ch" }}>
            <InputLabel id="demo-controlled-open-select-label">
              Confidence Level
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={confidenceLevel}
              label="Confidence Level"
              onChange={handleChange}
            >
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{ width: "30ch" }}
            id="outlined-search"
            type="search"
            label="Market Symbol"
          />
        </Box>
        <Button
          onClick={() => {
            alert("Space");
          }}
          style={{ backgroundColor: "#474d5a", color: "white" }}
          variant="contained"
        >
          Contained
        </Button>
      </div>
    </>
  );
};

export default CustomBasketAdmin;
