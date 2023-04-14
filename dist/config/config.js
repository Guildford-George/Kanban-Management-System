"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stage = process.env.NODE_ENV;
const development = {
    server: {
        PORT: Number(process.env.PORT),
    },
    db: {
        DBDATABASE: process.env.DEV_DBDATABASE,
        DBUSER: process.env.DEV_DBUSER,
        DBPASSWORD: process.env.DEV_DBPASSWORD,
        DBPORT: Number(process.env.DEV_DBPORT),
        DBHOST: process.env.DEV_DBHOST
    }
};
const production = {
    server: {
        PORT: Number(process.env.PORT),
    },
    db: {
        DBDATABASE: process.env.PGDATABASE,
        DBUSER: process.env.PGUSER,
        DBPASSWORD: process.env.PGPASSWORD,
        DBPORT: Number(process.env.PGPORT),
        DBHOST: process.env.PGHOST
    }
};
const config = {
    development,
    production
};
exports.default = config[stage];
