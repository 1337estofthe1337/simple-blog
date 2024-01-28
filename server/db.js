import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const host = process.env.PGHOST;
const port = process.env.PGPORT;
const database = process.env.PGDATABASE;

const pool = new Pool({
    user: "adrian",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "simpleblog"
});

export default pool;
