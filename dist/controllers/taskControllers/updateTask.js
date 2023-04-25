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
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { title, description, subtasks, deletedSubtasks, move } = req.body;
    const sourceColumnid = move.source.columnid;
    const sourceIndex = move.source.index;
    const destinationColumnid = move.destination.columnid;
    const destinationIndex = move.destination.index;
    console.log(move);
    try {
        if (!title) {
            return res.status(400).json({ status: "error", message: "The task-name input field can not be empty" });
        }
        const destination = yield (0, db_1.default)('SELECT * FROM columns WHERE id= $1', [destinationColumnid]);
        const foundTask = yield (0, db_1.default)('SELECT title FROM tasks WHERE id= $1', [taskId]);
        if (foundTask.rows.length == 0) {
            return res.status(400).json({ status: "error", message: "Task does not exist" });
        }
        const columnTasks = yield (0, db_1.default)('SELECT title FROM tasks WHERE column_id= $1 AND id <> $2 AND title ILIKE $3', [sourceColumnid, taskId, title]);
        if (columnTasks.rows.length > 0) {
            return res.status(409).json({ status: "error", message: "Task already exist" });
        }
        if (sourceColumnid != destinationColumnid) {
            yield (0, db_1.default)('UPDATE tasks SET order_location=order_location-1 WHERE column_id=$1 AND order_location>$2', [sourceColumnid, sourceIndex]);
            yield (0, db_1.default)('UPDATE tasks SET order_location=order_location+1 WHERE column_id=$1 AND order_location>=$2', [destinationColumnid, destinationIndex]);
            yield (0, db_1.default)('UPDATE tasks SET title= $1, description= $2, order_location= $3, column_id=$4, status=$5 WHERE id= $6', [title, description, destinationIndex, destinationColumnid, destination.rows[0].name, taskId]);
        }
        else if (sourceColumnid === destinationColumnid && sourceIndex !== destinationIndex) {
            // source
            yield (0, db_1.default)('UPDATE tasks SET order_location=order_location-1 WHERE column_id=$1 AND order_location>$2 AND order_location<=$3', [sourceColumnid, sourceIndex, destinationIndex]);
            // destination
            yield (0, db_1.default)('UPDATE tasks SET title= $1, description= $2, order_location= $3 WHERE id= $4', [title, description, destinationIndex, taskId]);
        }
        if ((!subtasks || subtasks.length == 0) && (!deletedSubtasks || deletedSubtasks.length == 0)) {
            return res.status(200).json({ status: "success" });
        }
        req.body.taskId = taskId;
        req.body.previousTaskTitle = foundTask.rows[0].title;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "An error occurred while trying to update task" });
    }
});
exports.default = updateTask;
