import { Flow, Item } from "../module/Flow/Flow";
import { Task } from "../module/Task/Task";
import { Driver } from "../interfaces/Driver";

export const toJson = (flow: Flow | Task, space?: string | number) => {
  const replacer = function (this: any, key: string, value: any) {
    if (value instanceof Flow) {
      return {
        $type: 'Flow',
        options: value.options,
        tasksTitles: Array.from(value.tasks.keys()),
        flow: value.flow,
      }
    }

    if (value instanceof Task) {
      const { driver, ...options } = value.options;

      return {
        $type: 'Task',
        driver: Object.getPrototypeOf(driver)?.constructor?.name,
        options: options,
        driverOptions: driver?.options,
      }
    }

    return value;
  }

  return JSON.stringify(flow, replacer, space);
}

export const toFlow = (inp: string, driversMap?: { [driver: string]: { new(options: any): Driver } }) => {
  const drivers = new Map(Object.entries(driversMap ?? {}));

  const reviver = function (this: any, key: string, value: any) {
    if (value.$type === 'Task') {
      const D = drivers.get(value.driver);

      if (!D) throw new Error(`Driver ${value.driver} not found.`);

      return new Task({
        ...value.options,
        driver: new D(value.driverOptions),
      });
    }

    if (value.$type === 'Flow') {
      const flow = new Flow(value.options);
      value.flow.forEach((item: Item) => flow.pipe(item));
      return flow;
    }

    return value;
  };

  return JSON.parse(inp, reviver);
}
