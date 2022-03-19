import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";

const DashboardComponent = () => {
    const [loans, setLoans] = React.useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/borrower/total_loan_accounts").then(res => {
            setLoans(res.data.loans);
        })
    })

    return (
        <div style={{
            marginTop: "4em"
        }}>
            <Grid container>
                <Grid item xs={3}>
                    <Box style={{
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                    }} >
                        <TextField
                            id="outlined-basic"
                            label="Loan Accounts"
                            variant="outlined"
                            fullWidth
                            value={loans}
                            disabled
                            ></TextField>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardComponent;