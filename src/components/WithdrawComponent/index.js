import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get } from "../../utils/apiHelper";
import AddTransaction from "./AddTransaction";
import {BASE_URL_1} from "../../constants/urls"

const WithdrawComponent = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [update, setUpdate] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`,
        },
    };

    useEffect(() => {
        axios.get(`${BASE_URL_1}/withdraw/transaction`, config)
            .then(res => {
                setTransactions(res?.data?.withdraw);
                setUpdate(false);
            }).catch(err => {
                console.log(err);
                enqueueSnackbar("Something went wrong", {
                    autoHideDuration: 3000,
                    variant: "error"
                })
            })
    }, [update]);

    return (
        <>
            <Box mt={7} style={{ maxHeight: "80vw", height: "400px" }}>
                <AddTransaction token={props.auth.token} setUpdate={setUpdate}/>
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