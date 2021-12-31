// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { fShortenNumber } from "../../global";

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    color: theme.palette.error.darker,
    backgroundColor: theme.palette.error.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.error.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
        theme.palette.error.dark,
        0.24
    )} 100%)`,
}));

const AppBugReports = () => {
    return (
        <RootStyle>
            <IconWrapperStyle>
                <i className="fas fa-bug"></i>
            </IconWrapperStyle>
            <Typography variant="h3">{fShortenNumber(234)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Bug Reports
            </Typography>
        </RootStyle>
    );
};

export default AppBugReports;
