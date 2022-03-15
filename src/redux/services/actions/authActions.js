// importing required apis
import { authenticateUser } from "../apis/user/authenticate";
import { updateUser } from "../apis/user/update";
import { updateUserType as updateUserTypeAPI } from "../apis/user/userType"
import { getUserInfoAPI } from "../apis/user/info";
import { updateUserImageAPI } from "../apis/user/image";
import { updateWorkDetailsAPI } from "../apis/user/workDetails";
import {
    LOGIN_SUCCESS,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE
} from "./type";

export const login = (otp, enqueueSnackbar) => async (dispatch) => {
    dispatch({ type: SET_LOADING_TRUE });
    let confirmationResult = window.confirmationResult;
    confirmationResult
        .confirm(otp)
        .then(function (result) {
            // User signed in successfully.
            console.log(result);
            // call authenticate api
            authenticateUser(result.user.phoneNumber)
            .then((res) => {
                console.log(res.data);
                enqueueSnackbar(`User logged in with ${result.user.phoneNumber}`, {
                    variant: "success",
                    autoHideDuration: 3000,
                });
                const payload = {
                    user: res.data.data,
                    googleToken: result.user.stsTokenManager.accessToken,
                    serverToken: res.data.token,
                }
                dispatch({ type: LOGIN_SUCCESS, payload });
                dispatch({ type: SET_LOADING_FALSE });
            })
        })
        .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.log(error);
            enqueueSnackbar(`User couldn't login with ${error}`, {
                variant: "error",
                autoHideDuration: 3000,
            });
            dispatch({ type: SET_LOADING_FALSE });
        });
};

// update user profile with socket
export const updateProfile = ( values, token, setSubmitting, enqueueSnackbar) => async (dispatch) => {
    setSubmitting(true);
    updateUser(values, token)
    .then((res) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.user,
        })
        enqueueSnackbar(`User profile updated`, {
            variant: "success",
            autoHideDuration: 3000,
        });
        setSubmitting(false);
    })
    .catch((err) => {
        console.log(err);
        enqueueSnackbar(`User profile update failed`, {
            variant: "error",
            autoHideDuration: 3000,
        });
        setSubmitting(false);
    })
}

// update user type in profile
export const updateUserType = (values, token, setSubmitting, enqueueSnackbar) => async (dispatch) => {
    setSubmitting(true);
    updateUserTypeAPI(values, token)
    .then((res) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.user,
        })
        enqueueSnackbar(`User type updated`, {
            variant: "success",
            autoHideDuration: 3000,
        });
        setSubmitting(false);
    })
    .catch((err) => {
        console.log(err);
        enqueueSnackbar(`User type update failed`, {
            variant: "error",
            autoHideDuration: 3000,
        });
    })
}

// get user info
export const getUserInfo = (token, enqueueSnackbar) => async (dispatch) => {
    getUserInfoAPI(token)
    .then((res) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.user,
        })
        enqueueSnackbar(`User info fetched`, {
            variant: "success",
            autoHideDuration: 3000,
        });
    })
    .catch((err) => {
        const message = err.response.data.message;
        enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 3000,
        });
    })
}

// update user image
export const updateUserImage = (values, token, enqueueSnackbar) => async (dispatch) => {
    updateUserImageAPI(token, values)
    .then((res) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.user,
        })
        enqueueSnackbar(`User profile updated`, {
            variant: "success",
            autoHideDuration: 3000,
        });
    })
    .catch((err) => {
        console.log(err);
        enqueueSnackbar(`User profile update failed`, {
            variant: "error",
            autoHideDuration: 3000,
        });
    })
}

// update work details
export const updateWorkDetails = (values, token, enqueueSnackbar) => async (dispatch) => {
    updateWorkDetailsAPI(values, token)
    .then((res) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.user,
        })
        enqueueSnackbar(`User profile updated`, {
            variant: "success",
            autoHideDuration: 3000,
        });
    })
    .catch((err) => {
        console.log(err);
        enqueueSnackbar(`User work details were not updated`, {
            variant: "error",
            autoHideDuration: 3000,
        });
    })
}

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};
