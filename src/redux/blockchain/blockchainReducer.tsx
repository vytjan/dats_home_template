import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
// import React, { useState } from "react";

// declaring the types for our state
export type BlockchainState = {
  loading: boolean;
  account: string;
  smartContract: Contract | null;
  web3: Web3 | null;
  errorMsg: string;
};

const initialState: BlockchainState = {
  loading: false,
  account: '',
  smartContract: null,
  web3: null,
  errorMsg: '',
};

// export type myReducer =

export const blockchainMode = createSlice({
  name: 'blockchainMode',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    CONNECTION_REQUEST: (
      _state: any,
      _action: PayloadAction<BlockchainState>
    ) => {
      return {
        ...initialState,
        loading: true,
      };
    },
    CONNECTION_SUCCESS: (
      state: any,
      action: PayloadAction<BlockchainState>
    ) => {
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
      };
    },
    CONNECTION_FAILED: (_state, action: PayloadAction<BlockchainState>) => {
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    },
    UPDATE_ACCOUNT: (state: any, action: PayloadAction<BlockchainState>) => {
      return {
        ...state,
        account: action.payload.account,
      };
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  CONNECTION_REQUEST,
  CONNECTION_SUCCESS,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT,
} = blockchainMode.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectCount = (state: RootState) => state.blockchain;

// exporting the reducer here, as we need to add this to the store
export default blockchainMode.reducer;
