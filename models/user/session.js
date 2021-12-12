const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 10 });

const Session = mongoose.model("session", sessionSchema);

module.exports = Session;
