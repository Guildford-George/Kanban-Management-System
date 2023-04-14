CREATE DATABASE kanban

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);


CREATE TABLE columns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    board_id INTEGER REFERENCES boards(id)
);


CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(200),
    status VARCHAR(100),
    column_id INTEGER REFERENCES columns(id)
);


CREATE TABLE subtasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    is_completed BOOLEAN,
    task_id INTEGER REFERENCES tasks(id)
);
