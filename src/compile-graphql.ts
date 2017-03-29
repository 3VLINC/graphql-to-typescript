import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { graphql, introspectionQuery } from 'graphql';
import { FileResult, Transform, TransformedOptions, getTemplateGenerator } from 'graphql-code-generator';
import { makeExecutableSchema } from 'graphql-tools';

import { CompileOptions } from './interfaces';

export const compileGraphql = async (options: CompileOptions) => {

  return new Promise((resolve, reject) => {

    glob(options.dir, {}, async (er, files ) => {

      const typeDefs = [];

      for(let file of files) {

        typeDefs.push(fs.readFileSync(file, 'utf8'));

      }
      
      const schema = makeExecutableSchema({ typeDefs });

      const [introspectionResult, template] = await Promise.all(
        [
          graphql(schema, introspectionQuery),
          getTemplateGenerator('typescript'),
        ]
      );

      const introspection = introspectionResult.data;
      
      fs.writeFileSync(options.schema, JSON.stringify(introspection) );

      const transformOptions = {
        introspection,
        documents: [],
        template: template,
        outPath: options.definition,
        isDev: false,
        noSchema: false,
        noDocuments: true,
      } as TransformedOptions; 

      const outFiles = await Transform(transformOptions);

      for(let file of outFiles) {
        
        fs.writeFileSync(file.path, file.content);

      }

      resolve(files);

    });

  });
  
}