import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { selectAddress } from "../slices/AddressSlice";
import { useSelector } from "react-redux";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";

const ViewProfile = ({ navigation }) => {
  const activeAddress = useSelector(selectAddress);
  const profileData = {
    name: "user",
    email: "test@gmail.com",
    address:
      activeAddress.locationName === undefined
        ? null
        : activeAddress.locationName.trim(),
    mobileNumber: "03042589022",
  };

  const renderHeaderLeft = () => {
    return <NavigationDrawerHeader navigationProps={navigation} />;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "View Profile",
      headerLeft: () => renderHeaderLeft(),
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
    <SafeAreaView className="flex-1 bg-white">
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{profileData.name}</Text>
        </View>

        {/* Email */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profileData.email}</Text>
        </View>

        {/* Mobile Number */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Mobile Number:</Text>
          <Text style={styles.value}>{profileData.mobileNumber}</Text>
        </View>

        {profileData.address !== null && (
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{profileData.address}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    elevation: 3,
  },
});

export default ViewProfile;
