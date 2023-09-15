import { createSlice } from "@reduxjs/toolkit"; 

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
  },

  reducers: {},

});

export default countriesSlice.reducer;