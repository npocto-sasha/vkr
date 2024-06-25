import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text, Switch } from "react-native";

import mqtt from "mqtt";

export default function Monitor({ route }) {
  const [name, setName] = useState("Название");
  const [id, setId] = useState(0);
  const client = mqtt.connect("ws://95.163.228.174:9001/ws", {
    username: "gigatech",
    password: "gigatechthebest",
  });
  function publish(num) {
    var body;
    if (num == 1) {
      body = JSON.stringify({
        cooler: !vent,
        door: door,
        led: lamp,
        pump: nasos,
      });
    } else if (num == 2) {
      body = JSON.stringify({
        cooler: vent,
        door: !door,
        led: lamp,
        pump: nasos,
      });
    } else if (num == 3) {
      body = JSON.stringify({
        cooler: vent,
        door: door,
        led: !lamp,
        pump: nasos,
      });
    } else if (num == 4) {
      body = JSON.stringify({
        cooler: vent,
        door: door,
        led: lamp,
        pump: !nasos,
      });
    }

    var topic = id + "_controls";

    console.log(body);

    client.publish(topic, body);
  }

  useEffect(() => {
    setId(route.params.device_id);
    setName(route.params.name);
    if (!id) return;

    client.subscribe(id, {}, (err) => {
      if (err) {
        console.error(`Subscribe to ${id} failed:`, err);
      } else {
        console.log(`Subscribed to ${id}`);
      }
    });
    client.subscribe(id + "_controls", {}, (err) => {
      if (err) {
        console.error(`Subscribe to ${id + "_controls"} failed:`, err);
      } else {
        console.log(`Subscribed to ${id + "_controls"}`);
      }
    });

    client.on("connect", () => {
      console.log("Connected to MQTT Broker!");
    });
    client.on("error", (err) => {
      console.error("Connection to MQTT Broker failed:", err);
    });

    client.on("message", (topic, message) => {
      if (topic === id) {
        console.log(message);
        const indications = JSON.parse(message.toString());
        setLight(indications.light);
        setHumidity(indications.humidity);
        setTemp(indications.temp);
      }
    });

    client.on("message", (topic, message) => {
      if (topic === id + "_controls") {
        const controls = JSON.parse(message.toString());
        console.log(controls);
        setLamp(controls.led);
        setNasos(controls.pump);
        setVent(controls.cooler);
        setDoor(controls.door);
      }
    });
    return () => {
      client.unsubscribe(id, (err) => {
        if (err) {
          console.error(`Unsubscribe from ${id} failed:`, err);
        } else {
          console.log(`Unsubscribed from ${id}`);
        }
      });
      client.unsubscribe(id + "_controls", (err) => {
        if (err) {
          console.error(`Unsubscribe from ${id + "_controls"} failed:`, err);
        } else {
          console.log(`Unsubscribed from ${id + "_controls"}`);
        }
      });

      client.end;
    };
  }, [id]);

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
              publish(3);
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
              publish(4);
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
              publish(1);
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
              publish(2);
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
