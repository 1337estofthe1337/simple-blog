import pg from "pg";
const { Pool } = pg;
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.PGDATABASE_URL
});

export default pool;
