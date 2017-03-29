import { compileGraphql } from '../compile-graphql';
import { expect } from 'chai';
import * as rimraf from 'rimraf';
import * as fs from 'fs';
import { CompileOptions } from '../interfaces';

describe('Compiler', () => {

    const graphqlFileGlob = './src/tests/graphql/**/*.graphql';
    const outputFile = './../../output/type-defs.ts';
    const outputFolder = './../../output';

    beforeEach(async () => {

      await new Promise(
        (resolve, reject) => {
          rimraf(outputFolder, {}, () => {

            fs.mkdirSync(outputFolder);

            resolve();

          });
      });

    });

    it('should compile the graphql file into a typescript file with the correct exports', async () => {

      const options = {
        outputFile,
        graphqlFileGlob
      } as CompileOptions;

      await compileGraphql(options);

      const files = await fs.readdirSync(outputFolder);

      const tsSchema = fs.readFileSync(options.outputFile, 'utf8');

      expect(files.length).to.eql(1);
      expect(tsSchema.indexOf('export interface RootQuery')).to.not.eql(-1);
      expect(tsSchema.indexOf('export interface User')).to.not.eql(-1);
      expect(tsSchema.indexOf('export interface UserRootQueryArgs')).to.not.eql(-1);
      expect(tsSchema.indexOf('export const typeDefs')).to.not.eql(-1);

    });

  }
);
