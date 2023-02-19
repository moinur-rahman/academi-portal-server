import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import "reflect-metadata";
import createSchema from "./resolvers";
import postgres from "./db/postgres";

const server = async () => {
  try {
    await postgres.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.log("Error during Data Source initialization ", error);
  }

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  const app: Express = express();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  const port = process.env.PORT;
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

server().catch((error) => console.log(error));
