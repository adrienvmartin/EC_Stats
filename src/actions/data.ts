import { Dispatch } from 'redux';
import { DayObject } from '../data';
import { ActionTypes } from './types';

export interface FetchDataAction {
  type: ActionTypes.fetchData;
  payload: DayObject[];
}

export const fetchData = () => {
  return (dispatch: Dispatch) => {
    dispatch<FetchDataAction>({
      type: ActionTypes.fetchData,
      payload: response.data,
    });
  };
};
