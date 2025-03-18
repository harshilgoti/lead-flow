"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
require("dotenv/config");
var node_postgres_1 = require("drizzle-orm/node-postgres");
var pg_1 = require("pg");
var schema = require("@/app/db/schema");
exports.pool = new pg_1.Pool({
    connectionString: process.env.DB,
});
exports.db = (0, node_postgres_1.drizzle)(exports.pool, { schema: schema });
