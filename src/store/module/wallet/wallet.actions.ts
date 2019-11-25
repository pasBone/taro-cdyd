import * as types from './wallet.types';
import { Dispatch } from "redux"
import { walletApi } from '@/api/wallet';

export const getWalletDetailsAsync = (params: walletApi.WalletReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getWalletDetails());
      const response = await walletApi.walletBalance(params);
      dispatch(getWalletDetailsSuccess(response.data));
    } catch (error) {
      dispatch(getWalletDetailsError());
    }
  }
}

export const getWalletDetails = () => ({ type: types.GET_WALLET_DETAILS });
export const getWalletDetailsSuccess = (payload) => ({ type: types.GET_WALLET_DETAILS_SUCCESS, payload });
export const getWalletDetailsError = () => ({ type: types.GET_WALLET_DETAILS_ERROR });