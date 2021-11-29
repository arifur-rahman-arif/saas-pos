const mongoose = require("mongoose");

const userMetaSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserMeta = mongoose.model("UserMeta", userMetaSchema);

module.exports = UserMeta;
