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
const deleteColumn_1 = __importDefault(require("../controllers/columnControllers/deleteColumn"));
const updateColumn_1 = __importDefault(require("../controllers/columnControllers/updateColumn"));
const getColumn_1 = __importDefault(require("../controllers/columnControllers/getColumn"));
const newSingleColumn_1 = __importDefault(require("../controllers/columnControllers/newSingleColumn"));
const newTask_1 = __importDefault(require("../controllers/taskControllers/newTask"));
const deleteTask_1 = __importDefault(require("../controllers/taskControllers/deleteTask"));
const getTasks_1 = __importDefault(require("../controllers/taskControllers/getTasks"));
const getAllColumns_1 = __importDefault(require("../controllers/columnControllers/getAllColumns"));
const newSubTask_1 = __importDefault(require("../controllers/subtaskController/newSubTask"));
const getSingleTask_1 = __importDefault(require("../controllers/taskControllers/getSingleTask"));
const getSubtasksController_1 = __importDefault(require("../controllers/subtaskController/getSubtasksController"));
const showAllBoardController_1 = __importDefault(require("../controllers/boardsControllers/showAllBoardController"));
const deleteSubtask_1 = __importDefault(require("../controllers/subtaskController/deleteSubtask"));
const updateSubtask_1 = __importDefault(require("../controllers/subtaskController/updateSubtask"));
const apiRouter = express_1.default.Router();
apiRouter.get("/boards", showAllBoardController_1.default);
/**
 * @swagger
 * /api/v1/addboard:
 *  post:
 *    tags:
 *    - Addboard
 *    summary: Add a single board
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              CreateBoardInput:
 *               type: object
 *               required:
 *                - name
 *               properties:
 *                name:
 *                 type: string
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *              schema:
 *
 *      409:
 *         description: Conflict
 *      400:
 *         description: Bad request
 *
 *
 *
 *
 *
 *
 */
apiRouter.post("/addboard", newBoardController_1.default, newColumnsController_1.default);
/**
 * @swagger
 * '/api/v1/getboard/{id}':
 *  get:
 *    tags:
 *    - GetSingleBoard
 *    summary: Get a single board by the boardId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the single board
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter.get("/getboard/:id", showBoardController_1.default, getAllColumns_1.default);
/**
 * @swagger
 * '/api/v1/delboard/{id}':
 *  delete:
 *    tags:
 *    - DeleteSingleBoard
 *    summary: Delete a single board by the boardId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the single board
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 */
apiRouter.delete("/delboard/:id", deleteBoard_1.default);
/**
 * @swagger
 * '/api/v1/upboard/{id}':
 *  put:
 *    tags:
 *    - UpdateSingleBoard
 *    summary: Update a single board by the boardId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the single board
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              UpdateBoardInput:
 *               type: object
 *               required:
 *                - name
 *               properties:
 *                name:
 *                 type: string
 *                 default: sample board
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter.put("/upboard/:id", updateBoards_1.default);
/**
 * @swagger
 * /api/v1/allboard:
 *  get:
 *    tags:
 *    - GetAllBoard
 *    summary: Get all available boards
 *    responses:
 *      200:
 *         description: Success
 *
 *      409:
 *         description: Conflict
 *      400:
 *         description: Bad request
 *
 */
apiRouter.get("/allboard", showAllBoardController_1.default);
apiRouter.get("/getcolumn/:id", getColumn_1.default, getTasks_1.default);
apiRouter.delete("/delcolumn/:id", deleteColumn_1.default);
apiRouter.put("/upcolumn/:id", updateColumn_1.default);
apiRouter.post("/addcolumn/:id", newSingleColumn_1.default, newColumnsController_1.default);
apiRouter.post("/tasks", newTask_1.default);
apiRouter.delete("/tasks/:id", deleteTask_1.default);
apiRouter.get("/tasks/:id", getSingleTask_1.default, getSubtasksController_1.default);
apiRouter.post("/subtasks", newSubTask_1.default);
apiRouter.delete("/subtasks/:id", deleteSubtask_1.default);
apiRouter.put("/subtasks/:id", updateSubtask_1.default);
exports.default = apiRouter;
