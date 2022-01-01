import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import ScrollToTop from "./components/ScrollToTop";
import Routes from "./routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

const App = () => {
    return (
        <>
            <ThemeConfig>
                <Router>
                    <ScrollToTop />
                    <GlobalStyles />
                    <BaseOptionChartStyle />
                    <Routes />
                </Router>
            </ThemeConfig>
        </>
    );
};

export default App;
