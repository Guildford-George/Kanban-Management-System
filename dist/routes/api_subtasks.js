"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newSubTask_1 = __importDefault(require("../controllers/subtaskController/newSubTask"));
const deleteSubtask_1 = __importDefault(require("../controllers/subtaskController/deleteSubtask"));
const updateSubtask_1 = __importDefault(require("../controllers/subtaskController/updateSubtask"));
const updateSubtaskCompletion_1 = __importDefault(require("../controllers/subtaskController/updateSubtaskCompletion"));
const apiRouter_04 = express_1.default.Router();
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
 *              $ref: '#/components/schemas/CreateSubTaskInput'
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
apiRouter_04.post("/subtasks", newSubTask_1.default);
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
apiRouter_04.delete("/subtasks/:id", deleteSubtask_1.default);
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
 *              $ref: '#/components/schemas/UpdateSubTaskInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter_04.put("/subtasks/:id", updateSubtask_1.default);
apiRouter_04.put("/subtasks/complete/:id", updateSubtaskCompletion_1.default);
exports.default = apiRouter_04;
