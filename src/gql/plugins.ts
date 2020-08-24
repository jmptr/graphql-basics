import responseCachePlugin from 'apollo-server-plugin-response-cache';

/**
 * responseCachePlugin is used to give the cache key generator a hint to use
 * as the cache key for this particular use.
 */
const cachePlugin = responseCachePlugin({
  sessionId: (requestContext) => {
    console.log(
      'cache plugin, create sessionId [requestContext.context]',
      requestContext.context
    );
    const hint = requestContext.context.userName;
    return hint;
  },
});

export default [cachePlugin];
