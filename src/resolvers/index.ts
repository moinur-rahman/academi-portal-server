import { buildSchema } from "type-graphql";

import StudentResolver from "./student";
import TeacherResolver from "./teacher";

const createSchema = async () => {
  const schema = await buildSchema({
    resolvers: [StudentResolver, TeacherResolver],
  });

  return schema;
};

export default createSchema;
