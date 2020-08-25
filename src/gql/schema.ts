import { gql } from 'apollo-server-lambda';

export default gql`
  type Query {
    """
    Returns what we know about the currently logged in user
    """
    getMyTodos: [TodoModel!]!
  }

  type Mutation {
    """
    Add a todo
    """
    addTodo(addTodoInput: AddTodoInput!): Boolean!
    """
    Update a todo
    """
    updateTodo(updateTodoInput: UpdateTodoInput!): Boolean!
  }

  type TodoModel {
    createTime: Float!
    updateTime: Float
    content: String!
    complete: Boolean!
  }

  input AddTodoInput {
    content: String!
    complete: Boolean!
  }

  input UpdateTodoInput {
    createTime: Float!
    content: String!
    complete: Boolean!
  }
`;
