import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
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
    <div>
      <Box sx={{ flexGrow: 1 }} mt={8}>
        <Typography variant="h6" noWrap component="div" my={2}>
          New Entry
        </Typography>
        <TextField
          id="name"
          name="name"
          placeholder="Name"
          variant="outlined"
          label="Name"
          fullWidth
          onChange={(e) => handleChange(e.target.value)}
        />
        {borrowers.map((borrower) => (
          <Box
            display="flex"
            justifyContent="space-between"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="black"
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
      </Box>
    </div>
  );
};

export default NewEntryComponent;
