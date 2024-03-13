import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

const PreparingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, [navigation]);

  return (
    <SafeAreaView className="bg-[#FC6D3F] flex-1 justify-center items-center">
      <Image
        source={require("./assets/delivery-boy.gif")}
        style={{ width: 150, height: 150 }}
        animation="slideInUp"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-md my-10 px-4 text-white font-bold text-center"
      >
        Assigning Delivery partner to your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingScreen;
