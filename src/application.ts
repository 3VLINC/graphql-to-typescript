import * as chalk from 'chalk';
import { Command } from 'commander';

import { compileGraphql } from './compile-graphql';
import { CompileOptions } from './interfaces';
import { Commander } from './typings';

/**
 * Application Factory
 *
 * calling this factory will always generate new application instance (useful for testing)
 */
export function application(): Commander.Command {
  const application = new Command();

  application
    .arguments('<graphqlFileGlob> <outputFile>')
    .option('--skip-typedefs', 'skip writing typeDefs declaration to output files');

  return application;
}

/**
 * Action Handler
 *
 * @param graphqlFileGlob
 * @param outputFile
 * @param command
 */
export async function handler(graphqlFileGlob, outputFile, command) {
  try {
    const options = parseOptions(graphqlFileGlob, outputFile, command);
    await compileGraphql(options);

    // tslint:disable-next-line:no-console
    console.log(chalk.bold.green('Graphql output files compiled'));
  } catch (e) {
    console.error(chalk.bold.red(e));
  }
}

/**
 * Options Parser
 *
 * @param graphqlFileGlob
 * @param outputFile
 * @param command
 */
export function parseOptions(graphqlFileGlob, outputFile, command): CompileOptions {
  const options = {
    graphqlFileGlob,
    outputFile,
    skipTypeDefs: !!command.skipTypedefs
  } as CompileOptions;

  return options;
}
