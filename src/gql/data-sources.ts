import { DataSources } from 'apollo-server-core/src/graphqlOptions';
import todosAPI from '../lib/todos-api';

/**
 * Creates the datasources used by the resolvers to fulfill queries and mutations
 */
export default (): DataSources<{}> => {
  console.log('create data sources');
  return {
    todosAPI,
  };
};
