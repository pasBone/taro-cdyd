import * as types from './wallet.types';
import { combineReducers } from "redux";
import { IAction } from "@/store/types";
import { walletApi } from "@/api/wallet";
import { LoadingType } from '@/types';

const walletDetailsState: walletApi.WalletRes & LoadingType = {
  isTip: 0,
  totalAmount: 0.00,
  giftAmount: 0.00,
  rechargeAmount: 0.00,
  loading: false
}

export const walletDetails = (state = walletDetailsState, actions: IAction<walletApi.WalletRes>) => {
  switch (actions.type) {
    case types.GET_WALLET_DETAILS:
      return { ...state, loading: true };
    case types.GET_WALLET_DETAILS_SUCCESS:
      return { ...actions.payload, loading: false };
    case types.GET_WALLET_DETAILS_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export const walletReducer = combineReducers({
  walletDetails
});