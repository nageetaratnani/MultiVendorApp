import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView, TextInput, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";

const HomeScreen = () => {
  // state and hooks
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] =
    useState(featuredCategories);

  // side effects
  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <NavigationDrawerHeader navigationProps={navigation} />
          <View style={{ marginStart: 10 }}>
            <Text
              style={{
                marginTop: 2,
                color: "#ffffff",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              59S, pechs block 2 karachi pakistan
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 12,
              }}
            >
              Food delivery
            </Text>
          </View>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#FC6D3F", // Set Header color
      },
      headerTintColor: "#fff", // Set Header text color
      headerTitleStyle: {
        fontWeight: "bold", // Set Header text style
      },
    });
  }, [navigation]);

  useEffect(() => {
    SanityClient.fetch(
      `
      *[_type == "featured"]{
        ...,


        restaurants[]->{
          ...,
        dishes[]->
          
        }
     }
    `
    )
      .then((data) => {
        setFilteredCategories(data);
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = featuredCategories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredCategories(filtered);
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        {/* search bar */}
        <View className="flex-row mx-4 items-center space-x-2 pb-2">
          <View className="flex-row space-x-2 flex-1 bg-gray-100 p-3 rounded-md">
            <MagnifyingGlassIcon color="gray" />
            <TextInput
              placeholder="Restaurants and cuisines"
              onChangeText={handleSearch}
              keyboardType="default"
              value={searchQuery}
            />
          </View>
        </View>

        {/* body */}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* featured rows */}
          {filteredCategories.map((category) => (
            <FeaturedRow
              key={category._id}
              title={category.name}
              description={category.short_description}
              id={category._id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
