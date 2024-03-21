import React, { useLayoutEffect } from "react";
import moment from "moment";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";
import { useSelector } from "react-redux";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Currency from "react-currency-formatter";
import { selectBasketItems } from "../slices/basketSlice";
import { urlFor } from "../sanity";
import { selectedOrders } from "../slices/restaurantSlice";

const Order = ({ navigation }) => {
  const items = useSelector(selectBasketItems);
  const orders = useSelector(selectedOrders);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Orders",
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingBottom: 8 }}>
        <Text style={styles.sectionHeader}>Past Order Details</Text>
        {orders.map((orderGroup) => (
          <View
            key={orderGroup.restaurant.id}
            style={styles.restaurantContainer}
          >
            <Text style={styles.restaurantName}>
              {orderGroup.restaurant.title}
              {` (${moment(orderGroup.dateAndTime).format(
                "MMM D, YYYY h:mma"
              )})`}
            </Text>
            {Object.values(orderGroup.groupItemsBasket).map(
              (orderItems, index) => (
                <View key={index}>
                  {orderItems.map((item, idx) => (
                    <View key={idx} style={styles.orderContainer}>
                      <Image
                        source={{ uri: urlFor(item.image).url() }}
                        style={styles.image}
                      />
                      <View style={styles.orderDetails}>
                        <Text style={styles.orderName}>{item.name}</Text>
                        {/* <Text style={styles.orderPrice}>
                          {`${
                            orderGroup.dateAndTime.getDate() +
                            "-" +
                            orderGroup.dateAndTime.getMonth() +
                            1 +
                            "-" +
                            orderGroup.dateAndTime.getFullYear() +
                            " " +
                            orderGroup.dateAndTime.getHours() +
                            ":" +
                            orderGroup.dateAndTime.getMinutes().toString().padStart(2, '0')
                          }`}
                        </Text> */}
                        <Text
                          style={[
                            styles.orderPrice,
                            { fontWeight: "bold", color: "black" },
                          ]}
                        >
                          Rs {item.price}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Prepare")}
                        style={styles.reorderButton}
                      >
                        <Text style={styles.reorderButtonText}>Reorder</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  restaurantContainer: {
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  orderDetails: {
    alignSelf: "flex-start",
    flex: 1,
    marginLeft: 10,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  orderPrice: {
    fontSize: 14,
    color: "#888",
    marginStart: 4,
    marginVertical: 2,
  },
  reorderButton: {
    backgroundColor: "#FC6D3F",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
    borderRadius: 5,
  },
  reorderButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
