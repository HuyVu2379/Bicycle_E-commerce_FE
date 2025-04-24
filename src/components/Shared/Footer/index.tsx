import { Box, Container, Grid, Typography, Link, IconButton, Stack, useTheme } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"

// Logo component
const Logo = () => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box component="img" src="/assets/images/logo.png" alt="CycleCity Logo" sx={{ height: 30, mr: 1 }} />
    </Box>
)

// Payment method icons
const PaymentMethods = () => (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Box component="img" src="/assets/images/logo_VISA.png" alt="Visa" sx={{ height: 30 }} />
        <Box component="img" src="/assets/images/logo_MOMO.png" alt="MoMo" sx={{ height: 30 }} />
        <Box component="img" src="/assets/images/logo_ZALOPAY.png" alt="ZaloPay" sx={{ height: 30 }} />
        <Box component="img" src="/assets/images/logo_COD.png" alt="COD" sx={{ height: 30 }} />
    </Stack>
)

// Map component
const MapEmbed = () => (
    <Box
        component="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4427!2d106.6842705!3d10.8221589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zMTDCsNDknMTkuOCJOIDEwNsKwNDEnMDQuNiJF!5e0!3m2!1sen!2s!4v1635835853801!5m2!1sen!2s"
        sx={{
            border: 0,
            width: "100%",
            height: 120,
            borderRadius: 1,
        }}
        allowFullScreen
        loading="lazy"
        title="Google Maps"
    />
)

// Footer component
const Footer = () => {
    const theme = useTheme()

    return (
        <Box sx={{
            bgcolor: "#161616",
            color: "black",
            py: 3,
            px: 4,
        }}>
            <Box
                sx={{
                    bgcolor: "#7b7b7b",
                    color: "white",
                    py: 2,
                    mt: "auto",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Logo and company description */}
                        <Grid item xs={12} md={3}>
                            <Logo />
                            <Typography variant="body2" sx={{ mb: 2, color: '#161616' }}>
                                Bán các sản phẩm cao cấp được thiết kế để nâng cao trải nghiệm hàng ngày của bạn
                            </Typography>

                            {/* Social media icons */}
                            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                <IconButton
                                    aria-label="Facebook"
                                    sx={{
                                        bgcolor: "white",
                                        "&:hover": { bgcolor: "grey.300" },
                                        width: 28,
                                        height: 28,
                                    }}
                                >
                                    <FacebookIcon sx={{ color: "grey.800" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="Twitter"
                                    sx={{
                                        bgcolor: "white",
                                        "&:hover": { bgcolor: "grey.300" },
                                        width: 28,
                                        height: 28,
                                    }}
                                >
                                    <TwitterIcon sx={{ color: "grey.800" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="Instagram"
                                    sx={{
                                        bgcolor: "white",
                                        "&:hover": { bgcolor: "grey.300" },
                                        width: 28,
                                        height: 28,
                                    }}
                                >
                                    <InstagramIcon sx={{ color: "grey.800" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="YouTube"
                                    sx={{
                                        bgcolor: "white",
                                        "&:hover": { bgcolor: "grey.300" },
                                        width: 28,
                                        height: 28,
                                    }}
                                >
                                    <YouTubeIcon sx={{ color: "grey.800" }} />
                                </IconButton>
                            </Stack>

                            <PaymentMethods />
                        </Grid>

                        {/* Categories */}
                        <Grid item xs={12} sm={6} md={3} sx={{ color: '#161616' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                                Thể loại
                            </Typography >
                            <Stack spacing={1} sx={{ color: '#161616' }}>
                                <Link href="#" color="inherit" underline="hover">
                                    Xe đạp
                                </Link>
                                <Link href="#" color="inherit" underline="hover">
                                    Quần áo
                                </Link>
                                <Link href="#" color="inherit" underline="hover">
                                    Phụ kiện
                                </Link>
                            </Stack>
                        </Grid>

                        {/* Policies */}
                        <Grid item xs={12} sm={6} md={3} sx={{ color: '#161616' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                                Chính sách
                            </Typography>
                            <Stack spacing={1}>
                                <Link href="#" color="inherit" underline="hover">
                                    Khuyến mãi
                                </Link>
                                <Link href="#" color="inherit" underline="hover">
                                    Bảo hành
                                </Link>
                                <Link href="#" color="inherit" underline="hover">
                                    Quyền lợi
                                </Link>
                            </Stack>
                        </Grid>

                        {/* Map */}
                        <Grid item xs={12} md={3}>
                            <MapEmbed />
                        </Grid>
                    </Grid>

                    {/* Copyright */}
                    <Typography variant="body2" sx={{ mb: 1, fontSize: 13, color: '#161616' }}>
                        © {new Date().getFullYear()} CycleCity. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default Footer

