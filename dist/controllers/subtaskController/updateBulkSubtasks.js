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
const pg_format_1 = __importDefault(require("pg-format"));
const updateBulkSubtasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { previousTaskTitle, taskId, subtasks, deletedSubtasks } = req.body;
    try {
        const registeredSubtask = yield (0, db_1.default)("SELECT * FROM subtasks WHERE task_id= $1", [taskId]);
        if (registeredSubtask.rows.length == 0) {
            return res
                .status(400)
                .json({ status: "error", message: "No subtasks found" });
        }
        let subtasksMidLen = Math.ceil(subtasks.length / 2);
        const formatSubtasks = [[], [], []];
        for (let i = 0; i < subtasksMidLen; i++) {
            formatSubtasks[0][i] = subtasks[i].subtaskid;
            formatSubtasks[1][i] = subtasks[i].title;
            formatSubtasks[2][i] = subtasks[i].is_completed;
            const nextItem = i + subtasksMidLen;
            if (nextItem < subtasks.length) {
                formatSubtasks[0][nextItem] = subtasks[nextItem].subtaskid;
                formatSubtasks[1][nextItem] = subtasks[nextItem].title;
                formatSubtasks[2][nextItem] = subtasks[nextItem].is_completed;
            }
        }
        const deletedSubtasksCommand = (0, pg_format_1.default)('DELTE FROM subtask WHERE id IN(%L)', deletedSubtasks);
        const queryCommand = (0, pg_format_1.default)(`UPDATE subtasks SET title=tmp_title, is_completed= tmp_is_completed::boolean FROM
      (SELECT UNNEST(ARRAY[%L]) tmp_id,UNNEST(ARRAY[%L]) tmp_title,UNNEST(ARRAY[%L]) tmp_is_completed) tmp
      WHERE id=tmp_id::uuid`, formatSubtasks[0], formatSubtasks[1], formatSubtasks[2]);
        yield (0, db_1.default)(deletedSubtasksCommand, []);
        yield (0, db_1.default)(queryCommand, []);
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        console.log(error);
        yield (0, db_1.default)("UPDATE FROM tasks SET title=$1 WHERE id=$2", [
            previousTaskTitle,
            taskId,
        ]);
        res.status(500).json({
            status: "error",
            message: "An error occurred while trying to update subtasks"
        });
    }
});
exports.default = updateBulkSubtasks;
