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
const express_1 = __importDefault(require("express"));
const jsondata_1 = __importDefault(require("../dbConfig/jsondata"));
const newBoardController_1 = __importDefault(require("../controllers/newBoardController"));
const taskroutes = express_1.default.Router();
taskroutes.route("/tasks").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(jsondata_1.default);
        return;
    }
    catch (err) {
        console.error(err);
    }
}));
taskroutes.get("/newBoard", newBoardController_1.default);
exports.default = taskroutes;
