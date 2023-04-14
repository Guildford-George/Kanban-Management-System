"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newBoardController_1 = __importDefault(require("../controllers/newBoardController"));
const showBoardController_1 = __importDefault(require("../controllers/showBoardController"));
const apiRouter = express_1.default.Router();
apiRouter.post("/addboard", newBoardController_1.default);
apiRouter.get("/getboard", showBoardController_1.default);
exports.default = apiRouter;
