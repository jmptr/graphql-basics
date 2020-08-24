import { IResolvers } from 'graphql-tools';
import {
  TodoModel,
  UpdateTodoInput,
  AddTodoInput,
} from '../lib/todos-dynamo-client';
import { TodosAPI } from '../lib/todos-api';
import context from './context';

interface ResolverContext {
  awsRequestId: string;
  userName: string;
  dataSources: {
    todosAPI: TodosAPI;
  };
}

interface Resolver<TArgs, TOut> {
  (_: unknown, args: TArgs, ctx: ResolverContext): Promise<TOut>;
}

const getMyTodos: Resolver<{}, TodoModel[]> = async (parent, args, ctx) => {
  console.log('getMyTodos');
  return ctx.dataSources.todosAPI.getUserTodos();
};

const updateTodo: Resolver<{ input: UpdateTodoInput }, Boolean> = async (
  parent,
  args,
  ctx
) => {
  console.log('updateTodo', args.input);
  await ctx.dataSources.todosAPI.updateUserTodo(args.input);
  return true;
};

const addTodo: Resolver<{ addTodoInput: AddTodoInput }, Boolean> = async (
  parent,
  args,
  ctx
) => {
  console.log('addUserTodo', args);
  const result = await ctx.dataSources.todosAPI.addUserTodo(args.addTodoInput);
  return !!result;
};

/**
 * Resolvers are how the graphql server _resolves_ a query by delegating it to
 * any number of data sources.
 */
const resolvers: IResolvers = {
  Query: {
    getMyTodos,
  },
  Mutation: {
    addTodo,
    updateTodo,
  },
};

export default resolvers;
