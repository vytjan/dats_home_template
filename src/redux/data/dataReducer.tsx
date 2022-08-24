import { createSlice } from '@reduxjs/toolkit';

// declaring the types for our state
export type DataState = {
  loading: boolean;
  totalSupply: number;
  cost: number;
  error: boolean;
  errorMsg: string;
};

const initialState: DataState = {
  loading: false,
  totalSupply: 0,
  cost: 0,
  error: false,
  errorMsg: '',
};

export const dataMode = createSlice({
  name: 'dataMode',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    CHECK_DATA_REQUEST: (state, _action) => {
      console.log('loading');
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      };
    },
    CHECK_DATA_SUCCESS: (state, action) => {
      console.log(action);
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        // cost: action.payload.cost,
        error: false,
        errorMsg: '',
      };
    },
    CHECK_DATA_FAILED: (_state, action) => {
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { CHECK_DATA_REQUEST, CHECK_DATA_SUCCESS, CHECK_DATA_FAILED } =
  dataMode.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectData = (state: RootState) => state.data;

// exporting the reducer here, as we need to add this to the store
export default dataMode.reducer;
