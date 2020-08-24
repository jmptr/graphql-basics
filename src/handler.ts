import gqlServer from './gql/server';

/**
 * GraphQL handler
 */
export const query = gqlServer.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
