"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const Schema = mongoose_1.default.Schema;
const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
});
CourseSchema.pre("validate", function (next) {
    this.slug = (0, slugify_1.default)(this.name, {
        lower: true,
        strict: true,
    });
    next();
});
exports.Course = mongoose_1.default.model("Course", CourseSchema);
