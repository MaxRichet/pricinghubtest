declare module 'papaparse' {
    export interface ParseResult<T> {
      data: T[];
      errors: any[];
      meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
      };
    }
  
    export function parse<T>(input: string, options: {
      header: boolean;
      delimiter: string;
      skipEmptyLines: boolean;
      complete: (results: ParseResult<T>) => void;
      error: (error: Error) => void;
    }): void;
}  