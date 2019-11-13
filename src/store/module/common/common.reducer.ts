import { IAction } from '@/store/types';
import * as types from './common.types';
import { combineReducers } from 'redux';
import { getLocation, getStorageSync, setStorageSync } from '@tarojs/taro';

export const sideMenuState = {
  state: false
}

export const locationState = {
  latitude: 22.53332,
  longitude: 113.93041,
  speed: 0,
  accuracy: 0,
  altitude: 0,
  verticalAccuracy: 0,
  horizontalAccuracy: 0
}

export const tabbarIdState = {
  id: getStorageSync('tabbar-id') || 0
}

export const sideMenu = (state = sideMenuState, action: IAction) => {
  switch (action.type) {
    case types.SET_SIDE_MENU_CLOSE:
      return { state: false };
    case types.SET_SIDE_MENU_OPEN:
      return { state: true };
    default:
      return state;
  }
}

export const gpsLocation = (state = locationState, action: IAction<getLocation.Promised>) => {
  switch (action.type) {
    case types.SET_LOCATION:
      return action.payload;
    default:
      return state;
  }
}

export const tabbar = (state = tabbarIdState, action: IAction<string>) => {
  switch (action.type) {
    case types.SET_TAB_BAR_ID:
      const id = action.payload;
      setStorageSync('tabbar-id', id);
      return { id };
    default:
      return state;
  }
}

export const commonReducer = combineReducers({
  sideMenu,
  gpsLocation,
  tabbar
});