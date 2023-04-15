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
const getSingleTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ status: "error", message: "The Task is not found" });
        }
        const singleTask = yield (0, db_1.default)('SELECT id, title, description FROM tasks WHERE id= $1', [id]);
        if (singleTask.rowCount == 0) {
            return res.status(400).json({ status: "error", message: "The task does not exist" });
        }
        req.task = {
            taskId: singleTask.rows[0].id,
            title: singleTask.rows[0].title,
            description: singleTask.rows[0].description
        };
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "An error has occurred.." });
    }
});
exports.default = getSingleTask;
