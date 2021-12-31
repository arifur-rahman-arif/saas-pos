const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userMetaSchema = Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const UserMeta = mongoose.model("UserMeta", userMetaSchema);

module.exports = UserMeta;
