import { createSlice } from "@reduxjs/toolkit";

const favourites = [];

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites,
  },
  reducers: {
    addFavourite: (state, action) => {
      if(state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
      state.favourites = [...state.favourites, action.payload]
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
  }
}
});

export default favouritesSlice.reducer;