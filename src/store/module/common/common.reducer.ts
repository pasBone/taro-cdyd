import { IAction } from '@/store/types';
import * as types from './common.types';
import { combineReducers } from 'redux';

export const sideMenuState = {
  state: false
}

export const sideMenu = (state = sideMenuState, action: IAction) => {
  switch (action.type) {
    case types.SET_SIDE_MENU_CLOSE:
      return { state: false };
    case types.SET_SIDE_MENU_OPEN:
      return { state: true };
    default:
      return state
  }
}

export const commonReducer = combineReducers({
  sideMenu
});