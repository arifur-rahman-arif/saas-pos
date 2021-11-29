const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            minLength: 4,
            maxLength: 8,
        },
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 8,
        },
        lastName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 8,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        avatarRef: {
            type: String,
        },
        status: {
            type: Object,
            active: {
                type: Boolean,
            },
            onHold: {
                type: Boolean,
            },
            restricted: {
                type: Boolean,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
