import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
const BasketContainer = () => {
  const items = useSelector(selectBasketItems);
  const basketTotalPrice = useSelector(selectBasketTotal);
  const navigation = useNavigation();

 
if(items.length === 0)
return null
  return (
    <View className="absolute bottom-14 w-full z-50">
      <TouchableOpacity  onPress={() => navigation.navigate("Basket")}  className="flex-row bg-[#FC6D3F] py-2 px-4 rounded-lg shadow-lg items-center space-x-1 mx-5 ">
        <Text className="text-md text-white font-extrabold text-xl rounded-md bg-[#FC6D3F] py-1 px-2">
          {items.length}
        </Text>
        <Text className="text-md flex-1 text-white font-extrabold text-center">View basket</Text>
        <Text className="text-md text-white font-extrabold">

          <Currency quantity={basketTotalPrice} currency="PKR" />
        
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketContainer;
