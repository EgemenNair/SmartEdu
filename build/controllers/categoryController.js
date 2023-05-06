"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.createCategory = void 0;
const Category_1 = require("../models/Category");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.create(req.body);
        req.flash("success", "Category created successfully");
        res.status(201).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", `Category wasn't created successfully: ${error}`);
        res.status(400).redirect("/users/dashboard");
    }
});
exports.createCategory = createCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category_1.Category.findByIdAndRemove(req.params.id);
        req.flash("success", "Category deleted successfully");
        res.status(200).redirect("/users/dashboard");
    }
    catch (error) {
        req.flash("error", `Couldn't delete category: ${error}`);
        res.status(400).redirect("/users/dashboard");
    }
});
exports.deleteCategory = deleteCategory;
