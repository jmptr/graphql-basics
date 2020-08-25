# From REST to GraphQL

## REST, unlimited combinations of endpoints and methods

REST has served application developers for decades as the standard for HTTP-based client-server communications. The flexibility to implement nearly any API signature using a combination of routes, headers, and querystring parameters yields a problem commonly seen in many REST APIs: how does the consumer get what they want?

### Common REST patterns

- List all entities `GET /api/todos`
- Get one entity `GET /api/todos/1234`
- Add one entity `POST /api/todos`
- Update one entity `PUT /api/todos/1234`
- Delete one entity `DELETE /api/todos/1234`

This pattern works well for the simplest use-cases, but can rapidly fall apart as another domain is added. For example, look at how the endpoints might look for adding shopping items to `todo` from above:

- Add item to todo `POST or PUT /api/todos/1234/items`
- Remove item from todo `DELETE /api/todos/1234/items/5678`

While this convention might look normal, it has some interesting side-effects:

- How does one document these endpoints?
- How does one communication that new endpoints are available or old ones are deprecated?
- How does one ensure the integrity of data across all endpoints?
- How does one control the total number of http-requests required to perform an operation?

## Enter GraphQL

GraphQL endeavours to solve these issues by providing a single, self-documenting schema-first REST endpoint. This is accomplished by introducing a standard (the GraphQL query language itself) for communicating over HTTP, and implementing the Queries and Mutations present in the schema.

## GraphQL Schema and Language

A GraphQL Schema uses a JSON-like syntax to identify Queries and Mutations. These top-level entities return any object hierarchy the developer desires, as long as they terminate in one of GraphQL's scalar types (see: https://graphql.org/graphql-js/basic-types/)

GraphQL queries and mutations use the same REST technologies that are in use today. By communicating using standardized queries and mutations.

Instead of:

```
GET /api/todos
OUTPUTS:
 [
   { content: 'do the dishes', complete: false, createTime: 1234, updateTime: null }
 ]
```

A similar GraphQL request might look like this:

```
POST /query { query: {
    getMyTodos {
      content
      complete
    }
  }
}
OUTPUTS
{
  data: {
    getMyTodos: [
      { content: 'do the dishes', complete: false }
    ]
  }
}
```

## Implementating the Queries and Mutations

- Resolvers. These functions are used to return the values indicated by the Queries and Mutations in the schema.
- Data Sources. These are structures used by the Resolvers to

## 3rd Party Library Servers

These are some of the most popular 3rd party libraries for GraphQL servers. They each offer baseline GraphQL-compliant schema validation and interpretation. They even offer their own directives (or decorators) and plugins for caching.

- Apollo
- AWS AppSync
- Hasura

## Demo Todos Endpoint

Let's take a look at the todos endpoint.

## Q&A

My personal tips:

- Make sure each query and mutation takes a unique input _variable name_. This allows the consuming application to invoke multiple queries and mutations at the same time.
