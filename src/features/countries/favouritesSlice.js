import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, clearFavouritesFromFirebase, db, removeFavouriteFromFirebase } from "../../auth/firebase";
import { collection, getDocs } from "firebase/firestore";



export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites:[],
    isLoading: true,
  },

  

  reducers: {
    isLoading(state, action) {
    state.isLoading = action.payload;
    },
    getFavourites(state, action) {
    state.favourites = action.payload;
    },
    addFavourite(state, action) {
    if(state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
    state.favourites = [...state.favourites, action.payload]
    const user = auth.currentUser
    if (user) addFavouriteToFirebase(user.uid, action.payload);
    },
    removeFavourite(state, action) {
    const newArray= [...state.favourites]
    newArray.splice(newArray.findIndex(e => e === action.payload), 1)
    state.favourites = [...newArray]
    const user = auth.currentUser
    if (user) {
    removeFavouriteFromFirebase(user.uid, action.payload);
    }
    },
    clearFavourites(state, action) {
    state.favourites = []
    const user = auth.currentUser
    if (user) {
    clearFavouritesFromFirebase(user.uid);
    }
    }
    
    }
});

export const getFavouritesFromSource = () =>
async (dispatch) => {
const user = auth.currentUser
if (user) {
const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
const favourites = q.docs.map((doc) => doc.data().name);
dispatch(getFavourites(favourites));
dispatch(isLoading(false));
}
};

export const { addFavourite, removeFavourite, clearFavourites, getFavourites, isLoading } = favouritesSlice.actions;

export default favouritesSlice.reducer;