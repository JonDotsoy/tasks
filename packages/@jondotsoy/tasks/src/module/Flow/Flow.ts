import { Task } from "../Task/Task";
import ow from 'ow';
import util, { inspect, isArray } from 'util';
import { titlePredicate } from "../../util/preditactes";
import chalk from "chalk";
import { EOL } from "os";

export type Item = Task | Flow;

export class Flow {
  constructor(readonly options: {
    title: string;
  }) {
    ow(options, 'options', ow.object.partialShape({
      title: titlePredicate,
    }));
  }

  readonly tasks = new Map<string, Task>();
  readonly flow: Item[] = [];

  private addedItem(item: Item) {
    if (item instanceof Task) {
      // ow(item, 'tasks', ow.object.partialShape({
      //   title: ow.string.validate(title => this.tasks.has(title)
      //     ? {
      //       message: `Title ${JSON.stringify(title)} already used`,
      //       validator: false,
      //     }
      //     : {
      //       message: '',
      //       validator: true,
      //     }
      //   ),
      // }));

      this.tasks.set(item.title, item);
    }

    this.flow.push(item);

    return this;
  }

  pipe(...items: Item[]) {
    items.forEach(item => this.addedItem(item));

    return this;
  }

  [util.inspect.custom](depth: number, options: util.InspectOptionsStylized, a: any) {
    const stylize = options.stylize;
    const stylizeSpecial = (v: string) => stylize(v, 'special');
    const stylizeUndefined = (v: string) => stylize(v, 'undefined');
    const stylizeString = (v: string) => stylize(v, 'string');

    const label = `${stylizeSpecial('Flow')} ${stylizeUndefined('<')}${stylizeString(this.options.title)}${stylizeUndefined('>')}`;

    if (depth < 0 || depth - 1 === -1) {
      return `${label} [...]`;
    }

    if (!this.flow.length) {
      return `${label}`;
    }

    return `${label} ${inspect(this.flow, { ...options, depth: depth - 1 })}`;
  }
}
