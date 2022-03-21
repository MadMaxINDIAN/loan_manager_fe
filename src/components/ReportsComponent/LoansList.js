import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { darken, lighten } from '@mui/material/styles';

const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const columns = [
    { field: "id", headerName: "Sr. No.", width: 60, align: "center" },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
    },
    {
        field: "opening_date",
        headerName: "Opening Date",
        type: "date",
        flex: 1,
    },
    {
        field: "loan_amount",
        headerName: "Loan Amount",
        flex: 1,
    },
    {
        field: "amount_to_be_paid",
        headerName: "Amount to be Paid",
        flex: 1,
    },
    {
        field: "daily_payment",
        headerName: "Daily Payment",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
    },
];

export default function LoansList(props) {
    const [pageSize, setPageSize] = React.useState(50);
    let dollarIndianLocale = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });
    const rows = props.loans.map((loan, index) => ({
        id: loan.sr_no,
        name: loan.borrower_id.name,
        address: loan.borrower_id.address,
        opening_date: loan.opening_date
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/"),
        loan_amount: dollarIndianLocale.format(loan.loan_amount),
        amount_to_be_paid: dollarIndianLocale.format(loan.amount_to_be_paid),
        daily_payment: dollarIndianLocale.format(loan.daily_payment),
        status: loan.status,
    }));
    return (
        <div style={{ height: "400px", width: "100%", marginTop: "60px" }}>
            <Typography variant="h6" gutterBottom>
                Loans List
            </Typography>
            <Box
                sx={{
                    height: 400,
                    width: 1,
                    "& .super-app-theme--actisve": {
                        bgcolor: (theme) =>
                            getBackgroundColor(
                                theme.palette.info.main,
                                theme.palette.mode
                            ),
                        "&:hover": {
                            bgcolor: (theme) =>
                                getHoverBackgroundColor(
                                    theme.palette.info.main,
                                    theme.palette.mode
                                ),
                        },
                    },
                    "& .super-app-theme--closed": {
                        bgcolor: (theme) =>
                            getBackgroundColor(
                                theme.palette.success.main,
                                theme.palette.mode
                            ),
                        "&:hover": {
                            bgcolor: (theme) =>
                                getHoverBackgroundColor(
                                    theme.palette.success.main,
                                    theme.palette.mode
                                ),
                        },
                    },
                    "& .super-app-theme--active": {
                        bgcolor: (theme) =>
                            getBackgroundColor(
                                theme.palette.warning.main,
                                theme.palette.mode
                            ),
                        "&:hover": {
                            bgcolor: (theme) =>
                                getHoverBackgroundColor(
                                    theme.palette.warning.main,
                                    theme.palette.mode
                                ),
                        },
                    },
                    "& .super-app-theme--cosed": {
                        bgcolor: (theme) =>
                            getBackgroundColor(
                                theme.palette.error.main,
                                theme.palette.mode
                            ),
                        "&:hover": {
                            bgcolor: (theme) =>
                                getHoverBackgroundColor(
                                    theme.palette.error.main,
                                    theme.palette.mode
                                ),
                        },
                    },
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
                    getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                />
            </Box>
        </div>
    );
}