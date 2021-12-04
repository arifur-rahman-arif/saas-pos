const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRoles = require("../../utils/userRoles");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true, "Please provide username"],
            minLength: 1,
            maxLength: 8,
        },
        firstName: {
            type: String,
            required: [true, "Please provide firstname"],
            minLength: 1,
            maxLength: 20,
        },
        lastName: {
            type: String,
            required: [true, "Please provide lastname"],
            minLength: 1,
            maxLength: 20,
        },
        email: {
            type: String,
            required: [true, "Please provide email address"],
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email address.",
            ],
            validate: {
                validator: function (value) {
                    return !value.match(/[A-Z]/g);
                },
                message: (props) => `Email can't have uppercase letter`,
            },
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 6,
            select: false,
        },
        userRole: {
            type: String,
            required: [true, "Please provide user role"],
            default: userRoles.subscriber.slug,
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
            isVerified: {
                type: Boolean,
            },
            default: {
                active: false,
                onHold: true,
                restricted: true,
                isVerified: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
