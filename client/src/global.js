import { replace } from "lodash";
import numeral from "numeral";
import { format, formatDistanceToNow } from "date-fns";

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const fCurrency = (number) => {
    return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
};

export const fPercent = (number) => {
    return numeral(number / 100).format("0.0%");
};

export const fNumber = (number) => {
    return numeral(number).format();
};

export const fShortenNumber = (number) => {
    return replace(numeral(number).format("0.00a"), ".00", "");
};

export const fData = (number) => {
    return numeral(number).format("0.0 b");
};

export const fDate = (date) => {
    return format(new Date(date), "dd MMMM yyyy");
};

export const fDateTime = (date) => {
    return format(new Date(date), "dd MMM yyyy HH:mm");
};

export const fDateTimeSuffix = (date) => {
    return format(new Date(date), "dd/MM/yyyy hh:mm p");
};

export const fToNow = (date) => {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
};

// export { validateEmail, fCurrency, fPercent, fNumber, fShortenNumber, fData };

// ----------------------------------------------------------------------
