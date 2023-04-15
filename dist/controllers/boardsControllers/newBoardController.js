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
const uuid_1 = require("uuid");
const newBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    console.log(id);
    try {
        const { name, columns } = req.body;
        if (!name) {
            return res.status(400).json({ status: "error", message: "Board name can not the empty!!" });
        }
        if (!/^[a-zA-Z]+[\sa-zA-Z]*$/.test(name) || name.length < 3) {
            return res
                .status(400)
                .json({
                status: "error",
                message: "Board name must be three-character long and begin with an alphabet!!",
            });
        }
        const foundBoard = yield (0, db_1.default)("SELECT id FROM boards WHERE name ILIKE $1", [
            name,
        ]);
        if (foundBoard.rowCount > 0) {
            return res
                .status(409)
                .json({ status: "error", message: "Board name already exist!!" });
        }
        const createBoard = yield (0, db_1.default)("INSERT INTO boards(id,name) VALUES($1,$2) RETURNING id, name", [id, name]);
        if (!columns || columns.length == 0) {
            return res.status(201).json({ status: "ok", board: createBoard.rows[0] });
        }
        req.board = createBoard.rows[0];
        req.body.fromBoard = true;
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(501)
            .json({ status: "error", message: "Board could not be created!!" });
    }
});
exports.default = newBoard;
