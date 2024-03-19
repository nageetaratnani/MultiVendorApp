import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens

import HomeScreen from "./HomeScreen";
import CustomSidebarMenu from "../components/CustomSidebarMenu";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";
import RestaurantScreen from "./RestaurantScreen";
import ProductDetail from "./ProductDetail";
import BasketScreen from "./BasketScreen";
import PreparingScreen from "./PreparingScreen";
import DeliveryScreen from "./DeliveryScreen";
import MapViewScreen from "./MapViewScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapView"
        component={MapViewScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Prepare"
        component={PreparingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Delivery"
        component={DeliveryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const viewProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const termAndPrivacyPolicyStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          color: "black",
        },
        drawerActiveBackgroundColor: "#FC6D3F",
      }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: "Home" }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="viewProfileStack"
        options={{ drawerLabel: "View Profile" }}
        component={viewProfileStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{ drawerLabel: "Settings" }}
        component={settingScreenStack}
      />
      <Drawer.Screen
        name="termAndPrivacyPolicyStack"
        options={{ drawerLabel: "Term & Conditions / Privacy" }}
        component={termAndPrivacyPolicyStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
