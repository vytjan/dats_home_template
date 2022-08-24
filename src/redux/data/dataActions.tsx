// log

// import { ThunkDispatch } from 'redux-thunk';

import { store } from '../store';
import {
  CHECK_DATA_REQUEST,
  CHECK_DATA_SUCCESS,
  CHECK_DATA_FAILED,
} from './dataReducer';

const fetchDataRequest = () => {
  return {
    type: CHECK_DATA_REQUEST,
  };
};

const fetchDataSuccess = (payload: any) => {
  return {
    type: CHECK_DATA_SUCCESS,
    payload,
  };
};

const fetchDataFailed = (payload: any) => {
  return {
    type: CHECK_DATA_FAILED,
    payload,
  };
};

export const fetchData = (_account: string) => {
  return async (dispatch: any) => {
    dispatch(fetchDataRequest());
    try {
      const totalSupply = await store
        .getState()
        .blockchain.smartContract!.methods.totalSupply()
        .call();
      console.log(store.getState());
      console.log(totalSupply);
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed('Could not load data from contract.'));
    }
  };
};
