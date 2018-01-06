#!/usr/bin/env node
import * as chalk from 'chalk';
import * as commander from 'commander';

import { compileGraphql } from './compile-graphql';
import { CompileOptions } from './interfaces';

commander
  .arguments('<graphqlFileGlob> <outputFile>')
  .action(async (graphqlFileGlob, outputFile) => {
    try {
      const options = { graphqlFileGlob, outputFile } as CompileOptions;

      await compileGraphql(options);

      // tslint:disable-next-line:no-console
      console.info(chalk.bold.green('Graphql output files compiled'));
    } catch (e) {
      console.error(chalk.bold.red(e));
    }
  })
  .parse(process.argv);

export { CompileOptions, compileGraphql };
