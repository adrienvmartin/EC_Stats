import { parse, ParseResult } from 'papaparse';
import { Dispatch } from 'redux';
import { CsvObject } from '../datatypes';
import { ActionTypes } from './types';

export interface FetchStatsAction {
  type: ActionTypes.fetchStats;
  payload: CsvObject[];
}

export const fetchStats = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  Array.from(e.dataTransfer.files)
    .filter((file) => file.type === 'text/csv')
    .forEach(async (file) => {
      const text = await file.text();
      const result: ParseResult<CsvObject> = parse(text, {
        header: true,
        skipEmptyLines: false,
        transformHeader: (h) => {
          let regex = /\s/g;
          return h.replace(regex, '');
        },
        complete: (results) => {
          console.log('Parsing complete: \n', results);
        },
      });
      return (dispatch: Dispatch) => {
        dispatch<FetchStatsAction>({
          type: ActionTypes.fetchStats,
          payload: result.data,
        });
      };
    });
};
