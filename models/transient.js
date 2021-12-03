const mongoose = require("mongoose");

const transientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: mongoose.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

const transientModal = (expirationTime = 86400) => {
    const Transient = mongoose.model("transient", transientSchema);

    transientSchema.index({ createdAt: 1 }, { expireAfterSeconds: expirationTime });

    return Transient;
};

module.exports = transientModal;
