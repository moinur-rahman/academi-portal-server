import { DataSource } from "typeorm";
import entities from "./entities";

const postgres = new DataSource({
  type: "postgres",
  entities: entities,
  // logging: true,
  synchronize: true,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT),
});

export default postgres;
