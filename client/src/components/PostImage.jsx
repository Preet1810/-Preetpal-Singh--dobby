import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Typography, TextField, Box, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from "yup";
import config from '../config';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//validation
const postSchema=yup.object().shape({
    name: yup.string().required("required"),
    picture: yup
        .mixed()
        .required("required")
        .test("fileSize", "File size is too large", (value) => {
            return value.size<=config.MAX_FILE_SIZE;
        })
        .test("fileType", "Unsupported File Format", (value) => {
            return (
                ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            );
        }),
});

const initialValues={
    name: "",
    picture: "",
};

const PostImage=() => {
    const token=useSelector((state) => state.token);
    const [image, setImage]=useState('https://res.cloudinary.com/dwh4llt0c/image/upload/v1680046745/Dolbie%20Test/pre_bz7ksw.png');
    const [Load, setLoad]=useState(false)
    const navigate=useNavigate();
    const handleUpload=(event) => {
        const file=event.target.files[0];
        const reader=new FileReader();
        reader.onload=(e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    const handleFormSubmit=(values) => {
        setLoad(true);
        const formData=new FormData();
        formData.append("name", values.name);
        formData.append("picture", values.picture);
        axios.post(`${config.API_BASE_URL}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`,
            },
        }).then((res) => {
            setLoad(false)
            navigate("/");
        }).catch((err) => {
            setLoad(false)
            console.log(err);
        });
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={postSchema}
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
                        <Card sx={{ maxWidth: 600, backgroundColor: '#333333' }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="240"
                                width="345"
                                image={image}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                                    Add Image
                                </Typography>
                                <TextField
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={
                                        Boolean(touched.name)&&Boolean(errors.name)
                                    }
                                    helperText={touched.name&&errors.name}
                                    label="Name"
                                    sx={{ gridColumn: "span 4" }}
                                    InputLabelProps={{
                                        style: { color: "#898989" }
                                    }}
                                    InputProps={{
                                        style: { color: "white" }
                                    }}
                                />
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <label htmlFor="file-input">
                                    <input
                                        id="file-input"
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(event) => {
                                            setFieldValue("picture", event.currentTarget.files[0]);
                                            handleUpload(event);
                                        }}
                                    />
                                    <Button variant="contained" component="span" style={{ color: 'white', borderColor: '#333333', backgroundColor: 'transparent', '&:hover': { backgroundColor: '#333333' } }}>
                                        Add Image
                                    </Button>
                                </label>
                                <LoadingButton
                                    type="submit"
                                    loading={Load}
                                    onClick={() => {
                                        handleFormSubmit(values);
                                        resetForm();
                                    }}
                                    variant="contained"
                                    component="span"
                                    color="secondary" // set the color prop to 'secondary' or a custom color
                                    style={{ backgroundColor: '#333333', color: 'white', '&:hover': { backgroundColor: '#222222' } }}
                                >
                                    Submit
                                </LoadingButton>
                            </CardActions>
                        </Card>
                    </Box>
                </form>
            )
            }
        </Formik>
    )
}

export default PostImage;