import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchThunk.js';

const companiesAdapter = createEntityAdapter();

const companiesSlice = createSlice({
  name: 'companies',
  initialState: companiesAdapter.getInitialState({ activeCompanyId: 3 }),
  reducers: {
    setActiveCompanyId: ((state,{ payload }) => {
      state.activeCompanyId = payload;
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        companiesAdapter.setAll(state, payload.companies);
      })
  },
});

export const { setActiveCompanyId } = companiesSlice.actions
export const getActiveCompanyId = (state) => state.companies.activeCompanyId;
export const selectors = companiesAdapter.getSelectors((state) => state.companies);
export default companiesSlice.reducer;