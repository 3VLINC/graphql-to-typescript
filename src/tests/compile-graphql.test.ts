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
    const tsFile = './src/tests/output/schema.ts';

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
        defSchema: definitionFile,
        jsonSchema: schemaFile,
        tsSchema: tsFile,
        dir: glob
      } as CompileOptions;

      await compileGraphql(options);

      const files = await fs.readdirSync(out);

      expect(files.length).to.eql(3);

    });

  }
);