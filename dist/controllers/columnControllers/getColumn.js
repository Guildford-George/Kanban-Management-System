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
const getColumn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ status: "error", message: "The column can not be found" });
        }
        const foundColumn = yield (0, db_1.default)('SELECT id,name FROM columns WHERE id= $1', [id]);
        if (foundColumn.rowCount == 0) {
            return res.status(204).json({ status: "error", message: "The column does not exist!!" });
        }
        req.column = {
            columnId: foundColumn.rows[0].id,
            name: foundColumn.rows[0].name,
        };
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "The error occurred..." });
    }
});
exports.default = getColumn;
