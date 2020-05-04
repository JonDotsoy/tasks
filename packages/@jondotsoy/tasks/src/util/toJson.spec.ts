import { Driver } from "../interfaces/Driver";
import { toJson, toFlow } from "./toJson";
import { Flow } from "../module/Flow/Flow";
import { Task } from "../module/Task/Task";
import { expect } from 'chai';
import util from 'util';

declare global {
  namespace TaskDrive {
    export interface drivers {
      Driver1: Driver1,
      Driver2: Driver2,
    }
  }
}

class Driver1 implements Driver {
  constructor(
    readonly options: {
      foo: 'bar'
    }
  ) { }
  run(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  stop(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

class Driver2 implements Driver {
  options: any;
  run(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  stop(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

describe('tojson(Flow|Task)', () => {
  it('tojson(Flow)', () => {

    const flow = new Flow({ title: 'flow1' })
      .pipe(new Task({ title: 'task1', driver: new Driver1({ foo: 'bar' }) }))
      .pipe(new Task({ title: 'task2', driver: new Driver2() }));

    console.log(util.inspect(flow, { depth: Infinity, colors: true }));

    const result = toJson(flow);

    expect(JSON.parse(result)).to.deep.equal({
      "$type": "Flow",
      "options": {
        "title": "flow1"
      },
      "tasksTitles": [
        "task1",
        "task2"
      ],
      "flow": [
        {
          "$type": "Task",
          "driver": "Driver1",
          "options": {
            "title": "task1"
          },
          "driverOptions": {
            "foo": "bar"
          }
        },
        {
          "$type": "Task",
          "driver": "Driver2",
          "options": {
            "title": "task2"
          }
        }
      ]
    });

  });

  it('toFlow(inp:string)', () => {
    const inp = JSON.stringify({
      "$type": "Flow",
      "options": {
        "title": "flow1"
      },
      "tasksTitles": [
        "task1",
        "task2"
      ],
      "flow": [
        {
          "$type": "Task",
          "driver": "Driver1",
          "options": {
            "title": "task1"
          },
          "driverOptions": {
            "foo": "bar"
          }
        },
        {
          "$type": "Task",
          "driver": "Driver2",
          "options": {
            "title": "task2"
          }
        }
      ]
    });

    const result = toFlow(inp, { Driver1: Driver1, Driver2: Driver2 });

    console.log(util.inspect(result, { depth: Infinity, colors: true }));

  });

});
