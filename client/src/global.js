import { replace } from "lodash";
import numeral from "numeral";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const fCurrency = (number) => {
    return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
};

const fPercent = (number) => {
    return numeral(number / 100).format("0.0%");
};

const fNumber = (number) => {
    return numeral(number).format();
};

const fShortenNumber = (number) => {
    return replace(numeral(number).format("0.00a"), ".00", "");
};

const fData = (number) => {
    return numeral(number).format("0.0 b");
};

export { validateEmail, fCurrency, fPercent, fNumber, fShortenNumber, fData };

// ----------------------------------------------------------------------
