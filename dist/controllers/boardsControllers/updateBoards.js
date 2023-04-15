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
const updateBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ status: "error", message: "Board name does not exist!!" });
        }
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
        const foundBoard = yield (0, db_1.default)("SELECT id FROM boards WHERE name= $1", [
            name.toLowerCase(),
        ]);
        if (foundBoard.rowCount > 0) {
            return res
                .status(409)
                .json({ status: "error", message: "Board name already exist!!" });
        }
        const updateOneBoard = yield (0, db_1.default)('UPDATE boards SET name= $1 WHERE name<>$1 AND id= $2 RETURNING id,name', [name, id]);
        if (updateOneBoard.rowCount == 0) {
            console.log('no change');
            req.board = {
                id: id,
                name: name
            };
        }
        else {
            console.log('change');
            req.board = {
                id: updateOneBoard.rows[0].id,
                name: updateOneBoard.rows[0].name
            };
        }
        res.status(200).json({ status: "ok" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "There was an error!!" });
    }
});
exports.default = updateBoard;
