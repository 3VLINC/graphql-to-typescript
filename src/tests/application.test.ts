import { expect } from 'chai';

import { parseOptions } from '../application';
import { mockApp, mockArgs } from './helpers';

describe('Application - OptionParser', () => {
  let parsedOptions;
  const graphqlFileGlob = './src/tests/graphql/**/*.graphql';
  const outputFile = './tmp/type-defs.ts';
  const appMock = mockApp((arg1, arg2, cmd) => {
    parsedOptions = parseOptions(arg1, arg2, cmd);
  });

  // reset parsedOptions before each test
  beforeEach(() => {
    parsedOptions = {};
  });

  it('should produce correct CompileOptions object when omit all optional options', () => {
    const args = mockArgs([graphqlFileGlob, outputFile]);
    const expectedOptions = { graphqlFileGlob, outputFile, skipTypeDefs: false };

    appMock.parse(args);

    expect(parsedOptions).to.eqls(expectedOptions);
  });

  it('should recognize --skip-typedefs options', () => {
    const args = mockArgs([graphqlFileGlob, outputFile, '--skip-typedefs']);
    const expectedOptions = { graphqlFileGlob, outputFile, skipTypeDefs: true };

    appMock.parse(args);

    expect(parsedOptions).to.eqls(expectedOptions);
  });
});
