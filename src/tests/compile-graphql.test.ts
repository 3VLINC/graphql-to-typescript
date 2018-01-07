import { expect } from 'chai';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

import { compileGraphql } from '../compile-graphql';
import { CompileOptions } from '../interfaces';

describe('Compiler', () => {
  const graphqlFileGlob = './src/tests/graphql/**/*.graphql';
  const falsyGraphqlFileGlob = './somewhere/else/**/*.graphql';
  const outputFile = './tmp/type-defs.ts';
  const outputFolder = './tmp';

  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      rimraf(outputFolder, {}, () => {
        fs.mkdirSync(outputFolder);
        resolve();
      });
    });
  });

  it('should compile the graphql file into a typescript file with the correct exports', async () => {
    const options = { outputFile, graphqlFileGlob } as CompileOptions;

    await compileGraphql(options);
    const files = await fs.readdirSync(outputFolder);
    const tsSchema = fs.readFileSync(options.outputFile, 'utf8');

    expect(files.length).to.eql(1);
    expect(tsSchema.indexOf('export interface RootQuery')).to.not.eql(-1);
    expect(tsSchema.indexOf('export interface User')).to.not.eql(-1);
    expect(tsSchema.indexOf('export interface UserRootQueryArgs')).to.not.eql(-1);
    expect(tsSchema.indexOf('export const typeDefs')).to.not.eql(-1);
  });

  it('should throw an exception when no type definitions found in input file', () => {
    const options = { outputFile, graphqlFileGlob: falsyGraphqlFileGlob } as CompileOptions;

    return compileGraphql(options)
      .then(() => {
        throw new Error('compileGraphql call not supposed to be success');
      })
      .catch((error: Error) => {
        expect(error.message).to.contains('No type definitions were found matching');
      });
  });

  it('should skip typeDefs declaration when skipTypeDefs is true', async () => {
    const options = { outputFile, graphqlFileGlob, skipTypeDefs: true } as CompileOptions;

    await compileGraphql(options);
    const files = await fs.readdirSync(outputFolder);
    const tsSchema = fs.readFileSync(options.outputFile, 'utf8');

    expect(files.length).to.eql(1);
    expect(tsSchema).to.not.contains('export const typeDefs = ');
  });
});
