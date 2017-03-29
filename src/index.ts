#! /usr/bin/env node
import * as chalk from 'chalk';
import * as commander from 'commander';
import { CompileOptions } from './interfaces';
import { compileGraphql } from './compile-graphql';

commander
  .arguments('<graphqlFileGlob> <outputFile>')
  .action(async (graphqlFileGlob, outputFile) => {

    try {

      const options = {
        graphqlFileGlob,
        outputFile
      } as CompileOptions;
      
      await compileGraphql(options);

      console.info(chalk.bold.green('Graphql output files compiled'));

    } catch ( e ) {

      console.error(chalk.bold.red(e));

    }

  })
  .parse(process.argv);

  export { CompileOptions, compileGraphql };