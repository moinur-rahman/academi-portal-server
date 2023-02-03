import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import cors from "cors";
import { json } from "body-parser";
import "reflect-metadata";
import createSchema from "./resolvers";
import postgres from "./db/postgres";

const server = async () => {
  try {
    postgres.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.log("Error during Data Source initialization ", error);
  }
  
  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();

  const app: Express = express();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer)
  );


  const port = process.env.PORT;
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

server().catch((error) => console.log(error));
