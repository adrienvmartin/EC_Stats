import { parse, ParseResult } from 'papaparse';
import React from 'react';
import { Dispatch } from 'redux';
import { CsvObject } from '../datatypes';
import { ActionTypes } from './types';

export interface FetchStatsAction {
  type: ActionTypes.fetchStats;
  payload: CsvObject[];
}

const createStatsArray = (
  e: React.DragEvent<HTMLDivElement>
): { data: CsvObject[] } => {
  let set: CsvObject[] = [];
  Array.from(e.dataTransfer.files)
    .filter((file) => file.type === 'text/csv')
    .forEach(async (file) => {
      const text = await file.text();
      const result: ParseResult<CsvObject> = await parse(text, {
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
      set = result.data;
      console.log('result.data: ', result.data);
    });
  return {
    data: set,
  };
};

// Put Array.from into separate function, call that function within fetchStats
export const fetchStats = (e: React.DragEvent<HTMLDivElement>) => {
  return (dispatch: Dispatch) => {
    const response = createStatsArray(e);
    dispatch<FetchStatsAction>({
      type: ActionTypes.fetchStats,
      payload: response.data,
    });
  };
};
