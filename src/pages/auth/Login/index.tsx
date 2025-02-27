import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleIcon from "@mui/icons-material/Google";

const LoginTemplate = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f3f8f3"
        >
            <Box
                height={600}
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

                {/* Email Input */}
                <Typography align="left" fontWeight="bold" marginTop={5}>
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
                        height: "50px", // Chiều cao tổng thể
                        "& .MuiOutlinedInput-root": {
                            height: "50px", // Điều chỉnh chiều cao của phần nhập
                        },
                        "&::-ms-reveal, &::-ms-clear": {
                            display: "none",
                        },
                    }}
                />

                {/* Login Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 2, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
                >
                    Login
                </Button>

                {/* Register Link */}
                <Typography mt={2}>
                    Don't have an account?{" "}
                    <Link to="/auth/register" style={{ color: "red", fontWeight: "bold" }}>
                        Register
                    </Link>
                </Typography>

                {/* Google Login Button */}
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
                    startIcon={<GoogleIcon />}
                >
                    <span style={{fontSize: 16, color: 'black'}}>Login with Google</span>
                </Button>
            </Box>
        </Box>
    );
};

export default LoginTemplate;
