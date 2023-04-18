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
const updateBulkColumns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = req.params.id;
    const boardName = req.board.name;
    const { columns, previousBoardName } = req.body;
    try {
        const allRegisteredColumn = yield (0, db_1.default)("SELECT name FROM columns WHERE board_id= $1", [boardId]);
        const allColumns = allRegisteredColumn.rows.map((col) => col.name.toLowerCase());
        const filteredColumn = columns.filter((col) => !allColumns.includes(col.name.toLowerCase()));
        if (filteredColumn.length == 0) {
            yield (0, db_1.default)('DELETE FROM columns WHERE name =$1 AND board_id= $2', ["", boardId]);
            return res.status(201).json({ status: "success" });
        }
        const queryFormat = [[], []];
        const filteredColumnMidLen = Math.ceil(filteredColumn.length / 2);
        for (let i = 0; i < filteredColumnMidLen; i++) {
            queryFormat[0][i] = filteredColumn[i].columnid;
            queryFormat[1][i] = filteredColumn[i].name;
            const nextItem = i + filteredColumnMidLen;
            if (nextItem < filteredColumn.length) {
                queryFormat[0][nextItem] = filteredColumn[nextItem].columnid;
                queryFormat[1][nextItem] =
                    filteredColumn[i + filteredColumnMidLen].name;
            }
        }
        const formatQuery = (0, pg_format_1.default)(`UPDATE columns SET name= tmp_name FROM (SELECT UNNEST(ARRAY[%L]) tmp_id,
        UNNEST(ARRAY[%L]) as tmp_name) tmp WHERE id= tmp_id::uuid`, queryFormat[0], queryFormat[1]);
        yield (0, db_1.default)(formatQuery, []);
        yield (0, db_1.default)('DELETE FROM columns WHERE name =$1 AND board_id= $2', ["", boardId]);
        res.send("success");
    }
    catch (error) {
        console.log(error);
        yield (0, db_1.default)("UPDATE FROM boards SET name= $1 WHERE id= $2", [
            previousBoardName,
            boardId,
        ]);
        res
            .status(500)
            .json({
            status: "error",
            message: "An error occurred while trying to update columns",
        });
    }
});
exports.default = updateBulkColumns;
