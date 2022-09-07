import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import List from "./List";
import { useSnackbar } from "notistack";
import BorrowerDetails from "./BorrowerDetails";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewEntryComponent = (props) => {
  const [borrowers, setBorrowers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [fetchAgain, setFetchAgain] = useState(false);
  const [name, setName] = useState()

  const { enqueueSnackbar } = useSnackbar();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChangeHandler()
    }, 250)

    return () => clearTimeout(delayDebounceFn)
  }, [name])

  const onChangeHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/borrower/get?search=${name}`, config)
      setBorrowers(res.data.borrowers)
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Something went wrong', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  }

  return (
    <div
      style={{
        marginTop: "4em",
      }}
    >
      <Typography variant="h6" color="GrayText" noWrap component="div" my={2}>
        New Entry
      </Typography>
      <center>
        <Box
          sx={{ flexGrow: 1 }}
          style={{
            maxWidth: "700px",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: '20px 0px'
            }}
          >
            <DatePicker
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setDate(date)}
            />
          </Box>
          <TextField
            fullWidth
            label='name'
            placeholder="Name"
            name="name"
            error={false}
            helperText={false}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <List
          borrowers={borrowers}
          date={date}
          addLoader={props.addLoader}
          removeLoader={props.removeLoader}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      </center>
    </div>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(NewEntryComponent);
