declare module 'sqlite3' {
  export class Database {
    constructor(filename: string);
    serialize(callback: () => void): void;
    run(sql: string, params?: any[], callback?: (err: Error | null) => void): this;
    get(sql: string, params?: any[], callback?: (err: Error | null, row: any) => void): this;
    prepare(sql: string, params?: any[], callback?: (err: Error | null) => void): Statement;
  }

  export class Statement {
    run(...params: any[]): this;
    finalize(): void;
  }
}
