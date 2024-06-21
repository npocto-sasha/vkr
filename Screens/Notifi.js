import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import Footer from "../Components/Footer";

import { useNavigation } from "@react-navigation/native";

export default function Notifi() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 50,
          height: 65,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            marginLeft: 18,
            color: "#115FF9",
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Уведомления
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("User");
          }}
          style={{ marginRight: 10 }}
        >
          <Image
            style={{ width: 55.7, height: 56 }}
            source={require("../assets/User.png")}
          />
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}
