import { Command as CommanderCommand } from 'commander';

declare namespace Commander {
  export class Command extends CommanderCommand {}
}
