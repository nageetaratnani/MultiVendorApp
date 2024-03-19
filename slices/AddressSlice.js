import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    location: null,
    type: null,
  },
  addressesArray: [], // New state for an array of addresses
};

export const addressSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setAddressesArray: (state, action) => {
      state.addressesArray = state.addressesArray.concat(action.payload);
    },
  },
});

export const { setAddress, setAddressesArray } = addressSlice.actions;

export const selectAddress = (state) => state.address.address;
export const selectAddressesArray = (state) => state.address.addressesArray;

export default addressSlice.reducer;
