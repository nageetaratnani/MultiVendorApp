import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, addToBasket } from "../slices/basketSlice";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";

const BasketItem = ({ id, name, price, image, quantity }) => {
    const dispatch = useDispatch();
  
    const addItemToBasket = () => {
      dispatch(addToBasket({ id, name, price, image }));
    };
  
    const removeItemFromBasketHandler = () => {
      dispatch(removeFromBasket({ id }));
    };
  
    return (
      <View key={id} className="flex-row items-center space-x-3 bg-white py-2 px-5">
        <View className="bg-white px-4 pt-2 ">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasketHandler} disabled={quantity === 0}>
              <MinusCircleIcon color={quantity > 0 ? "#FC6D3F" : "gray"} size={22} />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={22} color="#FC6D3F" />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{ uri: urlFor(image).url() }} className="h-12 w-12 rounded-full" />
        <Text className="flex-1">{name}</Text>
        <Text className="text-gray-600 text-xs">
          <Currency quantity={price} currency="PKR" />
        </Text>
      </View>
    );
  };
  export default BasketItem