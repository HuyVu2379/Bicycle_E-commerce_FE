import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "leaflet/dist/leaflet.css";
import "./index.css";
import useAuth from "@/hook/api/useAuth";
const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    marginTop: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const center = [10.7769, 106.7009]; // Tọa độ trung tâm TP.HCM

// Component để cập nhật trung tâm bản đồ
const MapUpdater = ({ center }: any) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
};
interface EditAddressModalProps {
    open: boolean;
    handleClose: () => void;
}
const EditAddressModal: React.FC<EditAddressModalProps> = ({ open, handleClose }) => {
    const [addressFields, setAddressFields] = useState({
        detail: "",
        ward: "",
        district: "",
        city: "",
    });
    const [mapVisible, setMapVisible] = useState(false); // Điều khiển hiển thị bản đồ
    const [searchQuery, setSearchQuery] = useState(""); // Thanh tìm kiếm trên bản đồ
    const [position, setPosition] = useState(center);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]); // Dữ liệu gợi ý địa chỉ
    const markerRef = useRef(null);

    // Reverse geocoding để lấy địa chỉ từ tọa độ
    const reverseGeocode = async (lat: any, lng: any) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const { address } = response.data;
            console.log("API Response:", response.data);
            setAddressFields({
                detail: response.data.display_name || "",
                ward: address?.residential || address?.quarter || "",
                district: address?.suburb || "",
                city: address?.city || address?.state || "",
            });
        } catch (error) {
            console.error("Error reverse geocoding:", error);
            alert("Không thể lấy địa chỉ từ vị trí này!");
        }
        setLoading(false);
    };

    // Gọi API tìm kiếm địa chỉ cụ thể
    const searchAddress = async () => {
        if (!searchQuery.trim()) {
            alert("Vui lòng nhập địa chỉ cụ thể!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery
                )}&limit=5`
            );
            const options = response.data.map((item: any) => ({
                value: [parseFloat(item.lat), parseFloat(item.lon)],
                label: item.display_name,
            }));
            setSuggestions(options);
        } catch (error) {
            console.error("Error searching address:", error);
            alert("Đã có lỗi khi tìm kiếm địa chỉ!");
        }
        setLoading(false);
    };

    // Xử lý khi chọn gợi ý từ react-select
    const handleSelect = (selectedOption: any) => {
        if (selectedOption) {
            setPosition(selectedOption.value);
            reverseGeocode(selectedOption.value[0], selectedOption.value[1]);
        }
    };

    // Xử lý khi kéo thả marker
    const handleMarkerDragEnd = (event: any) => {
        const marker = event.target;
        const newPosition = marker.getLatLng();
        setPosition([newPosition.lat, newPosition.lng]);
        reverseGeocode(newPosition.lat, newPosition.lng);
    };

    // Xử lý cập nhật các trường địa chỉ
    const handleFieldChange = (field: any, value: any) => {
        setAddressFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Sử dụng useMemo để tránh render lại MapContainer
    const mapContent = useMemo(
        () => (
            <MapContainer center={center} zoom={13} style={containerStyle}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapUpdater center={position} />
                <Marker
                    position={position}
                    draggable={true}
                    eventHandlers={{
                        dragend: handleMarkerDragEnd,
                    }}
                    ref={markerRef}
                >
                    <Popup>{"Kéo marker để chọn vị trí"}</Popup>
                </Marker>
            </MapContainer>
        ),
        [position]
    );

    const handleAddressSubmit = (event: any) => {
        event.preventDefault();
        console.log("Cập nhật địa chỉ:", addressFields, "Toạ độ:", position);
        handleClose();
    };

    //state
    const { me } = useAuth()
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
                        onClick={() => setMapVisible(!mapVisible)} // Hiển thị/ẩn bản đồ
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
                        <Box>
                            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                <TextField
                                    label="Tìm kiếm vị trí trên bản đồ"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                                    variant="contained"
                                    onClick={searchAddress} // Gọi API tìm kiếm địa chỉ trên bản đồ
                                    sx={{
                                        backgroundColor: "#3f51b5",
                                        ":hover": { backgroundColor: "#303f9f" },
                                        fontWeight: "bold",
                                        textTransform: "none",
                                    }}
                                >
                                    {loading ? <CircularProgress size={23} color="inherit" /> : "Tìm kiếm"}
                                </Button>
                            </Box>
                            <Select
                                options={suggestions}
                                onChange={handleSelect}
                                placeholder="Chọn địa chỉ từ gợi ý..."
                                isLoading={loading}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderRadius: "4px",
                                        borderColor: "#c4c4c4",
                                        "&:hover": { borderColor: "#3f51b5" },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                    }),
                                }}
                            />
                            {mapContent}
                        </Box>
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