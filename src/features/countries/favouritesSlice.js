import { createSlice } from "@reduxjs/toolkit";

const favourites = [];

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: favourites,
  },
  reducers: {}
});

export default favouritesSlice.reducer;