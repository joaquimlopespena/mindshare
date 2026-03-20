import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { buildContext } from './graphql/context';
import { IdeaResolver } from './resolvers/idea.resolver';
import { CommentResolver } from './resolvers/comment.resolver';
import { VoteResolver } from './resolvers/vote.resolver';

async function bootstrap() {
  const app = express();
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver,
      CommentResolver,
      VoteResolver,
    ],
    validate: false,
    emitSchemaFile: './src/schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: '*', credentials: true }),
    express.json(),
    expressMiddleware(server, { context: buildContext })
  );

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
}

bootstrap();