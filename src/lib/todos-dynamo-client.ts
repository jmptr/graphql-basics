import { DynamoDB } from 'aws-sdk';

type DbAttributeMap = DynamoDB.DocumentClient.AttributeMap;

export interface TodoModel extends DbAttributeMap {
  userName: string;
  createTime: Number;
  updateTime?: Number;
  complete: Boolean;
  content: string;
}

export interface AddTodoInput {
  content: string;
  complete: Boolean;
}

export interface UpdateTodoInput {
  createTime: Number;
  content: string;
  complete: Boolean;
}

export class TodosTableClient {
  private tableName: string;
  private documentClient: DynamoDB.DocumentClient;

  constructor(
    documentClient = new DynamoDB.DocumentClient(),
    tableName = process.env.todosTable
  ) {
    this.documentClient = documentClient;
    this.tableName = tableName;
  }

  addUserTodo = async (userName: string, input: AddTodoInput) => {
    const newTodo: TodoModel = {
      complete: input.complete,
      content: input.content,
      createTime: Date.now(),
      userName,
    };
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: newTodo,
    };
    const response = await this.documentClient.put(params).promise();
    return newTodo;
  };

  updateUserTodo = async (userName: string, input: UpdateTodoInput) => {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { userName, createTime: input.createTime },
      UpdateExpression: `set #content = :content, #complete = :complete, #updateTime = :updateTime`,
      ExpressionAttributeNames: {
        '#content': 'content',
        '#complete': 'complete',
        '#updateTime': 'updateTime',
      },
      ExpressionAttributeValues: {
        ':content': input.content,
        ':complete': input.complete,
        ':updateTime': Date.now(),
      },
    };
    await this.documentClient.update(params).promise();
  };

  getUserTodos = async (userName: string): Promise<TodoModel[] | null> => {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'userName',
      },
      ExpressionAttributeValues: {
        ':pk': userName,
      },
    };

    const response = await this.documentClient.scan(params).promise();

    return response.Items ? (response.Items as TodoModel[]) : null;
  };
}

export default new TodosTableClient();
