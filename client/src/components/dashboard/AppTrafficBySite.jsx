import faker from "faker";
// material
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from "@mui/material";
import { fShortenNumber } from "../../global";
// utils

// ----------------------------------------------------------------------

const facebookStyle = {
    color: "#1877F2",
    fontSize: "2rem",
};

const googleStyle = {
    color: "#DF3E30",
    fontSize: "2rem",
};

const linkedinStyle = {
    color: "#006097",
    fontSize: "2rem",
};

const twitterStyle = {
    color: "#1C9CEA",
    fontSize: "2rem",
};

const SOCIALS = [
    {
        name: "FaceBook",
        value: faker.datatype.number(),
        icon: <i className="fab fa-facebook" style={facebookStyle}></i>,
    },
    {
        name: "Google",
        value: faker.datatype.number(),
        icon: <i className="fab fa-google" style={googleStyle}></i>,
    },
    {
        name: "Linkedin",
        value: faker.datatype.number(),
        icon: <i className="fab fa-linkedin" style={linkedinStyle}></i>,
    },
    {
        name: "Twitter",
        value: faker.datatype.number(),
        icon: <i className="fab fa-twitter" style={twitterStyle}></i>,
    },
];

// ----------------------------------------------------------------------

const SiteItem = ({ site }) => {
    const { icon, value, name } = site;

    return (
        <Grid item xs={6}>
            <Paper variant="outlined" sx={{ py: 2.5, textAlign: "center" }}>
                <Box sx={{ mb: 0.5 }}>{icon}</Box>
                <Typography variant="h6">{fShortenNumber(value)}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {name}
                </Typography>
            </Paper>
        </Grid>
    );
};

const AppTrafficBySite = () => {
    return (
        <Card>
            <CardHeader title="Traffic by Site" />
            <CardContent>
                <Grid container spacing={2}>
                    {SOCIALS.map((site) => (
                        <SiteItem key={site.name} site={site} />
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AppTrafficBySite;
