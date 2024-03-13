import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../slices/basketSlice";

const DishRow = ({ id, name, description, price, image, onPressProduct }) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const removeItemFromBasketHandler = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        className="bg-white border p-3 border-gray-200"
        onPress={() => onPressProduct()}
      >
        <View className="flex-row space-x-4">
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4 rounded-md"
            />
          </View>
          <View className="flex-1  ">
            <Text className="text-lg mb-1 font-bold">{name}</Text>
            <Text className="text-gray-400 text-xs ">{description}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4, }}
            >
              <Text className="mt-2 font-bold">
                <Currency quantity={price} currency="PKR" />
              </Text>
              <View className="bg-white px-4">
                <View className="flex-row items-center space-x-2 pb-3">
                  <TouchableOpacity
                    onPress={removeItemFromBasketHandler}
                    disabled={items.length === 0}
                  >
                    <MinusCircleIcon
                      color={items.length > 0 ? "#FC6D3F" : "gray"}
                      size={30}
                    />
                  </TouchableOpacity>
                  <Text>{items.length}</Text>
                  <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon size={30} color="#FC6D3F" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DishRow;
