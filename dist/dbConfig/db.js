"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config/config"));
const pgpool = new pg_1.Pool({
    user: config_1.default.db.DBUSER,
    password: config_1.default.db.DBPASSWORD,
    host: config_1.default.db.DBHOST,
    port: config_1.default.db.DBPORT,
    database: config_1.default.db.DBDATABASE,
});
const query = (command, params) => pgpool.query(command, params);
exports.default = query;
