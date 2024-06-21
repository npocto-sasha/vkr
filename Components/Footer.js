import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import Dashboard from "../Screens/Dashboard";
export default function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
        style={{ width: 180 }}
      >
        <Image style={styles.img} source={require("../assets/Gauge.png")} />
        <Text style={styles.text}>Дэшборд</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Devices");
        }}
        style={{ width: 180 }}
      >
        <Image style={styles.img} source={require("../assets/Device.png")} />
        <Text style={styles.text}>Устройства</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notification");
        }}
        style={{ width: 180 }}
      >
        <Image style={styles.img} source={require("../assets/Notifi.png")} />
        <Text style={styles.text}>Уведомление</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 83,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E5EDFD",
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#115FF9",
  },
  text: {
    color: "#115FF9",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    marginHorizontal: "auto",
  },
});
