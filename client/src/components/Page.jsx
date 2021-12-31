import { useEffect } from "react";

// material
import { Box } from "@mui/material";

const Page = ({ children, title = "", ...other }) => {
    useEffect(() => {
        document.title = title;
        // eslint-disable-next-line
    }, []);

    return <Box {...other}>{children}</Box>;
};

export default Page;
