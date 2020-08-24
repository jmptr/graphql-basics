import { ContextFunction } from 'apollo-server-core';
import { APIGatewayProxyEventBase } from 'aws-lambda';
import { GraphContext } from './types';

/**
 * ApolloLambdaRequestContext is the wrapper for the APIGateway Event object,
 * which contains the IdTokenContext and the LambdaContext
 */
interface ApolloLambdaRequestContext {
  event: APIGatewayProxyEventBase<{}>;
  context: ApolloLambdaContext;
}

/**
 * ApolloLambdaContext is the context that comes from the AWS Lambda invocation.
 * This is useful for getting the awsRequestId in order to track events into each
 * level of the application.
 */
interface ApolloLambdaContext {
  awsRequestId: string;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
}

/**
 * Returns an object to be attached to the context passed to each data source.
 *
 * @param apolloLambdaContext HandlerRequestContext that includes the event.requestContext
 */
const context: ContextFunction<
  ApolloLambdaRequestContext,
  GraphContext
> = async (apolloLambdaContext): Promise<GraphContext> => {
  console.info(
    'create context [apolloLambdaContext.context]',
    apolloLambdaContext.context
  );
  const {
    context: { awsRequestId },
  } = apolloLambdaContext;

  // adding the awsRequestId to the context can make it easier to track user
  // activity down to an actual requestId
  return {
    awsRequestId,
    userName: 'Bobby',
  };
};

export default context;
