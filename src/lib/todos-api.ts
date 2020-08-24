import { DataSource, DataSourceConfig } from 'apollo-datasource';

import todosTableClient, {
  TodosTableClient,
  UpdateTodoInput,
  AddTodoInput,
} from './todos-dynamo-client';
import { GraphContext } from '../gql/types';

/***
 * StoreHoursAPI is a DataSource for the StoreHoursTableClient
 */
export class TodosAPI extends DataSource {
  private db: TodosTableClient;
  private context: GraphContext;

  constructor(db: TodosTableClient) {
    super();
    this.db = db;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: DataSourceConfig<GraphContext>) {
    this.context = config.context;
  }

  getUserTodos = async () => {
    const { userName } = this.context;
    return this.db.getUserTodos(userName);
  };

  addUserTodo = async (input: AddTodoInput) => {
    const { userName } = this.context;
    return this.db.addUserTodo(userName, input);
  };

  updateUserTodo = async (input: UpdateTodoInput) => {
    const { userName } = this.context;
    return this.db.updateUserTodo(userName, input);
  };
}

export default new TodosAPI(todosTableClient);
