import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "adrian",
    host: "localhost",
    port: 5432,
    database: "simpleblog"
});

export default pool;
