import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get } from "../../utils/apiHelper";
import AddTransaction from "./AddTransaction";

const WithdrawComponent = (props) => {
    const [transactions, setTransactions] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`,
        },
    };

    useEffect(() => {
        axios.get("http://localhost:5000/withdraw/transaction", config)
            .then(res => {
                setTransactions(res?.data?.withdraw);
            }).catch(err => {
                console.log(err);
                enqueueSnackbar("Something went wrong", {
                    autoHideDuration: 3000,
                    variant: "error"
                })
            })
    }, []);

    return (
        <>
            <Box mt={7} style={{ maxHeight: "80vw", height: "400px" }}>
                <AddTransaction />
                <DataGrid
                    rows={transactions}
                    columns={[
                        { field: "id", headerName: "ID", flex: 1 },
                        { field: "name", headerName: "Name", flex: 1 },
                        { field: "amount", headerName: "Amount", flex: 1 },
                        { field: "createdAt", headerName: "Date and time", flex: 1 },
                    ]}
                    pageSize={25}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {})(WithdrawComponent);