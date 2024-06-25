import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

import Button from "../Components/Button";

export default function User() {
  const [name, setName] = useState("Фамилия Имя Отчество");
  const [mail, setMail] = useState("example@mail.com");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Вы уверены что хотите выйти?</Text>
          <Button
            textStyle={styles.text}
            text={"Выйти"}
            styl={styles.modalbtn}
            tuk={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
      <Image style={styles.img} source={require("../assets/User.png")} />
      <Text style={[styles.textSec, { fontWeight: "bold", marginTop: 24 }]}>
        {name}
      </Text>
      <Text style={[styles.textSec, { marginTop: 11 }]}>{mail}</Text>
      <Button
        textStyle={styles.text}
        text={"Выйти"}
        styl={styles.button}
        tuk={() => setModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
  },
  textSec: {
    color: "525252",
    fontSize: 18,
    textAlign: "center",
  },
  img: {
    marginHorizontal: "auto",
    width: 135,
    height: 135,
    marginTop: 80,
  },
  button: {
    width: 275,
    height: 45,
    marginTop: 202,
    borderRadius: 5,
    backgroundColor: "#115FF9",
    marginLeft: 68,
  },
  modalView: {
    alignItems: "center",
    margin: "auto",
    width: 350,
    height: 150,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: "525252",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  modalbtn: {
    width: 275,
    height: 45,
    borderRadius: 5,
    backgroundColor: "#115FF9",
    marginLeft: 0,
    marginTop: 20,
  },
});
