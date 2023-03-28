import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CircularProgress, CardContent, Typography, TextField } from '@mui/material';
import config from '../config'
import FlexBetween from './FlexBetween';
import { useSelector } from "react-redux";
const Images=() => {
    const [searchTerm, setSearchTerm]=useState('');
    const token=useSelector((state) => state.token);
    const [images, setImages]=useState([]);
    useEffect(() => {
        fetch(`${config.API_BASE_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setImages(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const filteredImages=images.filter((image) => {
        if (searchTerm==='') {
            return true;
        }
        return image.name.toLowerCase().includes(searchTerm.toLowerCase());
    });



    return (
        <div style={{ flexGrow: 1, marginLeft: 50, marginRight: 90 }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 20 }}
                color="warning"
                sx={{ marginTop: "1rem" }}
                InputLabelProps={{
                    style: { color: "#898989" }
                }}
                InputProps={{
                    style: { color: "white" }
                }}
            />
            {images.length? (
                <FlexBetween>
                    <Grid container spacing={3} style={{ margin: '20px 0' }}>
                        {filteredImages.map((image) => (
                            <Grid item xs={12} sm={6} md={4} key={image._id}>
                                <Card
                                    style={{
                                        height: '400px',
                                        position: 'relative',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            transition: 'opacity 0.2s',
                                        }}
                                        image={image.picturePath}
                                        title={image.name}
                                    />
                                    <CardContent
                                        style={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '0',
                                            width: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {image.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </FlexBetween>
            ):(
                <CircularProgress />
            )
            }
        </div>
    );
};

export default Images;