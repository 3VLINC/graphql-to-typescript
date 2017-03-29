import { compileGraphql } from '../compile-graphql';
import { expect } from 'chai';
import * as rimraf from 'rimraf';
import * as fs from 'fs';
import * as path from 'path';
import { CompileOptions } from '../interfaces';

describe('Compiler', () => {

    const glob = './src/tests/graphql/**/*.graphql';
    const out = "./src/tests/output/";
    const schemaFile = './src/tests/output/schema.json';
    const definitionFile = './src/tests/output/schema.d.ts';

    beforeEach(async () => {
      
      await new Promise(
        (resolve, reject) => {
          rimraf(out, {}, () => {
            
            fs.mkdirSync(out);

            resolve();

          });
      });

    });

    it('should compile the graphql file into a type definition file', async () => {

      const options = {
        definition: definitionFile,
        schema: schemaFile,
        dir: glob
      } as CompileOptions;

      await compileGraphql(options);

      const files = await fs.readdirSync(out);

      expect(files.length).to.eql(2);

      const graphqlTypingsContent = fs.readFileSync(options.definition, 'utf8');
      const schemaObj = JSON.parse(fs.readFileSync(options.schema, 'utf8'));

      expect(graphqlTypingsContent).to.eql(`
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
`     );
  
    expect(schemaObj.__schema.queryType.name).to.eql('RootQuery');


    });

  }
);