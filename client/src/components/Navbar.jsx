import { useState } from "react";

import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import {
    Search,
    Menu,
    Close,
} from "@mui/icons-material";

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Navbar=() => {
    const [isMobileMenuToggled, setIsMobileMenuToggled]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state) => state.user);
    const isNonMobileScreens=useMediaQuery("(min-width: 1000px)");
    return (
        <FlexBetween padding="1rem 6%" backgroundColor="#1a1a1a">
            <FlexBetween gap="1.75rem" position="sticky" top="0">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="#00d5fa"
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            color: "#1753af",
                            cursor: "pointer",
                        },
                    }}
                >
                    ImagesApp
                </Typography>

            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens? (
                <FlexBetween gap="2rem">
                    <Link to='/create' style={{ textDecoration: 'none' }}>
                        <Box sx={{ borderRadius: 2, overflow: 'hidden', backgroundColor: '#333333' }}>
                            <Typography sx={{ color: 'white', padding: 1.3 }}>
                                Create Image
                            </Typography>
                        </Box>
                    </Link>
                    <FormControl variant="standard" value={user.username}>
                        <Select
                            value={user.username}
                            sx={{
                                color: "white",
                                backgroundColor: "#333333",
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: "#333333",
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={user.username}>
                                <Typography>{user.username}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ):(
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu style={{ color: "white" }} />
                </IconButton>
            )
            }

            {/* MOBILE NAV */}
            {
                !isNonMobileScreens&&isMobileMenuToggled&&(
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor="#0a0a0a"
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} >
                                <Close style={{ color: "white" }} />
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="3rem"
                        >


                            <FormControl variant="standard" value={user.username}>
                                <Select
                                    value={user.username}
                                    sx={{
                                        color: "white",
                                        backgroundColor: "#333333",
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3rem",
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: "#333333",
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={user.username}>
                                        <Typography>{user.username}</Typography>
                                    </MenuItem>
                                    <MenuItem component={Link} to="/create" >
                                        Create Image
                                    </MenuItem>
                                    {/* onClick={() => dispatch(setLogout())} */}
                                    <MenuItem onClick={() => dispatch(setLogout())} >
                                        Log Out
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                )
            }
        </FlexBetween>
    );
};

export default Navbar;