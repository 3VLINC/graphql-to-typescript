#!/usr/bin/env node
import { application, handler } from './application';
import { compileGraphql } from './compile-graphql';
import { CompileOptions } from './interfaces';

const app = application();

app.action(handler).parse(process.argv);

if (!app.args.length) {
  app.help();
}

export { CompileOptions, compileGraphql };
