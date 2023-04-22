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
const getSubtasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.task;
    try {
        if (!taskId) {
            return res.status(400).json({ status: "error", message: "Task can not found" });
        }
        const subtasks = yield (0, db_1.default)('SELECT id subtaskID, title, is_completed FROM subtasks WHERE task_id= $1 ORDER BY created_time ASC', [taskId]);
        const task = Object.assign(Object.assign({}, req.task), { subtasks: subtasks.rows });
        res.status(200).json({ status: "success", task });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "There was error trying fetch subtasks" });
    }
});
exports.default = getSubtasks;
