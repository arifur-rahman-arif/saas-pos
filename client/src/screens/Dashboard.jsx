import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
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

const Dashboard = () => {
    return (
        <>
            <DashboardNavbar />
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
        </>
    );
};

export default Dashboard;
