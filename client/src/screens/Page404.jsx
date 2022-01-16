import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import MotionContainer from "../components/animate/MotionContainer";
import { varBounceIn } from "../components/animate/variants/bounce/BounceIn";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    alignItems: "center",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

const Page404 = () => {
    return (
        <RootStyle title="404 Page Not Found | Minimal-UI">
            <Container>
                <MotionContainer initial="initial" open>
                    <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                        <motion.div variants={varBounceIn}>
                            <Typography variant="h3" paragraph>
                                Sorry, page not found!
                            </Typography>
                        </motion.div>
                        <Typography sx={{ color: "text.secondary" }}>
                            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
                            mistyped the URL? Be sure to check your spelling.
                        </Typography>

                        <motion.div variants={varBounceIn}>
                            <Box
                                component="img"
                                src="/static/illustrations/illustration_404.svg"
                                sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                            />
                        </motion.div>

                        <Button to="/login" size="large" variant="contained" component={RouterLink}>
                            Go to Home
                        </Button>
                    </Box>
                </MotionContainer>
            </Container>
        </RootStyle>
    );
};

export default Page404;