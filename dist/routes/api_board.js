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
const getAllColumns_1 = __importDefault(require("../controllers/columnControllers/getAllColumns"));
const showAllBoardController_1 = __importDefault(require("../controllers/boardsControllers/showAllBoardController"));
const getAllData_1 = __importDefault(require("../controllers/boardsControllers/getAllData"));
const updateBulkColumns_1 = __importDefault(require("../controllers/columnControllers/updateBulkColumns"));
const apiRouter_01 = express_1.default.Router();
apiRouter_01.get("/boards", getAllData_1.default);
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
 *              $ref: '#/components/schemas/CreateBoardInput'
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
apiRouter_01.post("/boards", newBoardController_1.default, newColumnsController_1.default);
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
apiRouter_01.get("/boards/:id", showBoardController_1.default, getAllColumns_1.default);
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
apiRouter_01.delete("/boards/:id", deleteBoard_1.default);
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
 *              $ref: '#/components/schemas/UpdateBoardInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Board not found
 *
 *
 */
apiRouter_01.put("/boards/:id", updateBoards_1.default, updateBulkColumns_1.default);
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
apiRouter_01.get("/boards", showAllBoardController_1.default);
exports.default = apiRouter_01;
