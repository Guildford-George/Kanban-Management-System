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
const deleteSubtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtaskId = req.params.id;
    try {
        if (!subtaskId) {
            return res.status(400).json({ status: "error", message: "The subtask is not found" });
        }
        const subtaskTarget = yield (0, db_1.default)('DELETE FROM subtasks WHERE id= $1', [subtaskId]);
        if (subtaskTarget.rowCount == 0) {
            return res.status(403).json({ status: "error", message: "The subtask does not exist" });
        }
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "There was an error while trying to delete subtask" });
    }
});
exports.default = deleteSubtask;
