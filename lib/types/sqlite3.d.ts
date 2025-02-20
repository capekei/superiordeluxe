declare module 'sqlite3' {
  export interface Database {
    run(sql: string, params: unknown[], callback: (err: Error | null) => void): void;
    run(sql: string, callback: (err: Error | null) => void): void;
    get(sql: string, params: unknown[], callback: (err: Error | null, row: unknown) => void): void;
    get(sql: string, callback: (err: Error | null, row: unknown) => void): void;
    all(sql: string, params: unknown[], callback: (err: Error | null, rows: unknown[]) => void): void;
    all(sql: string, callback: (err: Error | null, rows: unknown[]) => void): void;
    close(callback?: (err: Error | null) => void): void;
  }

  export function verbose(): { Database: new (filename: string) => Database };
}
