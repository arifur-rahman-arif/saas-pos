import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
// Components
import Page from "../components/Page";
import AppWeeklySales from "../components/dashboard/AppWeeklySales";
import AppNewUsers from "../components/dashboard/AppNewUsers";
import AppItemOrders from "../components/dashboard/AppItemOrders";
import AppBugReports from "../components/dashboard/AppBugReports";
import AppWebsiteVisits from "../components/dashboard/AppWebsiteVisits";

const Dashboard = () => {
    return (
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
                    {/* <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <AppNewsUpdate />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AppOrderTimeline />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AppTrafficBySite />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <AppTasks />
                    </Grid>{" "} */}
                </Grid>
            </Container>
        </Page>
    );
};

export default Dashboard;
