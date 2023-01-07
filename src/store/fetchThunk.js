import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routes.dataPath());
    return response.data;
  },
);

export default fetchData;