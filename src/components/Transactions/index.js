import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import List from "./List";
import axios from "axios";
import {
    addLoader,
    removeLoader,
} from "../../redux/services/actions/loaderActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewEntryComponent = (props) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [transactions, setTransactions] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`,
        },
    };

    const getTransactions = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/transaction/get/dates`,
          {
            from_date: fromDate,
            to_date: toDate,
          },
          config
        );
        setTransactions(response.data.transactions);
        console.log(response.data.transactions);
      } catch (e) {
        enqueueSnackbar("Some error occured", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }

    return (
        <div
            style={{
                marginTop: "4em",
            }}
        >
            <Typography
                variant="h6"
                color="GrayText"
                noWrap
                component="div"
                my={2}
            >
                Transactions
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
                        }}
                    >
                        <DatePicker
                            selected={fromDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setFromDate(date)}
                        />

                        <DatePicker
                            selected={toDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setToDate(date)}
                        />
                        <Button variant="contained" size="small" onClick={getTransactions} >
                          Search
                        </Button>
                    </Box>
                </Box>
                <List transactions={transactions} />
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