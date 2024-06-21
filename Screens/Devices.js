import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import Footer from "../Components/Footer";
import { useNavigation } from "@react-navigation/native";

export default function Devices() {
  let devices = [
    {
      name: "das",
      device_id: 0,
    },
    {
      name: "das",
      device_id: 1,
    },
    {
      name: "das",
      device_id: 2,
    },
    {
      name: "das",
      device_id: 3,
    },
    {
      name: "das",
      device_id: 3,
    },
  ];

  const navigation = useNavigation();
  const ListItem = ({ data }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>Название: {data.name}</Text>
        <Text style={styles.itemText}>Номер клиента: {data.device_id}</Text>
        <TouchableOpacity style={styles.itemDeleteBtn}>
          <Text style={styles.itemDeleteText}>Удалить</Text>
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
          Устройства
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

      <FlatList
        data={devices}
        renderItem={({ item }) => <ListItem data={item} />}
      />
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
    paddingTop: 12,
  },
  itemText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 3,
  },
  itemDeleteBtn: {
    width: 115,
    height: 45,
    backgroundColor: "#F5F5F5",
    marginHorizontal: "auto",
    borderRadius: 5,
    marginVertical: 15,
  },
  itemDeleteText: {
    color: "#115FF9",
    fontSize: 24,
    fontWeight: "Light",
    textAlign: "center",
    marginVertical: 5,
  },
});
