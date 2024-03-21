import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";
import Geocoder from "react-native-geocoding";
import {
  selectAddress,
  selectAddressesArray,
  setAddress,
} from "../slices/AddressSlice";

const HomeScreen = ({ navigation }) => {
  // state and hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] =
    useState(featuredCategories);
  const activeAddress = useSelector(selectAddress);
  const addressesArray = useSelector(selectAddressesArray);
  const [selectedAddress, setSelectAddress] = useState(activeAddress);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [region, setRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const handleAddressSelect = (address, index) => {
    dispatch(setAddress(address));
    setSelectAddress(address);
    setSelectedAddressIndex(index);
  };

  useEffect(() => {
    const index = addressesArray.findIndex(
      (_address) => _address.locationName === activeAddress.locationName
    );
    setSelectedAddressIndex(index);
  }, [activeAddress]);

  const truncateLocationName = (name, maxLength) => {
    if (name.length <= maxLength) return name;
    const words = name.split(" ");
    const truncatedWords = words.slice(0, maxLength);
    return truncatedWords.join(" ") + "...";
  };
  useEffect(() => {
    // Perform reverse geocoding to get the location name
    Geocoder.from(region.latitude, region.longitude)
      .then((json) => {
        const addressComponents = json.results[0].address_components;
        let cityName = "";
        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            cityName = component.long_name;
          }
        });
        setCity(cityName);
      })
      .catch((error) => console.warn(error));
  }, [region]);
  const renderHeaderLeft = () => {
    const truncatedLocationName = truncateLocationName(
      activeAddress.locationName ?? "Current location",
      activeAddress.locationName ? 6 : 20
    );
    return (
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => setModalVisible(true)}
      >
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
            {truncatedLocationName.trim()}
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            {"karachi"}
          </Text>
        </View>
      </Pressable>
    );
  };

  // side effects
  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: () => renderHeaderLeft(),
      headerStyle: {
        backgroundColor: "#FC6D3F", // Set Header color
      },
      headerTintColor: "#fff", // Set Header text color
      headerTitleStyle: {
        fontWeight: "bold", // Set Header text style
      },
    });
  }, [navigation, activeAddress, selectedAddress]);

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
      category.restaurants.some((restaurant) => {
        return restaurant.name.toLowerCase().includes(text.toLowerCase());
      })
    );
    setFilteredCategories(filtered);
  };
  
  return (
    <>
      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        {/* search bar */}
        <View className="flex-row mx-4 items-center space-x-2 py-3">
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
          {filteredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              title={category.name}
              description={category.short_description}
              id={category._id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Location Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {/* Use current location */}
            <Pressable
              style={{ marginBottom: 10 }}
              onPress={() =>
                navigation.navigate("MapView", {
                  _region: region,
                })
              }
            >
              <Text
                style={{ fontWeight: "500", fontSize: 14, color: "#FC6D3F" }}
              >
                Use my current location
              </Text>
            </Pressable>

            {addressesArray.length > 0 && (
              <MapView
                style={{ width: 350, height: 120 }}
                initialRegion={region}
              >
                <Marker coordinate={region} />
              </MapView>
            )}
            {/* List of addresses with radio buttons */}
            {addressesArray.map((address, index) => (
              <Pressable
                key={index}
                onPress={() => handleAddressSelect(address, index)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginRight: 10,
                    borderColor: "#FC6D3F",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {selectedAddressIndex === index && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#FC6D3F",
                      }}
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={{ marginEnd: 20, fontWeight: "bold", fontSize: 14 }}
                  >
                    {address.type}
                  </Text>
                  <Text style={{ marginEnd: 20, marginTop: 2 }}>
                    {address.locationName}
                  </Text>
                  <Text style={{ marginTop: 2, color: "gray" }}>{city}</Text>
                </View>
              </Pressable>
            ))}

            {/* Add new address */}
            <Pressable
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PlusIcon color={"#FC6D3F"} width={18} height={18} />
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("MapView", {
                    _region: region,
                  });
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#FC6D3F",
                    marginLeft: 5,
                    marginTop: 5,
                  }}
                >
                  Add New Address
                </Text>
              </Pressable>
            </Pressable>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="rounded-full bg-gray-100"
              style={{ position: "absolute", top: 15, right: 15 }}
            >
              <XCircleIcon color="#FC6D3F" height={20} width={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
