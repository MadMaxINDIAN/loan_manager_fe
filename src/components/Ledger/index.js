import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addLoader, removeLoader } from '../../redux/services/actions/loaderActions'
import { BASE_URL_1 } from '../../constants/urls'
import { useSnackbar } from 'notistack';
import formatAmount from '../../utils/formatAmount'
import { Box } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}

const columns = [
    {
        field: "date",
        headerName: "Date",
    },
    {
        field: "opening_balance",
        headerName: "Opening Balance",
        width: 150,
        align: "right",
        valueFormatter: ({ value }) => value.split("₹")[1],
        renderCell: ({ value }) => value,
    },
    {
        field: "investment",
        headerName: "Investment",
        width: 150,
        align: "right",
        valueFormatter: ({ value }) => value.split("₹")[1],
        renderCell: ({ value }) => value,
    },
    {
        field: "recieved",
        headerName: "Recieved Amount",
        width: 150,
        align: "right",
        valueFormatter: ({ value }) => value.split("₹")[1],
        renderCell: ({ value }) => value,
    },
    {
        field: "loanAmount",
        headerName: "Loan Given",
        width: 150,
        align: "right",
        valueFormatter: ({ value }) => value.split("₹")[1],
        renderCell: ({ value }) => value,
    },
    {
        field: "withdraw",
        headerName: "Withdrawal",
        width: 150,
        align: "right",
        valueFormatter: ({ value }) => value.split("₹")[1],
        renderCell: ({ value }) => value,
    },
    {
        field: "closing_balance",
        headerName: "Closing Balance",
        width: 150,
        align: "right",
        valueFormatter: ({ value }) => value.split("₹")[1],
        renderCell: ({ value }) => value,
    },
];

const index = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [ledger, setLedger] = useState()
    const [pageSize, setPageSize] = React.useState(100);

    const config = {
        headers: {
            Authorization: `Bearer ${props.auth.token}`,
        },
    };
    const rows = ledger?.map((val, index) => ({
        id: val?.id,
        date: new Date(val?.id)?.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        opening_balance: formatAmount(val?.opening_balance),
        investment: formatAmount(val?.investment),
        recieved: formatAmount(val?.recieved),
        loanAmount: formatAmount(val?.loanAmount),
        withdraw: formatAmount(val?.withdraw),
        closing_balance: formatAmount(val?.closing_balance),
    }));

    const fetchLedger = async () => {
        props.addLoader()
        try {
            const res = await axios.get(`${BASE_URL_1}/ledger/2`, config)
            setLedger(res.data.ledger)
            props.removeLoader()
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
        fetchLedger()
    }, [])
    return (
        <Box
            sx={{
                height: 500,
                minWidth: "900px",
                marginTop: '55px'
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                disableSelectionOnClick
                disableColumnFilter
                pageSize={pageSize}
                rowsPerPageOptions={[10, 20, 50, 100, 1000]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                columnVisibilityModel={{ id: false }}
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Box>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLoader, removeLoader })(index)
