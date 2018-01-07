import { application } from '../application';
import { Commander } from '../typings';

/**
 * mock new app instance with a given action handler
 *
 * @param handler action handler
 */
export function mockApp(handler): Commander.Command {
  return application().action(handler);
}

/**
 * commander always start reading process arguments from index of 2
 * so, we need to mock it here to make test preparation a little cleaner
 *
 * @param args arguments to be mocked
 */
export function mockArgs(args: string[]) {
  return ['', '', ...args];
}
