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
const db_1 = __importDefault(require("../dbConfig/db"));
const editBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const { boardName } = req.body;
    console.log('BoardId ', boardId);
    console.log('BoardName ', boardName);
    try {
        const updateBoard = yield (0, db_1.default)('UPDATE boards SET name= $1 WHERE name<>$1 AND id= $2 RETURNING id,name', [boardName, boardId]);
        if (updateBoard.rowCount == 0) {
            console.log('no change');
            req.board = {
                id: boardId,
                name: boardName
            };
        }
        else {
            console.log('change');
            req.board = {
                id: updateBoard.rows[0].id,
                name: updateBoard.rows[0].id
            };
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = editBoard;
