import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import Footer from "../Components/Footer";

import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();
  let devices = [
    {
      name: "das",
      device_id: 1,
    },
  ];

  function about(devId, name) {
    navigation.navigate("Monitor", { device_id: devId, name: name });
  }

  const ListItem = ({ data }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>Название: {data.name}</Text>
        <TouchableOpacity
          style={styles.itemAboutBtn}
          onPress={() => {
            about(data.device_id, data.name);
          }}
        >
          <Text style={styles.itemAboutText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    );
  };
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
          Дэшборд
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
      <View style={styles.body}>
        {devices[0] ? (
          <FlatList
            data={devices}
            renderItem={({ item }) => <ListItem data={item} />}
          />
        ) : (
          <Text style={styles.noDevice}>
            Похоже у вас нет {"\n"}устройств {":("}
          </Text>
        )}
      </View>
      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    width: 350,
    height: 156,
    backgroundColor: "#115FF9",
    marginHorizontal: "auto",
    marginVertical: 8,
    borderRadius: 15,
    paddingTop: 24,
  },
  itemText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 3,
  },
  itemAboutBtn: {
    width: 155,
    height: 45,
    backgroundColor: "#F5F5F5",
    marginHorizontal: "auto",
    borderRadius: 5,
    marginVertical: 15,
  },
  itemAboutText: {
    color: "#115FF9",
    fontSize: 24,
    fontWeight: "Light",
    textAlign: "center",
    marginVertical: 5,
  },
  noDevice: {
    marginVertical: "auto",
    color: "#115FF9",
    fontWeight: "semibold",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 80,
  },
  body: {
    height: Dimensions.get("screen").height - 115 - 83,
  },
});
