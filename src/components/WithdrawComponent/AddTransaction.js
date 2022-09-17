import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Button, Grid, TextField } from "@mui/material";

const AddTransaction = (props) => {
    const Schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        amount: Yup.number().required("Amount is required").min(1, "Price should be positive"),
        type: Yup.bool().required("Transaction type is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            amount: ""
        },
        validationSchema: Schema,
        // on submit callback function
        onSubmit: (values, actions) => {
            console.log(values);
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={6}>
                    <Button variant="contained" color="success" fullWidth onClick={(e) => {
                        formik.setFieldValue('type', true);
                        handleSubmit(e)
                    }}>+</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="error" fullWidth onClick={(e) => {
                        formik.setFieldValue('type', false);
                        handleSubmit(e)
                    }}>-</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddTransaction;