import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { XCircleIcon, MapPinIcon } from "react-native-heroicons/solid";
import { setAddress, setAddressesArray } from "../slices/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress } from "../slices/AddressSlice";

// Set up Geocoder with your Google Maps API key
Geocoder.init("AIzaSyCgzqN7NERuVcdZhHLUc12R4V1j-_ZqyRg");

const MapViewScreen = ({ route, navigation }) => {
  const {
    params: { _region },
  } = route;
  const [region, setRegion] = useState(_region);
  const activeAddress = useSelector(selectAddress);

  let addresses = [];
  const [locationName, setLocationName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setCurrentAddress] = useState("");
  const [area, setArea] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [isOffice, setIsOffice] = useState(false);
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Perform reverse geocoding to get the location name
    Geocoder.from(region.latitude, region.longitude)
      .then((json) => {
        const addressComponent = json.results[0].formatted_address;
        setLocationName(addressComponent);
      })
      .catch((error) => console.warn(error));
  }, [region]);
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

  const onConfirmAddress = () => {
    const type = isHome ? "Home" : "Office";
    dispatch(
      setAddress({
        type: type,
        locationName: `${address + ''}  ${area + ''} ${locationName}`,
      })
    );
    addresses.push({
      type: type,
      locationName: `${address + ''}  ${area + ''} ${locationName}`,
    });
    dispatch(setAddressesArray(addresses));
    setModalVisible(false);
    navigation.goBack(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker coordinate={region} />
      </MapView>
      <TouchableOpacity
        onPress={() => navigation.goBack(null)}
        className="rounded-full bg-gray-100"
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <XCircleIcon color="#FC6D3F" height={50} width={50} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems: "flex-start",
        }}
      >
        <View>
          <MapPinIcon color={"#FC6D3F"} />
        </View>
        <View>
          <Text style={styles.text}>{locationName}</Text>
          <Text style={{ color: "gray", marginStart: 10 }}>{city}</Text>
        </View>
      </View>

      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "#eaeaea",
          marginVertical: 5,
        }}
      ></View>
      <TouchableOpacity
        className="rounded-lg bg-[#FC6D3F] p-2 mb-4 mt-2 shadow-xl"
        onPress={() => setModalVisible(true)}
        style={{ width: 350 }}
      >
        <Text className="text-center text-white text-lg font-bold">
          Confirm your location
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                alignItems: 'center'
              }}
            >
                <MapPinIcon color={"#FC6D3F"} width={14} height={14}  />
                <Text style={{ color: "gray", marginStart: 4 }}>{city}</Text>
            </View>
            <Text style={{ fontSize: 14, marginBottom: 2 , marginTop: 10,}}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Apartment Info, Floor"
              value={address}
              onChangeText={setCurrentAddress}
            />
            <Text style={{ fontSize: 14, marginBottom: 2 }}>Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Area"
              value={area}
              onChangeText={setArea}
            />
            <View style={styles.locationTypeContainer}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>
                Location Type:
              </Text>
              <View style={styles.switchContainer}>
                <Text>Home</Text>
                <Switch
                  trackColor={{ true: "#FC6D3F" }}
                  thumbColor={"#f4f3f4"}
                  value={isHome}
                  onValueChange={(newValue) => setIsHome(newValue)}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Office</Text>
                <Switch
                  trackColor={{ true: "#FC6D3F" }}
                  thumbColor={"#f4f3f4"}
                  value={isOffice}
                  onValueChange={(newValue) => setIsOffice(newValue)}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => onConfirmAddress()}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    height: "80%",
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    marginStart: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#FC6D3F",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationTypeContainer: {
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default MapViewScreen;
