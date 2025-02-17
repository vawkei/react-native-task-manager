import { DataSource } from "typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies"
import { UserEntity } from "../entities/user-entity";
import { TaskEntity } from "../entities/task-entity";

export const AppDataSource = new DataSource({
    type:"mysql",
    database: process.env.MYSQL_DBNAME,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT) || 3306,
    namingStrategy: new SnakeNamingStrategy(),
    entities:[UserEntity,TaskEntity],
    logging:false,
    synchronize:false,
    entitySkipConstructor:true
}) 