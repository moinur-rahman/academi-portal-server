import { buildSchema } from "type-graphql";

import StudentResolver from "./student";
import TeacherResolver from "./teacher";
import PostResolver from "./post";

const createSchema = async () => {
  const schema = await buildSchema({
    resolvers: [
      StudentResolver,
      TeacherResolver,
      PostResolver,
    ],
  });

  return schema;
};

export default createSchema;
