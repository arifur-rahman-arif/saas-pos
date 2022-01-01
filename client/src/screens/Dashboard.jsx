import React from "react";
import { useState } from "react";

import { Box, Grid, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import Page from "../components/Page";
import AppWeeklySales from "../components/dashboard/AppWeeklySales";
import AppNewUsers from "../components/dashboard/AppNewUsers";
import AppItemOrders from "../components/dashboard/AppItemOrders";
import AppBugReports from "../components/dashboard/AppBugReports";
import AppWebsiteVisits from "../components/dashboard/AppWebsiteVisits";
import AppCurrentVisits from "../components/dashboard/AppCurrentVisits";
import AppConversionRates from "../components/dashboard/AppConversionRates";
import AppCurrentSubject from "../components/dashboard/AppCurrentSubject";
import AppOrderTimeline from "../components/dashboard/AppOrderTimeline";
import AppTrafficBySite from "../components/dashboard/AppTrafficBySite";
import DashboardNavbar from "../components/navigation/topbar/DashboardNavbar";
import DashboardSidebar from "../components/navigation/sidebar/DashboardSidebar";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

const Dashboard = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <RootStyle>
                <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
                <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
                <MainStyle>
                    <Page title="Dashboard">
                        <Container maxWidth="xl">
                            <Box sx={{ pb: 5 }}>
                                <Typography variant="h4">Hi, Welcome back</Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWeeklySales />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <AppNewUsers />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <AppItemOrders />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <AppBugReports />
                                </Grid>
                                <Grid item xs={12} md={6} lg={8}>
                                    <AppWebsiteVisits />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <AppCurrentVisits />
                                </Grid>
                                <Grid item xs={12} md={6} lg={8}>
                                    <AppConversionRates />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <AppCurrentSubject />
                                </Grid>

                                <Grid item xs={12} md={6} lg={6}>
                                    <AppOrderTimeline />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <AppTrafficBySite />
                                </Grid>
                            </Grid>
                        </Container>
                    </Page>
                </MainStyle>
            </RootStyle>
        </>
    );
};

export default Dashboard;
