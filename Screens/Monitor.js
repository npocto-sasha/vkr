import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
export default function Monitor({ route }) {
  useEffect(() => {
    setId(route.params.device_id);
    setName(route.params.name);
  }, []);

  const [name, setName] = useState("Название");
  const [id, setId] = useState(0);

  const [light, setLight] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [temp, setTemp] = useState(0);

  const [lamp, setLamp] = useState(false);
  const [nasos, setNasos] = useState(false);
  const [vent, setVent] = useState(false);
  const [door, setDoor] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.devTitle}>{name + "\n" + "ID: " + id}</Text>
      <Text style={styles.blckTitle}>Показания</Text>
      <View style={styles.blckContainer}>
        <View style={styles.block}>
          <Text style={styles.info}>
            Освещенность
            {"\n" + light + " "}
            люмин
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.info}>
            Влажность
            {"\n" + humidity + " "}%
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.info}>
            Температура
            {"\n" + temp + " "}
            °C
          </Text>
        </View>
      </View>

      <Text style={styles.blckTitle}>Управление</Text>
      <View style={styles.blckContainer}>
        <View style={styles.block}>
          <Text style={styles.info}>Свет</Text>
          <Switch
            style={styles.Switch}
            value={lamp}
            thumbColor={"white"}
            trackColor={{ false: "#999", true: "#7AA7FF" }}
            onValueChange={() => {
              setLamp(!lamp);
            }}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.info}>Насос</Text>
          <Switch
            style={styles.Switch}
            value={nasos}
            thumbColor={"white"}
            trackColor={{ false: "#999", true: "#7AA7FF" }}
            onValueChange={() => {
              setNasos(!nasos);
            }}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.info}>Вентилятор</Text>
          <Switch
            style={styles.Switch}
            value={vent}
            thumbColor={"white"}
            trackColor={{ false: "#999", true: "#7AA7FF" }}
            onValueChange={() => {
              setVent(!vent);
            }}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.info}>Дверь</Text>
          <Switch
            style={styles.Switch}
            value={door}
            thumbColor={"white"}
            trackColor={{ false: "#999", true: "#7AA7FF" }}
            onValueChange={() => {
              setDoor(!door);
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: "white",
    height: "100%",
  },
  block: {
    width: 170,
    height: 90,
    backgroundColor: "#115FF9",
    marginVertical: 6,
    borderRadius: 15,
  },
  info: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginVertical: "auto",
  },
  blckContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  blckTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#525252",
    marginBottom: 10,
  },
  devTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#115FF9",
    textAlign: "center",
    marginVertical: 20,
  },
  Switch: {
    marginHorizontal: "auto",
  },
});
