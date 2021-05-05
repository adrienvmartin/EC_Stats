import { combineReducers } from 'redux';
import { CsvObject } from '../datatypes';
import { statsReducer } from './stats';

export interface StoreState {
  stats: CsvObject[];
}

export const reducers = combineReducers<StoreState>({
  stats: statsReducer,
});
