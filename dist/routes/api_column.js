"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteColumn_1 = __importDefault(require("../controllers/columnControllers/deleteColumn"));
const getColumn_1 = __importDefault(require("../controllers/columnControllers/getColumn"));
const newColumnsController_1 = __importDefault(require("../controllers/columnControllers/newColumnsController"));
const newSingleColumn_1 = __importDefault(require("../controllers/columnControllers/newSingleColumn"));
const updateColumn_1 = __importDefault(require("../controllers/columnControllers/updateColumn"));
const getTasks_1 = __importDefault(require("../controllers/taskControllers/getTasks"));
const apiRouter_02 = express_1.default.Router();
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
apiRouter_02.get("/columns/:id", getColumn_1.default, getTasks_1.default);
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
apiRouter_02.delete("/columns/:id", deleteColumn_1.default);
apiRouter_02.put("/columns/:id", updateColumn_1.default);
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
 *              $ref: '#/components/schemas/CreateColumnInput'
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
apiRouter_02.post("/columns", newSingleColumn_1.default, newColumnsController_1.default);
exports.default = apiRouter_02;
