import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
  favouritesRestaurants: [],
  orders: [],
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setFavouriteRestaurants: (state, action) => {
      state.favouritesRestaurants = state.favouritesRestaurants.concat(
        action.payload
      );
    },
    setOrders: (state, action) => {
      state.orders = state.orders.concat(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant, setFavouriteRestaurants, setOrders } =
  restaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurant;
export const selectFavoriteRestaurants = (state) =>
  state.restaurant.favouritesRestaurants;
export const selectedOrders = (state) => state.restaurant.orders;

export default restaurantSlice.reducer;
