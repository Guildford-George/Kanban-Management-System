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
const pg_format_1 = __importDefault(require("pg-format"));
const db_1 = __importDefault(require("../../dbConfig/db"));
const newSubTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, subtasks, fromTask } = req.body;
    console.log(subtasks);
    try {
        if (!taskId) {
            return res.status(400).json({ status: "error", message: "Task can not be empty" });
        }
        if (subtasks.length == 0 || !subtasks) {
            return res.status(400).json({ status: "error", message: "The subtasks field can be empty" });
        }
        let sortedSubtask = [];
        const loopMidLength = Math.ceil(subtasks.length / 2);
        for (let i = 0; i < loopMidLength; i++) {
            if (subtasks[i].title) {
                sortedSubtask[i] = [subtasks[i].title, subtasks[i].is_completed, taskId];
            }
            if (i + loopMidLength < subtasks.length) {
                if (subtasks[i + loopMidLength].title) {
                    sortedSubtask[i + loopMidLength] = [subtasks[i + loopMidLength].title, subtasks[i + loopMidLength].is_completed, taskId];
                }
            }
        }
        console.log(sortedSubtask);
        if (sortedSubtask.length != subtasks.length) {
            return res.status(400).json({ status: "error", message: "Subtasks can not be save because some of the input were left empty" });
        }
        const queryCommand = (0, pg_format_1.default)("INSERT INTO %s(title, is_completed, task_id) VALUES %L RETURNING id, title, is_completed", "subtasks", sortedSubtask);
        console.log(queryCommand);
        const createSubTask = yield (0, db_1.default)(queryCommand, []);
        res.status(201).send('success');
    }
    catch (error) {
        console.log(error);
        if (fromTask) {
            yield (0, db_1.default)('DELETE FROM tasks WHERE id= $1', [taskId]);
        }
        res.status(500).json({ status: "error", message: "An error has..." });
    }
});
exports.default = newSubTask;
