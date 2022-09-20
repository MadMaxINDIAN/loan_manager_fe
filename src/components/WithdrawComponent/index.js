import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addLoader, removeLoader } from '../../redux/services/actions/loaderActions'
import { get } from "../../utils/apiHelper";
import AddTransaction from "./AddTransaction";
import { BASE_URL_1 } from "../../constants/urls"
import formatAmount from "../../utils/formatAmount";

const WithdrawComponent = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState()
    const [update, setUpdate] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`,
        },
    };

    const handleDelete = async () => {
        props.addLoader()
        try {
            await axios.delete(`${BASE_URL_1}/withdraw/${transaction.id}`, config)
            setTransaction()
            setUpdate(!update)
            props.removeLoader()
            enqueueSnackbar('Entry deleted', {
                variant: 'success',
                autoHideDuration: 3000
            })
        } catch (err) {
            console.log(err)
            props.removeLoader()
            let message = 'Something went wrong'
            if (err?.response?.data?.errors) {
                message = err?.response?.data?.errors[0].msg
            } else if (err?.response?.data?.message) {
                message = err?.response?.data?.message
            }
            enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000
            })
        }
    }

    useEffect(() => {
        props.addLoader()
        axios.get(`${BASE_URL_1}/withdraw/transaction`, config)
            .then(res => {
                setTransactions(res?.data?.withdraw.map((transaction => {
                    return {
                        ...transaction,
                        date: new Date(transaction.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                        amount: formatAmount(transaction.amount)
                    }
                })));
                setUpdate(false);
                props.removeLoader()
            }).catch(err => {
                props.removeLoader()
                console.log(err);
                enqueueSnackbar("Something went wrong", {
                    autoHideDuration: 3000,
                    variant: "error"
                })
            })
    }, [update]);

    return (
        <>
            <Box mt={7}>
                <AddTransaction token={props.auth.token} setUpdate={setUpdate} />
                {transaction && <div style={{ margin: '10px 0px' }}><Button variant='contained' color='error' fullWidth onClick={handleDelete}>Delete</Button></div>}
                <Box style={{ maxHeight: "80vw", height: "400px" }} sx={{
                    '& .super-app-theme--hover': {
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }
                }}>
                    <DataGrid
                        rows={transactions}
                        columns={[
                            { field: "name", headerName: "Name", flex: 1 },
                            { field: "amount", headerName: "Amount", flex: 1 },
                            { field: "type", headerName: "Type", flex: 1 },
                            { field: "date", headerName: "Date", flex: 1 },
                        ]}
                        pageSize={25}
                        rowsPerPageOptions={[5]}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = transactions.filter((row) =>
                                selectedIDs.has(row.id.toString())
                            );
                            setTransaction(selectedRowData[0])
                        }}
                        getRowClassName={() => `super-app-theme--hover`}
                    />
                </Box>
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { addLoader, removeLoader })(WithdrawComponent);