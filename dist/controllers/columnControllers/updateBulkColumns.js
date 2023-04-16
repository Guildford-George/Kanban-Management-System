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
const updateBulkColumns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = req.params.id;
    const boardName = req.board.name;
    const { columns, previousBoardName } = req.body;
    try {
        if (columns.length == 1) {
            const { columnid, name } = columns[0];
            const foundColumnName = yield (0, db_1.default)('SELECT * FROM columns WHERE name', []);
        }
    }
    catch (error) {
        console.log(error);
        yield (0, db_1.default)('UPDATE FROM boards SET name= $1 WHERE id= $2', [previousBoardName, boardId]);
        res.status(500).json({ status: "error", message: "An error occurred while trying to update columns" });
    }
});
exports.default = updateBulkColumns;
