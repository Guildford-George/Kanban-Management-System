"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newTask_1 = __importDefault(require("../controllers/taskControllers/newTask"));
const newSubTask_1 = __importDefault(require("../controllers/subtaskController/newSubTask"));
const deleteTask_1 = __importDefault(require("../controllers/taskControllers/deleteTask"));
const getSingleTask_1 = __importDefault(require("../controllers/taskControllers/getSingleTask"));
const getSubtasksController_1 = __importDefault(require("../controllers/subtaskController/getSubtasksController"));
const updateTask_1 = __importDefault(require("../controllers/taskControllers/updateTask"));
const updateBulkSubtasks_1 = __importDefault(require("../controllers/subtaskController/updateBulkSubtasks"));
const moveTask_1 = __importDefault(require("../controllers/taskControllers/moveTask"));
const apiRouter_03 = express_1.default.Router();
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
 *              $ref: '#/components/schemas/CreateTaskInput'
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
apiRouter_03.post("/tasks", newTask_1.default, newSubTask_1.default);
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
apiRouter_03.delete("/tasks/:id", deleteTask_1.default);
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
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter_03.get("/tasks/:id", getSingleTask_1.default, getSubtasksController_1.default);
apiRouter_03.put("/tasks/:id", updateTask_1.default, updateBulkSubtasks_1.default);
apiRouter_03.put("/tasks/move/:id", moveTask_1.default);
exports.default = apiRouter_03;
