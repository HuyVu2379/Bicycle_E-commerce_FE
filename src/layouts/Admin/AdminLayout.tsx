import {
    Box
} from "@mui/material";
import Header from "@/components/Admin/Header";
import RightSideBar from "@/components/Admin/LeftSideBar";
function AdminLayout() {


    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <RightSideBar />
        </Box>
    );
}

export default AdminLayout;
