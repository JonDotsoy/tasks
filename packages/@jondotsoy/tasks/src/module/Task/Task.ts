import ow from 'ow';
import { titlePredicate } from '../../util/preditactes';
import util, { inspect } from 'util';
import chalk from 'chalk';

declare global {
  namespace TaskDrive {
    export interface drivers { }
  }
}

export const tasks: Task<any>[] = [];

type InterfaceToObject = { [T in keyof TaskDrive.drivers]: TaskDrive.drivers[T] };
type ValuesOf<T> = T extends { [T: string]: infer R } ? R : never;
type Drivers = ValuesOf<InterfaceToObject>;

export class Task<Driver extends Drivers = any> {
  constructor(
    readonly options: {
      title: string;
      driver: Driver;
    },
  ) {
    ow(options, 'options', ow.object.partialShape({
      title: titlePredicate,
    }));
  }

  readonly title = this.options.title;

  [util.inspect.custom](depth: number, options: util.InspectOptionsStylized) {
    const stylize = options.stylize;
    const stylizeSpecial = (v: string) => stylize(v, 'special');
    const stylizeUndefined = (v: string) => stylize(v, 'undefined');
    const stylizeString = (v: string) => stylize(v, 'string');

    const nameDriver = Object.getPrototypeOf(this.options.driver)?.constructor?.name ?? 'Driver';

    // @ts-ignore
    const inspectDriver = inspect(this.options?.driver?.options ?? {}, { ...options, depth: depth - 1 });

    const label = `${stylizeSpecial('Task')} ${stylizeUndefined('<')}${stylizeString(this.options.title)}, ${nameDriver} ${inspectDriver}${stylizeUndefined('>')}`;

    return `${label}`;
  }
}
