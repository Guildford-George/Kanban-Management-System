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
const getAllBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBoards = yield (0, db_1.default)("SELECT * FROM boards order by created_time ASC", []);
        if (allBoards.rowCount < 0) {
            return res
                .status(409)
                .json({ status: "error", message: "No Boards Found" });
        }
        res.status(200).json({ status: "success", boards: allBoards.rows });
    }
    catch (error) {
        console.log(error);
        res.status(501).json({ status: "error", message: "Bad request!!" });
    }
});
exports.default = getAllBoard;
