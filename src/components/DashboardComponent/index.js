import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";

const DashboardComponent = () => {
    const [fiscalYears, setFiscalYears] = React.useState([]);
    const [selectedFiscalYear, setSelectedFiscalYear] = React.useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/summary/").then((res) => {
            setFiscalYears(res.data.summary);
            setSelectedFiscalYear(res.data.summary.length - 1);
        });
    }, []);

    return (
        <div
            style={{
                marginTop: "4em",
            }}
        >
            <Grid container spacing={5}>
                <Grid item lg={3}>
                    <FormControl fullWidth variant={"standard"}>
                        <InputLabel id="demo-simple-select-label">
                            Fiscal Year
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedFiscalYear}
                            label="Fiscal Year"
                            onChange={(e) => {
                                setSelectedFiscalYear(e.target.value);
                            }}
                        >
                            {fiscalYears.map((year, index) => (
                                <MenuItem value={index}>
                                    {year.fin_year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={3}>
                    <Box style={{}}>
                        <Typography variant="h6">Fiscal Year</Typography>
                        <Typography variant="p">
                            {fiscalYears[selectedFiscalYear]?.fin_year}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3}>
                    <Box>
                        <Typography variant="h6">Investment Amount</Typography>
                        <Typography variant="p">
                            {fiscalYears[selectedFiscalYear]?.amount_invested}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3}>
                    <Box>
                        <Typography variant="h6">Received Amount</Typography>
                        <Typography variant="p">
                            {fiscalYears[selectedFiscalYear]?.amount_taken}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardComponent;
