import * as commander from 'commander';
import { CompileOptions } from './interfaces';
import { compileGraphql } from './compile-graphql';

commander
  .arguments('<dir>')
  .option('-d, --definition <definition>', 'File to save the typescript definition')
  .option('-s --schema <schema>', 'File to save the introspection schema')
  .action(async (dir) => {

    const options = {
      dir: commander.dir,
      definition: commander.definition,
      schema: commander.schema
    } as CompileOptions;

    await compileGraphql(options);

  })
  .parse(process.argv);

  export { CompileOptions, compileGraphql };