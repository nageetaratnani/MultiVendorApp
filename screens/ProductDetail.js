import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  addToBasket,
  selectBasketItemsWithId,
} from "../slices/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";

import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
const { width, height } = Dimensions.get("window");

const ProductDetail = ({ route, navigation }) => {
  const {
    params: { dish },
  } = route;
  const items = useSelector((state) =>
    selectBasketItemsWithId(state, dish._id)
  );
  const images = [
    {
      photo: urlFor(dish.image).url(),
    },
    {
      photo:
        "https://cdn.sanity.io/images/rvrzkb3p/production/5bd06796b3e3e01a6aa6e7ba0489217342607091-687x1031.png",
    },
    {
      photo:
        "https://cdn.sanity.io/images/rvrzkb3p/production/ccf892fabe036b7f59c489adf1e9f212683ffb21-500x333.png",
    },
  ];
  const dispatch = useDispatch();
  const scrollX = new Animated.Value(0);
  const dotPosition = Animated.divide(scrollX, width);
  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id: dish._id,
        name: dish.name,
        description: dish.short_description,
        price: dish.price,
        image: dish.image,
      })
    );
  };

  const removeItemFromBasketHandler = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id: dish._id }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#FC6D3F] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{dish.name}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            className="rounded-full bg-gray-100 absolute   top-3  right-2 "
          >
            <XCircleIcon color="#FC6D3F" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 16 }}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {images.map((item, index) => (
              <View key={`menu-${index}`} style={styles.container}>
                <View style={styles.menuContainer}>
                  <Image
                    source={{
                      uri: item.photo,
                    }}
                    resizeMode="cover"
                    style={styles.menuImage}
                  />
                </View>
              </View>
            ))}
          </Animated.ScrollView>
          <View style={styles.dotContainer}>
            {images.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
              });

              const dotSize = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [8 * 0.8, 10, 8 * 0.8],
                extrapolate: "clamp",
              });

              const dotColor = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: ["gray", "#FC6D3F", "gray"],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={`dot-${index}`}
                  style={{
                    ...styles.dot,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotColor,
                    opacity: opacity,
                  }}
                />
              );
            })}
          </View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            {dish.name}
          </Text>
          <Text style={{ color: "gray", marginBottom: 8 }}>
            {dish.short_description}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            <Currency quantity={dish.price} currency="PKR" />
          </Text>
        </View>
        <View
          className="px-4 pt-2"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasketHandler}
              disabled={items.length === 0}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#FC6D3F" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#FC6D3F" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={{
            backgroundColor: "#FC6D3F",
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
            alignItems: "center",
            marginHorizontal: 16,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Add to Basket
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
  },
  menuContainer: {
    height: height * 0.35,
  },
  menuImage: {
    width: width,
    height: "100%",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 10,
    paddingVertical: 15,
  },
  dot: {
    borderRadius: 30,
    marginHorizontal: 6,
  },
});
