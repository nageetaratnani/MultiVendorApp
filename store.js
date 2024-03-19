import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import restaurantReducer from "./slices/restaurantSlice";
import addressReducer from "./slices/AddressSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant : restaurantReducer,
    address: addressReducer
  },
});
