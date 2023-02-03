import { buildSchema } from "type-graphql";

import UserResolver from "./user";

const createSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  return schema;
};

export default createSchema;
