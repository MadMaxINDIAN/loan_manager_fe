import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { post } from "../../utils/apiHelper";
import { BASE_URL_1 } from "../../constants/urls";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";

const AddTransaction = (props) => {
    const Schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        amount: Yup.number().required("Amount is required").min(1, "Price should be positive"),
        type: Yup.string().required("Transaction type is required")
    });
    const [date, setDate] = useState(new Date());

    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            name: "",
            amount: ""
        },
        validationSchema: Schema,
        // on submit callback function
        onSubmit: (values, actions) => {
            post(`${BASE_URL_1}/withdraw/transaction`, `Beraer ${props.token}`, { ...values, date }).then((res) => {
                props.setUpdate(true);
                actions.resetForm();
                actions.setSubmitting(false);
            }).catch((err) => {
                enqueueSnackbar(err.message || err.response.data.message || "Something wnet wrong", {
                    autoHideDuration: 3000,
                    variant: "error"
                })
            })
        },
    });

    const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        getFieldProps,
        setSubmitting,
    } = formik;

    return (
        <div style={{ width: "100%", marginBottom: "2em" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        name="name"
                        label="Name"
                        placeholder="name"
                        id="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        name="amount"
                        label="Amount"
                        placeholder="amount"
                        id="amount"
                        type="number"
                        fullWidth
                        variant="outlined"
                        {...getFieldProps("amount")}
                        error={Boolean(touched.amount && errors.amount)}
                        helperText={touched.amount && errors.amount}
                    />
                </Grid>
                <Grid item xs={12} md={4} my={1}>
                    <DatePicker
                        selected={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setDate(date)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="success" fullWidth onClick={(e) => {
                        formik.setFieldValue('type', "Add").then(() => {
                            handleSubmit(e)
                        })
                    }}>Deposit</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="error" fullWidth onClick={(e) => {
                        formik.setFieldValue('type', "Withdraw").then(() => {
                            handleSubmit(e)
                        })
                    }}>Withdraw</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="error" fullWidth onClick={(e) => {
                        formik.setFieldValue('type', "Expense").then(() => {
                            handleSubmit(e)
                        })
                    }}>Expense</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddTransaction;