import React from 'react'
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from './Form'

const LoginPage=() => {
    const isNonMobileScreens=useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor="black"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Dobby Ads
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens? "50%":"93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor="#353535"
            >
                <Typography fontWeight="500" variant="h5" sx={{
                    mb: "1.5rem", color: "white", display: "flex",
                    justifyContent: "center",
                }}>
                    Welcome to Dobby Ads, to keep track of your images.
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage