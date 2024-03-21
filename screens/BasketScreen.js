import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant, setOrders } from "../slices/restaurantSlice";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Currency from "react-currency-formatter";
import BasketItem from "../components/BasketItem";
import { setRestaurants } from "../slices/OrderSlice";

const BasketScreen = ({ navigation }) => {
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  let orderedItems = [];
  const [groupItemsBasket, setGroupItemsBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  let restaurants = [];

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#FC6D3F] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            className="rounded-full bg-gray-100 absolute   top-3  right-2 "
          >
            <XCircleIcon color="#FC6D3F" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Ionicons name="fast-food" color="#FC6D3F" size={30} />

          <Text className="flex-1"> Deliver in 10-15 mins</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-[#FC6D3F]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupItemsBasket).map(([key, items]) => (
            <BasketItem
              key={key}
              id={key}
              name={items[0]?.name}
              price={items[0]?.price}
              image={items[0]?.image}
              quantity={items.length}
            />
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4 ">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="PKR" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={13.3} currency="PKR" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400 font-bold">Order Total</Text>
            <Text className=" text-[#1f1f20] font-extrabold">
              <Currency quantity={basketTotal + 13.3} currency="PKR" />
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-[#FC6D3F] p-4 shadow-xl"
            onPress={() => {
              orderedItems.push({
                restaurant: restaurant,
                groupItemsBasket: groupItemsBasket,
                dateAndTime: new Date()
              });
              restaurants.push(restaurant);
              dispatch(setRestaurants(restaurants));
              dispatch(setOrders(orderedItems));
              navigation.navigate("Prepare");
            }}
          >
            <Text className="text-center text-white text-md font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
