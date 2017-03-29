#! /usr/bin/env node
import * as chalk from 'chalk';
import * as commander from 'commander';
import { CompileOptions } from './interfaces';
import { compileGraphql } from './compile-graphql';

commander
  .arguments('<dir>')
  .option('-d, --def <def>', 'File to export the graphql typescript definition to','./schema.d.ts')
  .option('-j --json <json>', 'File to export the introspection json schema to', './schema.json')
  .option('-t --ts <typescript>', 'File to export the graphql typescript module to', './schema.ts')
  .action(async (dir) => {

    try {
      
      const options = {
        dir,
        defSchema: commander.def,
        jsonSchema: commander.json,
        tsSchema: commander.ts
      } as CompileOptions;
      
      await compileGraphql(options);

      console.info(chalk.bold.green('Graphql output files compiled'));

    } catch ( e ) {

      console.error(chalk.bold.red(e));

    }

  })
  .parse(process.argv);

  export { CompileOptions, compileGraphql };