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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../dbConfig/db"));
const formatAllData_1 = __importDefault(require("../../utils/formatAllData"));
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield (0, db_1.default)('SELECT id boardId, name FROM boards', []);
        const columns = yield (0, db_1.default)('SELECT id columnId, name, board_id FROM columns WHERE name<>$1', [""]);
        const tasks = yield (0, db_1.default)('SELECT id taskId, title, description, status, column_id FROM tasks', []);
        const subtask = yield (0, db_1.default)('SELECT id subtaskid, title, is_completed, task_id FROM subtasks WHERE title<>$1', [""]);
        res.status(200).json({ boards: (0, formatAllData_1.default)(boards.rows, columns.rows, tasks.rows, subtask.rows) });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "An error occurred while fetching data" });
    }
});
exports.default = getAllData;
