import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AddressMap from "../AddressMap";
import "./index.css";

const center = [10.7769, 106.7009]; // Tọa độ trung tâm TP.HCM

const EditAddressModal = ({ open, handleClose }: any) => {
    const [addressFields, setAddressFields] = useState({
        detail: "",
        ward: "",
        district: "",
        city: "",
    });
    const [mapVisible, setMapVisible] = useState(false);

    // Cập nhật các trường địa chỉ từ AddressMap
    const handleAddressChange = (addressData: any) => {
        if (addressData) {
            setAddressFields(addressData);
        }
    };

    // Xử lý cập nhật các trường địa chỉ
    const handleFieldChange = (field: string, value: string) => {
        setAddressFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressSubmit = (event: any) => {
        event.preventDefault();
        console.log("Cập nhật địa chỉ:", addressFields);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", md: 800 },
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
                >
                    Sửa địa chỉ
                </Typography>
                <Box component="form" onSubmit={handleAddressSubmit}>
                    <TextField
                        label="Địa chỉ chi tiết"
                        value={addressFields.detail}
                        onChange={(e) => handleFieldChange("detail", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Phường/Xã"
                        value={addressFields.ward}
                        onChange={(e) => handleFieldChange("ward", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Quận/Huyện"
                        value={addressFields.district}
                        onChange={(e) => handleFieldChange("district", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Tỉnh/Thành phố"
                        value={addressFields.city}
                        onChange={(e) => handleFieldChange("city", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setMapVisible(!mapVisible)}
                        fullWidth
                        sx={{
                            mb: 2,
                            textTransform: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        {mapVisible ? "Ẩn bản đồ" : "Mở bản đồ để chọn địa chỉ"}
                    </Button>
                    {mapVisible && (
                        <AddressMap
                            initialPosition={center}
                            onAddressChange={handleAddressChange}
                        />
                    )}
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                backgroundColor: "#3f51b5",
                                ":hover": { backgroundColor: "#303f9f" },
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditAddressModal;