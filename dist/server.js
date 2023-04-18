"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
// custom module
const taskroutes_1 = __importDefault(require("./routes/taskroutes"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const api_board_1 = __importDefault(require("./routes/api_board"));
const api_column_1 = __importDefault(require("./routes/api_column"));
const api_tasks_1 = __importDefault(require("./routes/api_tasks"));
const api_subtasks_1 = __importDefault(require("./routes/api_subtasks"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", taskroutes_1.default);
app.use("/api/v1", api_board_1.default);
app.use("/api/v1", api_column_1.default);
app.use("/api/v1", api_tasks_1.default);
app.use("/api/v1", api_subtasks_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on PORT : ${PORT}`);
    (0, swagger_1.default)(app, PORT);
});
