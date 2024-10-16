import Papa, { ParseResult } from 'papaparse';

interface DataRow {
  niveau_1: string;
  niveau_2: string;
  niveau_3: string;
  date: string;
  ventes: number;
}

export const parseCsv = async (csvFilePath: string): Promise<DataRow[]> => {
  const response = await fetch(csvFilePath);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let csvData = '';

  if (reader) {
    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      csvData += decoder.decode(value);
      done = readerDone;
    }
  }

  return new Promise((resolve, reject) => {
    Papa.parse<DataRow>(csvData, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: (results: ParseResult<DataRow>) => {
        resolve(results.data);
      },
      error: (error: Error) => reject(error),
    });
  });
};