import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteRestaurants } from "../slices/restaurantSlice";
import { SafeAreaView, ScrollView, View } from "react-native";
import RestaurantCard from "../components/RestaurantCard";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";
const FavoriteScreen = ({ navigation }) => {
  const _favouriteRestaurants = useSelector(selectFavoriteRestaurants);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Favorites",
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#FC6D3F", // Set Header color
      },
      headerTintColor: "#fff", // Set Header text color
      headerTitleStyle: {
        fontWeight: "bold", // Set Header text style
      },
    });
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsHorizontalScrollIndicator={false} className="p-4">
        {/* restaurant cards */}
        {_favouriteRestaurants?.map((restaurant) => (
          <View style={{ width: 400, paddingEnd: 4, marginTop: 6}}>
            <RestaurantCard
              key={restaurant[0].id}
              id={restaurant[0].id}
              imgUrl={restaurant[0].imgUrl}
              title={restaurant[0].title}
              rating={restaurant[0].rating}
              genre={restaurant[0].title}
              address={restaurant[0].address}
              short_description={restaurant[0].short_description}
              dishes={restaurant[0].dishes}
              long={restaurant[0].long}
              lat={restaurant[0].lat}
              isFromFav={true}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default FavoriteScreen;
