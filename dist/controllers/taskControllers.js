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
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require("../dbConfig/db");
const { v4: uuidv4 } = require("uuid");
const AllBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getAllTask = yield pool.query(`SELECT * FROM columns WHERE id=$1`, [id]);
        res.json(getAllTask.rows);
    }
    catch (err) {
        console.error(err);
    }
});
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const id = uuidv4();
    try {
        const newBoard = yield pool.query(`INSERT INTO boards(id,name) VALUES($1,$2)`, [id, name]);
    }
    catch (err) {
        console.error(err);
    }
});
