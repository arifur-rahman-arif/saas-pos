const error = {
    routeError: (req, res, next) => {
        res.status(404).send({
            status: 404,
            response: `api route not found for ${req.headers.host + req.url}`,
        });
    },
};

module.exports = error;
