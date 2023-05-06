"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "lecturer", "admin"],
        default: "student",
    },
    courses: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});
UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    bcrypt_1.default.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
exports.User = mongoose_1.default.model("User", UserSchema);
