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
const newTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, columnId, subtasks } = req.body;
    try {
        if (!columnId) {
            return res.status(400).json({ status: "error", message: "Invalid column_id" });
        }
        if (!title) {
            return res.status(400).json({ status: "error", message: "The task title can not be empty" });
        }
        const matchColumn = yield (0, db_1.default)('SELECT id,name FROM columns WHERE id=$1', [columnId]);
        if (matchColumn.rowCount == 0) {
            return res.status(400).json({ status: "error", message: "The column is not found" });
        }
        const status = matchColumn.rows[0].name;
        const foundTask = yield (0, db_1.default)('SELECT * FROM tasks WHERE title ILIKE $1 AND column_id=$2', [title, columnId]);
        console.log(foundTask.rows);
        if (foundTask.rows.length > 0) {
            return res.status(403).json({ status: "error", message: "This task has already been registered!!" });
        }
        const registerTask = yield (0, db_1.default)('INSERT INTO tasks(title,description,column_id,status) VALUES($1,$2,$3,$4) RETURNING id,title,description', [title, description, columnId, status]);
        const createdTask = registerTask.rows[0];
        req.task = {
            taskId: createdTask.id,
            title: createdTask.title,
            description: createdTask.description
        };
        if (!subtasks || subtasks.length == 0) {
            return res.status(201).json({ status: "success" });
        }
        req.body = Object.assign(Object.assign({}, req.task), { subtasks, fromTask: true });
        next();
        res.send('success');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "There was an error while creating the task" });
    }
});
exports.default = newTask;
