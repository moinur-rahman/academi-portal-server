import {DataSource} from 'typeorm'
import entities from './entities';


const postgres = new DataSource({
  type: "postgres",
  database: "academi-portal",
  entities: entities,
  // logging: true,
  synchronize: true,
  username: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
});

export default postgres