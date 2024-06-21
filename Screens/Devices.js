import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import Footer from "../Components/Footer";

export default function Devices() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 45, height: 83 }}>
        <Text
          style={{
            marginLeft: 18,
            color: "#115FF9",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Устройства
        </Text>
      </View>
      <Footer />
    </View>
  );
}
