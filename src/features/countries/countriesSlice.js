import { createSlice } from "@reduxjs/toolkit"; 
import countriesAPI from "../../services/countries";

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    isLoading: true,
  },

  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    }
  },

});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countriesAPI.getAll();
    setTimeout(() => dispatch(isLoading(false)),1000)
  }
}

export const { isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;