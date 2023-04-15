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
const newColumns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = req.board.id;
    const boardName = req.board.name;
    const { columns, fromBoard } = req.body;
    try {
        // implement don't repeat column name
        const loopMidLength = Math.ceil(columns.length / 2);
        for (let i = 0; i < loopMidLength; i++) {
            columns[i] = [columns[i], boardId];
            if (i + loopMidLength < columns.length) {
                columns[i + loopMidLength] = [columns[i + loopMidLength], boardId];
            }
        }
        const queryCommand = (0, pg_format_1.default)("INSERT INTO %s(name, board_id) VALUES %L RETURNING id,name", "columns", columns);
        console.log(queryCommand);
        const createColumns = yield (0, db_1.default)(queryCommand, []);
        console.log(createColumns.rows);
        const boardDetail = {
            id: boardId,
            name: boardName,
            columns: createColumns.rows,
        };
        res.status(201).json({ status: "ok", board: boardDetail });
    }
    catch (error) {
        console.log(error);
        if (fromBoard) {
            yield (0, db_1.default)("DELETE FROM $1 WHERE $2=$3", ["boards", "id", boardId]);
        }
        res.status(500).json({
            status: "error",
            message: "Error occcurred while trying to create columns. Please if some of the column names are not the same",
        });
    }
});
exports.default = newColumns;
