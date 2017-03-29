export const schema = ["schema {\n  query: RootQuery\n}\ntype RootQuery {\n  user(id: Int!): User\n}\ntype User {\n  id: Int!\n  name: String\n}\n"];

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
