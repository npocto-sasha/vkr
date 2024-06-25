import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { getToken } from "../Components/ResHandler";
import { DeviceService } from "../Components/ResHandler";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import { useNavigation } from "@react-navigation/native";
// KjsOLA9<>
export default function Devices() {
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [devices, setDevices] = useState();

  async function getDev() {
    await getToken();
    const dev = await DeviceService.getMyDevices();
    var temp = dev;
    temp.push({
      name: "Добавить устройство",
      id: null,
    });
    setDevices(temp);
    console.log(temp);
  }

  async function delDev(id) {
    await getToken();
    const dev = await DeviceService.delete(id);
    console.log(dev);
    await getDev();
  }
  async function addDev() {
    if (name && id && key) {
      const dev = await DeviceService.activate({
        name: name,
        number: id,
        activationKey: key,
      });
      if (dev) {
        Alert.alert("Успех");
        var temp = devices;
        temp.push(dev);
        setDevices(temp);
      }
    }
  }
  useLayoutEffect(() => {
    getDev();
  }, []);

  var name = "";
  var id = "";
  var key = "";

  function changeId(text) {
    id = text;
  }
  function changeName(text) {
    name = text;
  }
  function changeKey(text) {
    key = text;
  }
  const [curDeviceName, setCurDeviceName] = useState("");
  const [curDeviceId, setCurDeviceId] = useState(1);

  const navigation = useNavigation();
  const keyExtractor = (item) => item.id;
  const ListItem = ({ data }) => {
    return (
      <View>
        {data.id ? (
          <View style={styles.item}>
            <Text style={styles.itemText}>Название: {data.name}</Text>

            <Text style={styles.itemText}>Номер клиента: {data.number}</Text>

            <TouchableOpacity
              style={styles.itemDeleteBtn}
              onPress={() => {
                setDelModalVisible(!delModalVisible);
                setCurDeviceId(data.number);
                setCurDeviceName(data.name);
              }}
            >
              <Text style={styles.itemDeleteText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setAddModalVisible(!addModalVisible);
            }}
          >
            <Text style={styles.itemText}>Активировать устройство</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const DelModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={delModalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Удалить устройство "{curDeviceName}"?
          </Text>
          <Button
            textStyle={styles.text}
            text={"Удалить"}
            styl={styles.modalbtn}
            tuk={() => {
              setDelModalVisible(!delModalVisible);
              delDev(data.id);
            }}
          />
          <Button
            tuk={() => {
              setDelModalVisible(!delModalVisible);
            }}
            text={"Закрыть"}
            textStyle={[
              styles.text,
              {
                color: "black",
                fontWeight: "light",
                fontSize: 14,
                marginHorizontal: "auto",
              },
            ]}
            styl={{
              width: 115,
              height: 45,
              marginLeft: 0,
            }}
          />
        </View>
      </Modal>
    );
  };
  const AddModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={addModalVisible}>
        <View style={styles.addModalView}>
          <Image style={styles.logo} source={require("../assets/Logo.png")} />

          <Text style={styles.title}>Активация устройства</Text>

          <Text style={styles.inputTitle}>Название устройства</Text>

          <TextInput
            style={styles.Txtin}
            onChangeText={(text) => {
              changeName(text);
            }}
            placeholder="Введите название устройства"
          />

          <Text style={styles.inputTitle}>ID устройства</Text>
          <TextInput
            style={styles.Txtin}
            onChangeText={(text) => {
              changeId(text);
            }}
            placeholder="Введите ID"
          />

          <Text style={styles.inputTitle}>Ключ активации</Text>
          <TextInput
            style={styles.Txtin}
            onChangeText={(text) => {
              changeKey(text);
            }}
            placeholder="Введите ключ активации"
          />

          <Button
            tuk={() => {
              addDev();
              setAddModalVisible(!addModalVisible);
            }}
            text={"Создать"}
            styl={styles.modalbtn}
            textStyle={styles.text}
          />
          <Button
            tuk={() => setAddModalVisible(!addModalVisible)}
            text={"Закрыть"}
            textStyle={[
              styles.text,
              { color: "black", fontWeight: "light", fontSize: 14 },
            ]}
            styl={[styles.modalbtn, { backgroundColor: "white" }]}
          />
        </View>
      </Modal>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DelModal />
      <AddModal />
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
      <View style={styles.body}>
        <FlatList
          data={devices}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => <ListItem data={item} />}
        />
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
    paddingTop: 12,
  },
  itemText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
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
  itemAddText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
  },
  body: {
    height: Dimensions.get("window").height - 115 - 33,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
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
    height: 180,
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
  addModalView: {
    alignItems: "center",
    margin: "auto",
    width: 350,
    height: 590,
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
  logo: {
    marginHorizontal: "auto",
    width: 106,
    height: 106,
    marginTop: 54,
  },
  Txtin: {
    marginHorizontal: "auto",
    borderRadius: 5,
    backgroundColor: "#C2CEE4",
    width: 275,
    height: 40,
    paddingLeft: 8,
    color: "#525252",
    fontSize: 18,
  },
  title: {
    marginHorizontal: "auto",
    marginTop: 30,
    marginBottom: 10,
    fontSize: 24,
    color: "#115FF9",
  },
  inputTitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#115FF9",
  },
});
