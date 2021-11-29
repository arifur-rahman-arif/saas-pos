const mongoose = require("mongoose");

const userMetaSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.ObjectId,
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
