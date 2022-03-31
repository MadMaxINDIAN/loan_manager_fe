import * as React from "react";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import { Typography, Box, Button, TextField } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const today = new Date();
today.setHours(5, 30, 0, 0);

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function LoansList(props) {
    const [pageSize, setPageSize] = React.useState(50);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const columns = [
        {
            field: "_id",
        },
        { field: "id", headerName: "Sr. No.", width: 60, align: "center" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "opening_date",
            headerName: "Opening Date",
            type: "date",
            width: 120,
        },
        {
            field: "loan_amount",
            headerName: "Loan Amount",
            width: 100,
            valueFormatter: ({ value }) => value.split("₹")[1],
            renderCell: ({ value }) => value,
        },
        {
            field: "amount_to_be_paid",
            headerName: "Amount Remaining",
            width: 100,
            valueFormatter: ({ value }) => value.split("₹")[1],
            renderCell: ({ value }) => value,
        },
        {
            field: "daily_payment",
            headerName: "Daily Payment",
            width: 80,
            valueFormatter: ({ value }) => value.split("₹")[1],
            renderCell: ({ value }) => value,
        },
        {
            field: "days_remaining",
            headerName: "Days Remaining",
            width: 80,
        },
        {
            field: "amount",
            align: "center",
            headerName: "Amount",
            width: 150,
            editable: true,
        },
        {
            field: "button",
            align: "center",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                if (params.row.amount) console.log(params.row);
                return (
                    <strong>
                        <Button color="success" variant="contained" size="small" >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => {
                                handleSubmit(params.row._id, params.row.amount);
                            }}
                        >
                            Add entry
                        </Button>
                    </strong>
                );
            },
        },
    ];

    const handleSubmit = async (id, amount) => {
        console.log(id, amount);
        props.addLoader();
        const data = {
            date: props.date,
            amount: amount,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${props.auth.token}`,
            },
        };
        try {
            const res = await axios.post(
                `http://localhost:5000/transaction/${id}/add`,
                data,
                config
            );
            // setBorrower(res.data);
            props.removeLoader();
            enqueueSnackbar(res?.data?.message, {
                variant: "success",
                autoHideDuration: 3000,
            });
        } catch (err) {
            console.log(err);
            props.removeLoader();
            enqueueSnackbar(
                err?.response?.data?.message || "Could not submit entry",
                {
                    variant: "error",
                    autoHideDuration: 3000,
                }
            );
        }
    };

    let dollarIndianLocale = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });
    const rows = props.loans.map((loan, index) => ({
        _id: loan._id,
        id: loan.sr_no,
        name: loan.borrower_id.name,
        opening_date: loan.opening_date
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/"),
        loan_amount: dollarIndianLocale.format(loan.loan_amount),
        amount_to_be_paid: dollarIndianLocale.format(loan.amount_to_be_paid),
        daily_payment: dollarIndianLocale.format(loan.daily_payment),
        days_remaining:
            loan.status === "active"
                ? Math.floor(
                      (new Date(loan.opening_date)
                          .addDays(loan.loan_period)
                          .getTime() -
                          today.getTime()) /
                          (1000 * 3600 * 24)
                  )
                : "-",
        status: loan.status,
    }));
    return (
        <div
            style={{
                height: "400px",
                width: "100%",
                marginTop: "20px",
            }}
        >
            <Box
                sx={{
                    height: 400,
                    minWidth: "900px",
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    disableSelectionOnClick
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowClassName={(params) =>
                        `super-app-theme--${params.row.status.replace(" ", "")}`
                    }
                    columnVisibilityModel={{ _id: false }}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </Box>
        </div>
    );
}

export default connect((state) => {
    return {
        auth: state.auth,
    };
}, null)(LoansList);
