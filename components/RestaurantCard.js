import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import React, { useRef, useState } from "react";
import { StarIcon, MapPinIcon, HeartIcon } from "react-native-heroicons/solid";
import { HeartIcon as Favorite } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavouriteRestaurants,
} from "../slices/restaurantSlice";

export default function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
  isFromFav,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const isFav = useRef(false);
  let _favouriteRestaurants = [];
  const onHandleFavouriteRestaurants = () => {
    if (isFav.current === true) {
      _favouriteRestaurants.push([
        ..._favouriteRestaurants,
        {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        },
      ]);
      dispatch(setFavouriteRestaurants(_favouriteRestaurants));
    } else {
      dispatch(setFavouriteRestaurants(_favouriteRestaurants.splice(id, 1)));
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow-md rounded-sm"
      style={{ marginTop: 4 }}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-100 rounded-sm"
      />
      {!isFromFav && (
        <View style={styles.icon}>
          <Pressable
            onPress={() => {
              setIsFavorite((prev) => !prev);
              isFav.current === false
                ? (isFav.current = true)
                : (isFav.current = false);
              onHandleFavouriteRestaurants();
            }}
          >
            {isFavorite ? (
              <HeartIcon color={"#FC6D3F"} size={16} />
            ) : (
              <Favorite color={"#FC6D3F"} size={16} />
            )}
          </Pressable>
        </View>
      )}
      <View className="px-3 pb-4 space-y-1">
        <Text className="font-bold text-xl pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="#FC6D3F" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-orange-500">{rating}</Text> . {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 3,
    width: 22,
    alignItems: "center",
    position: "absolute",
    right: 6,
    top: 4,
  },
});
