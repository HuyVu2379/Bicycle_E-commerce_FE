import {
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import { Dashboard, Settings, Inventory, Receipt, LocalShipping, Discount } from "@mui/icons-material";

function LeftSideBar() {
    const settingsMenuItem = { text: "Settings", icon: <Settings /> };
    const drawerWidth = 240;
    const appBarHeight = 64;

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: (theme) => theme.zIndex.appBar - 1,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    top: `${appBarHeight}px`,
                    height: `calc(100vh - ${appBarHeight}px)`,
                    left: 0,
                    borderTop: "none",
                    borderRight: "1px solid rgba(0,0,0,0.1)",
                    borderLeft: "none",
                    borderBottom: "none",
                },
            }}
        >
            {/* Logo Section */}
            <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
                <img src="/public/assets/images/logo.jpg" alt="logo" className="logo-img" />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
                    <span>Cycle</span>
                    <span style={{ color: "red" }}>City</span>
                </Typography>
            </Box>

            <List>
                <ListItem
                    key="Dashboard"
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                    }}
                >
                    <ListItemIcon><Dashboard /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem
                    key="Product"
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                    }}
                >
                    <ListItemIcon><Inventory /></ListItemIcon>
                    <ListItemText primary="Product" />
                </ListItem>
                <ListItem
                    key="Order"
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                    }}
                >
                    <ListItemIcon><Receipt /></ListItemIcon>
                    <ListItemText primary="Order" />
                </ListItem>
                <ListItem
                    key="Supplier"
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                    }}
                >
                    <ListItemIcon><LocalShipping /></ListItemIcon>
                    <ListItemText primary="Supplier" />
                </ListItem>
                <ListItem
                    key="Promotion"
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                    }}
                >
                    <ListItemIcon><Discount /></ListItemIcon>
                    <ListItemText primary="Promotion" />
                </ListItem>
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItem
                    key={settingsMenuItem.text}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                    }}
                >
                    <ListItemIcon>{settingsMenuItem.icon}</ListItemIcon>
                    <ListItemText primary={settingsMenuItem.text} />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default LeftSideBar;