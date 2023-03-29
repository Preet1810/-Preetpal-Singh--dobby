import { useState } from "react";
import {
    Box,
    TextField,
    useMediaQuery,
    Typography,
    Alert
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from '../../config'
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";

const registerSchema=yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup
        .string()
        .required("required")
        .min(8, "password must be at least 8 characters long")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "password must contain at least 1 special character"),
});

const loginSchema=yup.object().shape({
    username: yup.string().required("required"),
    password: yup
        .string()
        .required("required")
});

const initialValuesRegister={
    username: "",
    email: "",
    password: "",
};

const initialValuesLogin={
    username: "",
    password: "",
};

const Form=() => {
    const [pageType, setPageType]=useState("login");
    const dispatch=useDispatch();
    const isNonMobile=useMediaQuery("(min-width:600px)");
    const isLogin=pageType==="login";
    const isRegister=pageType==="register";
    const [isLoad, setLoad]=useState(false);
    const [error, setError]=useState("")

    const register=async (values, onSubmitProps) => {
        setLoad(true)
        try {
            await axios.post(`${config.API_BASE_URL}/auth/register`, values)
                .then((response) => {
                    console.log(response)
                    dispatch(
                        setLogin({
                            user: response.data.savedUser,
                            token: response.data.token
                        })
                    );
                    onSubmitProps.resetForm();
                    setLoad(false)
                })

        } catch (err) {
            setLoad(false)
            onSubmitProps.resetForm();
            setError(error.response.data.msg)
        }
        // console.log(error)
        setLoad(false)
        onSubmitProps.resetForm()
    };

    const login=async (values, onSubmitProps) => {
        setLoad(true)
        try {
            await axios.post(`${config.API_BASE_URL}/auth/login`, values)
                .then((response) => {
                    dispatch(
                        setLogin({
                            user: response.data.user,
                            token: response.data.token
                        })
                    );
                    onSubmitProps.resetForm();
                    setLoad(false)
                })
        } catch (err) {
            onSubmitProps.resetForm();
            setLoad(false)
            setError(err.response.data.msg)
        }

    };

    const handleFormSubmit=async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };


    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin? initialValuesLogin:initialValuesRegister}
            validationSchema={isLogin? loginSchema:registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile? undefined:"span 4" },
                        }}
                    >
                        {isRegister&&(
                            <>
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="email"
                                    error={
                                        Boolean(touched.email)&&Boolean(errors.email)
                                    }
                                    color="warning"
                                    helperText={touched.email&&errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                    InputLabelProps={{
                                        style: { color: "#898989" }
                                    }}
                                    InputProps={{
                                        style: { color: "white" }
                                    }}
                                />
                            </>
                        )}

                        <TextField
                            label="Username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={Boolean(touched.username)&&Boolean(errors.username)}
                            helperText={touched.username&&errors.username}
                            sx={{ gridColumn: "span 4", }}
                            color="warning"
                            InputLabelProps={{
                                style: { color: "#898989" }
                            }}
                            InputProps={{
                                style: { color: "white" }
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password)&&Boolean(errors.password)}
                            helperText={touched.password&&errors.password}
                            color="warning"
                            sx={{ gridColumn: "span 4" }}
                            InputLabelProps={{
                                style: { color: "#898989" }
                            }}
                            InputProps={{
                                style: { color: "white" }
                            }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <LoadingButton
                            fullWidth
                            type="submit"
                            loading={isLoad}
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: "#00d5fa",
                                color: "black",
                                "&:hover": {
                                    cursor: "pointer",
                                    color: "#376ca4",
                                },
                            }}
                        >
                            {isLogin? "LOGIN":"REGISTER"}
                        </LoadingButton>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin? "register":"login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: "#00d5fa",
                                "&:hover": {
                                    cursor: "pointer",
                                    color: "#376ca4",
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                :"Already have an account? Login here."}
                        </Typography>
                        {error? (<Alert severity="error" sx={{ marginTop: "1rem" }}>{error}</Alert>):null}

                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;