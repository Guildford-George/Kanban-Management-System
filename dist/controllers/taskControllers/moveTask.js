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
const db_1 = __importDefault(require("../../dbConfig/db"));
const moveTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { destination, source } = req.body;
    const destinationIndex = destination.index;
    const sourceIndex = source.index;
    const destinationColumn = destination.columnid;
    const sourceColumn = source.columnid;
    try {
        const destinationDetail = yield (0, db_1.default)('SELECT * FROM columns WHERE id= $1', [destinationColumn]);
        const foundTask = yield (0, db_1.default)('SELECT title FROM tasks WHERE id= $1', [taskId]);
        if (foundTask.rows.length == 0) {
            return res.status(400).json({ status: "error", message: "Task does not exist" });
        }
        if (destinationColumn == sourceColumn && destinationIndex === sourceIndex) {
            // source
            yield (0, db_1.default)('UPDATE tasks SET order_location=order_location-1 WHERE column_id=$1 AND order_location>$2 AND order_location<=$3', [sourceColumn, sourceIndex, destinationIndex]);
            // destination
            yield (0, db_1.default)('UPDATE tasks SET order_location= $1 WHERE id= $2', [destinationIndex, taskId]);
            return res.status(200).json({ status: "success" });
        }
        else if (destinationColumn !== sourceColumn) {
            yield (0, db_1.default)('UPDATE tasks SET order_location=order_location-1 WHERE column_id=$1 AND order_location>$2', [sourceColumn, sourceIndex]);
            yield (0, db_1.default)('UPDATE tasks SET order_location=order_location+1 WHERE column_id=$1 AND order_location>=$2', [destinationColumn, destinationIndex]);
            yield (0, db_1.default)('UPDATE tasks SET order_location= $1, column_id=$2, status=$3 WHERE id= $4', [destinationIndex, destinationColumn, destinationDetail.rows[0].name, taskId]);
            return res.status(200).json({ status: "success" });
        }
        res.status(400).json({ status: "error", message: "message" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "There was error trying to move task" });
    }
});
exports.default = moveTask;
