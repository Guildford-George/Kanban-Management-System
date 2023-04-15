"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatAllData = (boards, columns, tasks, subtasks) => {
    let ret = [];
    boards.forEach((currentBoard) => {
        let board = Object.assign(Object.assign({}, currentBoard), { columns: [] });
        columns.forEach((currentColumn) => {
            if (currentBoard.boardid == currentColumn.board_id) {
                let column = {
                    columnid: currentColumn.columnid,
                    name: currentColumn.name,
                    tasks: []
                };
                tasks.forEach((currentTask) => {
                    if (currentColumn.columnid == currentTask.column_id) {
                        let task = {
                            taskid: currentTask.taskid,
                            title: currentTask.title,
                            description: typeof currentTask.description == null ? "" : currentTask.description,
                            status: currentTask.status,
                            subtasks: []
                        };
                        subtasks.forEach((currentSubtask) => {
                            if (currentTask.taskid == currentSubtask.task_id) {
                                const subtask = {
                                    subtaskid: currentSubtask.subtaskid,
                                    title: currentSubtask.title,
                                    is_completed: currentSubtask.is_completed
                                };
                                task.subtasks.push(subtask);
                            }
                        });
                        column.tasks.push(task);
                    }
                });
                board.columns.push(column);
            }
        });
        ret.push(board);
    });
    console.log("ret: ", ret);
    return ret;
};
exports.default = formatAllData;
