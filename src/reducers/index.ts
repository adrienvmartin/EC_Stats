import { combineReducers } from 'redux';
import { DayObject } from '../data';

export interface StoreState {
  data: DayObject[];
}

export const reducers = combineReducers<StoreState>({
  data: null,
});
