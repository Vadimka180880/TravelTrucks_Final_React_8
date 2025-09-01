// Заготовка для campers slice
import { createSlice } from '@reduxjs/toolkit';
const campersSlice = createSlice({
  name: 'campers',
  initialState: { list: [], filters: {}, favorites: [] },
  reducers: {},
});
export default campersSlice.reducer;