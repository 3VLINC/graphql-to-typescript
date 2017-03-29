# GraphQL To Typescript

Takes a glob of GraphQL files and writes a typescript module that exports the graphql type definitions as a string array and converts the graphql types to interfaces.


```
Usage: graphql-to-typescript \[options\] \<graphqlFileGlob\> \<outputFile\>

  Options:

    -h, --help  output usage information
```

Converts graphql files such as:

```
schema {
  query: RootQuery
}
type RootQuery {
  user(id: Int!): User
}
type User {
  id: Int!
  name: String
}

```

Into the typescript file:

```
export const typeDefs = ["schema {\n  query: RootQuery\n}\ntype RootQuery {\n  user(id: Int!): User\n}\ntype User {\n  id: Int!\n  name: String\n}\n"];

export interface RootQuery {
  user: User | null;
}

export interface UserRootQueryArgs {
  id: number;
}

export interface User {
  id: number;
  name: string | null;
}

```

This allows you to import the interfaces and the schema elsewhere in your typescript project and use them in your resolvers.