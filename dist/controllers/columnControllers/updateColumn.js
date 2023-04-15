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
const updateColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        console.log('start');
        const foundColumn = yield (0, db_1.default)('SELECT * FROM columns WHERE name=$1', [name]);
        if (foundColumn.rowCount > 0) {
            return res.status(403).json({ status: "error", message: "Column name already exist!!" });
        }
        const newColumn = yield (0, db_1.default)('UPDATE columns SET name= $1 WHERE id= $2', [name.trim().toLowerCase(), id]);
        if (newColumn.rowCount == 0) {
            return res.status(204).json({ status: "error", message: "The column is not found" });
        }
        res.status(200).json({ status: "ok", message: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(204).json({ status: "error", message: "The column is not found" });
    }
});
exports.default = updateColumn;
