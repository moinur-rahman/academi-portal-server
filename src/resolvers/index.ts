import { buildSchema } from "type-graphql";

import StudentResolver from "./student";
import TeacherResolver from "./teacher";
import PostResolver from "./post";
import MeetingResolver from "./meeting";

const createSchema = async () => {
  const schema = await buildSchema({
    resolvers: [
      StudentResolver,
      TeacherResolver,
      PostResolver,
      MeetingResolver,
    ],
  });

  return schema;
};

export default createSchema;
