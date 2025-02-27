import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleIcon from "@mui/icons-material/Google";

const RegisterTemplate = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="auto"
            bgcolor="#f3f8f3"
            padding={10}
        >
            <Box
                height={800}
                width={600}
                bgcolor="white"
                p={4}
                borderRadius={2}
                boxShadow={3}
                textAlign="center"
                padding={10}
            >
                {/* Logo */}
                <Typography variant="h3" fontWeight="bold" mb={2}>
                    <span style={{ color: "black" }}>Cycle</span>
                    <span style={{ color: "red" }}>City</span>
                </Typography>

                {/* Name Input */}
                <Typography align="left" fontWeight="bold" marginTop={5}>
                    Name
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Your Name"
                    margin="dense"
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                    }}
                />

                {/* Email Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Email
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Your Email"
                    margin="dense"
                    sx={{
                        height: "50px", // Chiều cao tổng thể
                        "& .MuiOutlinedInput-root": {
                            height: "50px", // Điều chỉnh chiều cao của phần nhập
                        },
                    }}
                />

                {/* Password Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Enter Password
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    margin="dense"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                        "&::-ms-reveal, &::-ms-clear": {
                            display: "none",
                        },
                    }}
                />

                {/*Comfirm Password Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Enter Password Again
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    margin="dense"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                        "&::-ms-reveal, &::-ms-clear": {
                            display: "none",
                        },
                    }}
                />

                {/* Register Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 4, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
                >
                    Register
                </Button>

                {/* Login Link */}
                <Typography mt={2}>
                    Already have an account?{" "}
                    <Link to="/auth/login" style={{ color: "red", fontWeight: "bold" }}>
                       Login
                    </Link>
                </Typography>

                {/* GG sign in */}
                <Typography mt={2}>
                    Or sign in with {" "}
                    <Link to="/" style={{fontWeight: "bold"}}>
                        Google
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterTemplate;
