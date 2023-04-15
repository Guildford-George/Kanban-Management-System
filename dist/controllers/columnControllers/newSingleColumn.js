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
const newSingleColumn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { columns } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ status: "error", message: "The board can not be empty!!" });
        }
        if (!columns || columns.length != 1) {
            return res.status(400).json({ status: "error", message: "Enter the new column" });
        }
        const foundBoard = yield (0, db_1.default)('SELECT id,name FROM boards WHERE id= $1', [id]);
        if (foundBoard.rowCount == 0) {
            return res.status(204).json({ status: "error", message: "The board does not exist!!" });
        }
        const foundColumn = yield (0, db_1.default)('SELECT * FROM columns WHERE board_id= $1 AND name ILIKE $2', [id, columns[0]]);
        if (foundColumn.rowCount > 0) {
            return res.status(403).json({ status: "error", message: "Column already exist" });
        }
        req.board = {
            id: foundBoard.rows[0].id,
            name: foundBoard.rows[0].name
        };
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "There was an error trying to create column!!" });
    }
});
exports.default = newSingleColumn;
