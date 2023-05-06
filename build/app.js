"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const method_override_1 = __importDefault(require("method-override"));
const pageRoute = __importStar(require("./routes/pageRoute"));
const courseRoute = __importStar(require("./routes/courseRoute"));
const categoryRoute = __importStar(require("./routes/categoryRoute"));
const authRoute = __importStar(require("./routes/authRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Connect to DB
mongoose_1.default
    .connect("mongodb+srv://nairegemen:MmrzhNwGByTR124q@smartedu.3il686j.mongodb.net/")
    .then(() => {
    console.log(`⚡️[server]: DB connected at mongodb://localhost/smartedu-db`);
});
// Template Engine
app.set("view engine", "ejs");
// Global Variable
let userIN = null;
// Middlewares
app.use(express_1.default.static("public"));
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing
app.use((0, express_session_1.default)({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb+srv://nairegemen:MmrzhNwGByTR124q@smartedu.3il686j.mongodb.net/",
    }),
}));
app.use((0, connect_flash_1.default)());
app.use((req, res, next) => {
    res.locals.flashMessage = req.flash();
    next();
});
app.use((0, method_override_1.default)("_method", {
    methods: ["POST", "GET"],
}));
// Routes
app.use("*", (req, res, next) => {
    userIN = req.session.userID;
    res.locals.userIN = userIN;
    next();
});
app.use("/", pageRoute.router);
app.use("/courses", courseRoute.router);
app.use("/categories", categoryRoute.router);
app.use("/users", authRoute.router);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
