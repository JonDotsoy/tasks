declare global {
  namespace TaskDrive {
    export interface drivers {
    }
  }
}

export interface Driver {
  readonly options: any;
  run(): Promise<any>;
  stop(): Promise<any>;
}
