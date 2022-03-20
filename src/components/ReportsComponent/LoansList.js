import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

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
    headerName: "Amount to be paid",
    flex: 1,
  },
  {
    field: "daily_payment",
    headerName: "Daily Payment",
    flex: 1,
  },
];

export default function LoansList(props) {
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const rows = props.loans.map((loan, index) => ({
    id: loan.sr_no,
    name: loan.borrower_id.name,
    address: loan.borrower_id.address,
    opening_date: loan.opening_date.slice(0, 10).split("-").reverse().join("/"),
    loan_amount: dollarIndianLocale.format(loan.loan_amount),
    amount_to_be_paid: dollarIndianLocale.format(loan.amount_to_be_paid),
    daily_payment: dollarIndianLocale.format(loan.daily_payment),
  }));
  return (
    <div style={{ height: 400, width: "100%", marginTop: "50px" }}>
      <Typography variant="h6" gutterBottom>
        Loans List
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
      />
    </div>
  );
}
