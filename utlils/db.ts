import {createPool} from "mysql2/promise";
import {config} from "../config/config";

export const pool = createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    namedPlaceholders: true,
    decimalNumbers: true,
});