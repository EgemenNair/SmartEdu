"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const Schema = mongoose_1.default.Schema;
const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
});
CategorySchema.pre("validate", function (next) {
    this.slug = (0, slugify_1.default)(this.name, {
        lower: true,
        strict: true,
    });
    next();
});
exports.Category = mongoose_1.default.model("Category", CategorySchema);
