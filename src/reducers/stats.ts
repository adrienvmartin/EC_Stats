import { CsvObject } from '../datatypes';
import { Action, ActionTypes } from '../actions';

export const statsReducer = (state: CsvObject[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchStats:
      return action.payload;
    default:
      return state;
  }
};
