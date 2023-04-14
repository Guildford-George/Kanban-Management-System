"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newBoardController_1 = __importDefault(require("../controllers/boardsControllers/newBoardController"));
const showBoardController_1 = __importDefault(require("../controllers/boardsControllers/showBoardController"));
const newColumnsController_1 = __importDefault(require("../controllers/columnControllers/newColumnsController"));
const deleteBoard_1 = __importDefault(require("../controllers/boardsControllers/deleteBoard"));
const updateBoards_1 = __importDefault(require("../controllers/boardsControllers/updateBoards"));
const apiRouter = express_1.default.Router();
apiRouter.post("/addboard", newBoardController_1.default, newColumnsController_1.default);
apiRouter.get("/getboard", showBoardController_1.default);
apiRouter.delete("/delboard/:id", deleteBoard_1.default);
apiRouter.put("/upboard/:id", updateBoards_1.default);
exports.default = apiRouter;
