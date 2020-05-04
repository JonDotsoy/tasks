import { Driver } from "../../interfaces/Driver";
import util from "util";
import { Flow } from "./Flow";
import { Task } from "../Task/Task";

const D = class implements Driver {
  options = { a: 3 };
  async run() { }
  async stop() { }
}

describe('Flow', () => {
  it('Print custom inspect', () => {
    const task = new Task({
      title: 'task1',
      driver: new D(),
    });

    const flow = new Flow({
      title: 'flow'
    }).pipe(task);

    console.log(util.inspect(flow, { colors: true, depth: Infinity }));
  });
});
