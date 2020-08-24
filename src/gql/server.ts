import { ApolloServer } from 'apollo-server-lambda';
import resolvers from './resolvers';
import typeDefs from './schema';
import context from './context';
import dataSources from './data-sources';
import plugins from './plugins';

/**
 * Set up ApolloServer
 * See: https://www.apollographql.com/docs/apollo-server/
 */
export default new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/dev/playground',
    tabs: [
      {
        endpoint: '/dev/query',
        query: `{
  getMyTodos {
    content
    complete
  }
}`,
      },
      {
        endpoint: '/dev/query',
        query: `mutation addTodo($addTodoInput: AddTodoInput!) {
  addTodo(addTodoInput: $addTodoInput)
}`,
        variables: `{
  "addTodoInput": {
    "content": "do the dishes",
    "complete": false
  }
}`,
      },
      {
        endpoint: '/dev/query',
        query: `mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
  updateTodo(updateTodoInput: $updateTodoInput)
}`,
        variables: `{
  "updateTodoInput": {
    "updateTime": 1598309316377,
    "content": "do the dishes",
    "complete": false
  }
}`,
      },
    ],
  },
  dataSources,
  context,
  plugins,
});
