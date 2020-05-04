import { Task } from "./Task";
import { Driver } from "../../interfaces/Driver";
import util from "util";

const D = class implements Driver {
  options = { a: 3 };
  async run() { }
  async stop() { }
}

describe('Task', () => {
  it('Print custom inspect', () => {
    const t = new Task({
      title: 'task1',
      driver: new D(),
    });

    console.log(util.inspect(t, { colors: true, depth: Infinity }));
  });
});
