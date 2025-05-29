import pkg from "pg";
import dotenv from "dotenv";

const { Pool }=pkg;
dotenv.config();


export const pool=new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:process.env.NODE_ENV === 'production' ? {rejectUnauthorized:false} : false,//during deployment(production or developmetn)
});
