import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import useAuth from "@/hook/api/useAuth";
import EditAddressModal from "@/components/Shared/EditAddress";
const UserProfile = () => {
    const { me } = useAuth();
    console.log("check user login: ", me);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log("check me: ", me);

    return (
        <Box
            alignItems={"center"}
            sx={{
                p: 2,
                backgroundColor: "white",
                borderRadius: 2
            }}
        >
            <Box>
                <Avatar
                    src="/profile.jpg"
                    sx={{ width: 120, height: 120, margin: "auto", mb: 1 }}
                />
                <Button size="small" color="primary">
                    Sửa ảnh
                </Button>
            </Box>
            <Box
                component="form"
                sx={{ mt: 2, backgroundColor: "#d6d6d2", p: 2, borderRadius: 2 }}
            >
                <TextField
                    fullWidth
                    id="hoTen"
                    label="Họ tên"
                    variant="outlined"
                    margin="normal"
                    value={me?.fullName}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="gioiTinh"
                    label="Giới tính"
                    variant="outlined"
                    margin="normal"
                    value={me?.gender === 'MALE' ? "Nam" : "Nữ"}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="ngaySinh"
                    label="Ngày sinh"
                    variant="outlined"
                    margin="normal"
                    value={me.dob}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={me.email}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="soDienThoai"
                    label="Số điện thoại"
                    variant="outlined"
                    margin="normal"
                    value={me.phoneNumber}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        fullWidth
                        id="diaChi"
                        label="Địa chỉ"
                        variant="outlined"
                        margin="normal"
                        value={`${me.address.street}, ${me.address.ward}, ${me.address.district}, ${me.address.city}, ${me.address.country}`}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "26px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleOpen}
                        sx={{ mt: 1, height: '56px' }}
                    >
                        Sửa
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" startIcon={<EditIcon />}>
                    Chỉnh sửa thông tin
                </Button>
            </Box>
            <EditAddressModal handleClose={handleClose} open={open} />
        </Box>
    );
};

export default UserProfile;