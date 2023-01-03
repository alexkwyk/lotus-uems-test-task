import { configureStore } from '@reduxjs/toolkit';
import companies from './companiesSlice.js';

export default configureStore({
  reducer: {
    companies,
  },
});