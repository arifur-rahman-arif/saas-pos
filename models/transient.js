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

const Transient = mongoose.model("transient", transientSchema);

module.exports = { Transient, transientSchema };
// module.exports = Transient;
