import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
function AuthLayout() {
    return (
        <Box>
            <Header />
            <Banner PageName="Login" PlaceHolder="Login" />
            <Outlet />
            <Footer />
        </Box>
    );
}

export default AuthLayout;
