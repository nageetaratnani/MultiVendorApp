import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], 
  restaurants: []
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = state.restaurants.concat(action.payload)
    },
    setOrders: (state, action) => {
      state.orders = state.orders.concat(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders, setRestaurants } = orderSlice.actions;

export const selectedOrders  = (state) => state
export const selectedRestaurants  = (state) => state


export default orderSlice.reducer;
