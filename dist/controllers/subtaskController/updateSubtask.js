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
const updateSubtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtaskId = req.params.id;
    const { title, is_completed } = req.body;
    try {
        if (!subtaskId) {
            return res.status(400).json({ status: "error", message: "The subtask is not found" });
        }
        if (!title || typeof is_completed != 'boolean') {
            let errorArray = [];
            if (!title) {
                errorArray.push("the subtask title can not be empty");
            }
            if (typeof is_completed != 'boolean') {
                errorArray.push("invalid input for the subtask completion status");
            }
            if (errorArray.length == 1) {
                return res.status(400).json({ status: "error", message: errorArray[0] });
            }
            return res.status(400).json({ status: "error", message: errorArray.join(" and ") });
        }
        const foundSubtask = yield (0, db_1.default)('SELECT * FROM subtasks WHERE id= $1', [subtaskId]);
        if (foundSubtask.rowCount == 0) {
            return res.status(400).json({ status: "error", message: "The subtask does not exist" });
        }
        const subtaskTarget = yield (0, db_1.default)('UPDATE FROM subtasks SET title= $1, is_complete= $2 WHERE id= $3', [title, is_completed, subtaskId]);
        if (subtaskTarget.rowCount == 0) {
            return res.status(400).json({ status: "error", message: "The subtask does not exist" });
        }
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "An error occurred while updating subtask" });
    }
});
exports.default = updateSubtask;
