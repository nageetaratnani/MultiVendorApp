// import { NavigationContainer } from "@react-navigation/native";
// import { TailwindProvider } from "tailwindcss-react-native";
// import HomeScreen from "./screens/HomeScreen";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import RestaurantScreen from "./screens/RestaurantScreen";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import BasketScreen from "./screens/BasketScreen";
// import PreparingScreen from "./screens/PreparingScreen";
// import DeliveryScreen from "./screens/DeliveryScreen";
// import SplashScreen from "./screens/SplashScreen";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import ProductDetail from "./screens/ProductDetail";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//    <GestureHandlerRootView style={{flex:1}}>
//      <NavigationContainer>
//       <Provider store={store}>
//         <TailwindProvider>
//           <Stack.Navigator>
//             <Stack.Screen name="Splash" component={SplashScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />

//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Restaurant" component={RestaurantScreen} />
//             <Stack.Screen
//               name="ProductDetail"
//               component={ProductDetail}
//               options={{
//                 presentation: "modal",
//                 headerShown: false,
//               }}
//             />
//             <Stack.Screen
//               name="Basket"
//               component={BasketScreen}
//               options={{
//                 presentation: "modal",
//                 headerShown: false,
//               }}
//             />
//             <Stack.Screen
//               name="Prepare"
//               component={PreparingScreen}
//               options={{
//                 headerShown: false,
//               }}
//             />
//             <Stack.Screen
//               name="Delivery"
//               component={DeliveryScreen}
//               options={{
//                 headerShown: false,
//               }}
//             />
//           </Stack.Navigator>
//         </TailwindProvider>
//       </Provider>
//     </NavigationContainer>
//    </GestureHandlerRootView>
//   );
// }
import "react-native-gesture-handler";

// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
// Import Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import DrawerNavigatorRoutes from "./screens/DrawerNavigatorRoutes";
import { Provider } from "react-redux";
import { TailwindProvider } from "tailwindcss-react-native";

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator initialRouteName="Splash">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{ headerShown: false }}
            />
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
              name="DrawerNavigationRoutes"
              component={DrawerNavigatorRoutes}
              // Hiding header for Navigation Drawer
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
