import * as fs from 'fs';
import * as glob from 'glob';
import { graphql, introspectionQuery } from 'graphql';
import { Transform, TransformedOptions, getTemplateGenerator } from 'graphql-code-generator';
import { makeExecutableSchema } from 'graphql-tools';

import { CompileOptions } from './interfaces';

export const compileGraphql = async (options: CompileOptions) => {

  return new Promise((resolve, reject) => {

    glob(options.graphqlFileGlob, {}, async (er, files) => {

      try {

        const output = [];
        const typeDefs = [];

        for (let file of files) {

          typeDefs.push(fs.readFileSync(file, 'utf8'));

        }

        if (typeDefs.length === 0) {

          throw new Error(`No type definitions were found matching: ${options.graphqlFileGlob}`);

        }

        output.push(`export const typeDefs = ${JSON.stringify(typeDefs)};`);

        const schema = makeExecutableSchema({ typeDefs });

        const [introspectionResult, template] = await Promise.all(
          [
            graphql(schema, introspectionQuery),
            getTemplateGenerator('typescript'),
          ]
        );

        const introspection = introspectionResult.data;

        const transformOptions = {
          introspection,
          documents: [],
          template: template,
          outPath: './',
          isDev: false,
          noSchema: false,
          noDocuments: true,
        } as TransformedOptions;

        const outFiles = await Transform(transformOptions);

        for (let file of outFiles) {

          output.push(file.content);

        }

        fs.writeFileSync(options.outputFile, output.join('\n'));

        resolve();

      } catch (e) {

        reject(e);

      }

    });

  });

}