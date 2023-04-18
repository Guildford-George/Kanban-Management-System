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
const getAllData_1 = __importDefault(require("../controllers/boardsControllers/getAllData"));
const noNameSubtask_1 = __importDefault(require("../controllers/subtaskController/noNameSubtask"));
const noNameColumn_1 = __importDefault(require("../controllers/columnControllers/noNameColumn"));
const apiRouter = express_1.default.Router();
apiRouter.get("/boards", getAllData_1.default);
/**
 * @openapi
 * /api/v1/boards:
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
 */
apiRouter.post("/boards", newBoardController_1.default, newColumnsController_1.default);
/**
 * @openapi
 * '/api/v1/boards/{id}':
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
apiRouter.get("/boards/:id", showBoardController_1.default, getAllColumns_1.default);
/**
 * @openapi
 * '/api/v1/boards/{id}':
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
apiRouter.delete("/boards/:id", deleteBoard_1.default);
/**
 * @openapi
 * '/api/v1/boards/{id}':
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
apiRouter.put("/boards/:id", updateBoards_1.default);
/**
 * @openapi
 * /api/v1/boards:
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
apiRouter.get("/boards", showAllBoardController_1.default);
/**
 * @openapi
 * '/api/v1/columns/{id}':
 *  get:
 *    tags:
 *    - GetSingleColumn
 *    summary: Get a single Column by the ColumnId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the Column
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter.get("/columns/:id", getColumn_1.default, getTasks_1.default);
/**
 * @openapi
 * '/api/v1/columns/{id}':
 *  delete:
 *    tags:
 *    - DeleteSingleColumn
 *    summary: Delete a single Column by the ColumnId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the Column
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter.delete("/columns/:id", deleteColumn_1.default);
apiRouter.put("/columns/:id", updateColumn_1.default);
/**
 * @openapi
 * '/api/v1/columns/{id}':
 *  post:
 *    tags:
 *    - AddSingleColumn
 *    summary: Add a single Column
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the respective board
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              CreateColumnInput:
 *               type: object
 *               required:
 *                - columns
 *               properties:
 *                columns:
 *                 type: array
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
 */
apiRouter.post("/columns/:id", newSingleColumn_1.default, newColumnsController_1.default);
apiRouter.post("/columns/empty", noNameColumn_1.default);
/**
 * @openapi
 * '/api/v1/tasks/{id}':
 *  post:
 *    tags:
 *    - AddSingleTask
 *    summary: Add a single Task
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the respective Column
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              CreateTaskInput:
 *               type: object
 *               required:
 *                - columns
 *               properties:
 *                columns:
 *                 type: array
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
 */
apiRouter.post("/tasks", newTask_1.default, newSubTask_1.default);
/**
 * @openapi
 * '/api/v1/tasks/{id}':
 *  delete:
 *    tags:
 *    - DeleteSingleTask
 *    summary: Delete a single Task by the TaskId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the task
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter.delete("/tasks/:id", deleteTask_1.default);
/**
 * @openapi
 * '/api/v1/tasks/{id}':
 *  put:
 *    tags:
 *    - UpdateSingleTask
 *    summary: Update a single task by the taskId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the single task
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
apiRouter.get("/tasks/:id", getSingleTask_1.default, getSubtasksController_1.default);
/**
 * @openapi
 * '/api/v1/subtasks/{id}':
 *  post:
 *    tags:
 *    - AddSingleSubTask
 *    summary: Add a single subtask
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the respective task
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              CreateColumnInput:
 *               type: object
 *               required:
 *                - columns
 *               properties:
 *                columns:
 *                 type: array
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
 */
apiRouter.post("/subtasks", newSubTask_1.default);
/**
 * @openapi
 * '/api/v1/subtasks/{id}':
 *  delete:
 *    tags:
 *    - DeleteSingleSubTask
 *    summary: Delete a single subtask by the subtaskId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the subtask
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: subtask not found
 *
 *
 */
apiRouter.delete("/subtasks/:id", deleteSubtask_1.default);
/**
 * @openapi
 * '/api/v1/subtasks/{id}':
 *  put:
 *    tags:
 *    - UpdateSingleSubTask
 *    summary: Update a single subtask by the taskId
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the single task
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
apiRouter.put("/subtasks/:id", updateSubtask_1.default);
apiRouter.post("/subtask/empty", noNameSubtask_1.default);
exports.default = apiRouter;
