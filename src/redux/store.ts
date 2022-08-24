import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';

import blockchainReducer from './blockchain/blockchainReducer';
import dataReducer from './data/dataReducer';

// applyMiddleware supercharges createStore with middleware:
export const store = configureStore({
  reducer: { blockchain: blockchainReducer, data: dataReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([thunk]),
  // )
  // prepend and concat calls can be chained
  // .concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
// type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
