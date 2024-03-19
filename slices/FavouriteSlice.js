import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouritesRestaurants: [], 
};

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavouriteRestaurants: (state, action) => {
      state.favouritesRestaurants = state.favouritesRestaurants.concat(action.payload);
    },
  },
});

export const { setFavouriteRestaurants } = favouriteSlice.actions;
export const favouriteRestaurants = (state) => state.favouritesRestaurants.favouritesRestaurants

export default favouriteSlice.reducer;
