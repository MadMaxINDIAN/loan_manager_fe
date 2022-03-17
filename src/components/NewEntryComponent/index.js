import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import DataGrid from "../DataGrid";
import axios from "axios";

const NewEntryComponent = () => {
  const [name, setName] = useState();
  const [borrowers, setBorrowers] = useState([]);

  const handleChange = async (name) => {
    const response = await axios.get(
      `http://localhost:5000/borrower/get?search=${name}`
    );
    setBorrowers(response.data.borrowers);
  };

  return (
    <div style={{
      marginTop: "4em"
    }}>
      <Typography variant="h6" color="GrayText" noWrap component="div" my={2}>
        New Entry
      </Typography>
      <center>
      <Box sx={{ flexGrow: 1 }} style={{
        maxWidth: "700px",
      }} >
        <TextField
          id="name"
          name="name"
          placeholder="Name"
          variant="outlined"
          label="Name"
          fullWidth
          style={{
            marginBottom: "1em"
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
        {borrowers.map((borrower, index) => (
          <Box
              key={index}
          className="hover_black"
          style={{
            display:"flex",
            justifyContent:"space-between",
            borderRadius:"15px",
            border: "2px solid #e0e0e0",
            padding: "0 15px",
            margin: "2px 0"
          }}
          onClick={() => {

          }}
          >
            <Typography noWrap component="div" my={2}>
              {borrower.name}
            </Typography>
            <Typography noWrap component="div" my={2}>
              {borrower.address}
            </Typography>
            <Typography noWrap component="div" my={2}>
              {borrower.contact}
            </Typography>
            <Typography noWrap component="div" my={2}>
              {borrower.occupation}
            </Typography>
            <Typography noWrap component="div" my={2}>
              {borrower.aadhar}
            </Typography>
          </Box>
        ))}
        
        {/* <DataGrid fileds={[]} /> */}
      </Box>
      </center>
    </div>
  );
};

export default NewEntryComponent;
