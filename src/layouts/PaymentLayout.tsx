import Banner from "@/components/Shared/Banner/index";
import Footer from "@/components/Shared/Footer/index";
import Header from "@/components/Shared/Header/index";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
function PaymentLayout() {
    return (
        <Box>
            <Outlet />
        </Box>
    );
}

export default PaymentLayout;
