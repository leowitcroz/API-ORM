import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "api",
    migrations: [`${__dirname}/migrations/**/*.ts` ]
})

export default dataSource