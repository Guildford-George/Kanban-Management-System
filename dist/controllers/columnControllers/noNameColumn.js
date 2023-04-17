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
const noNameColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardid = req.body.board_id;
        const addNonameColumn = yield (0, db_1.default)('INSERT INTO columns(name,board_id) VALUES($1, $2) RETURNING id, name', ["", boardid]);
        res.status(201).json({ status: "success", column: addNonameColumn.rows[0] });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "An error occurred while creating column" });
    }
});
exports.default = noNameColumn;
