import { Driver } from "../../interfaces/Driver";

declare global {
  namespace TaskDrive {
    export interface drivers {
      PuppeteerDriver: PuppeteerDriver;
    }
  }
}

export class PuppeteerDriver implements Driver {
  constructor(
    readonly options: {
      url: string;
    }
  ) { }

  run(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  stop(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
