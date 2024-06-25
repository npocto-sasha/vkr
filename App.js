import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { getUserFromStorage } from "./Components/Tokens";
import { checkAuth } from "./Components/AuthHandler";

import Auth from "./Screens/Auth";
import User from "./Screens/User";
import Devices from "./Screens/Devices";
import Dashboard from "./Screens/Dashboard";
import Monitor from "./Screens/Monitor";
import Log from "./Screens/Log";
import Reg from "./Screens/Reg";
import Notifi from "./Screens/Notifi";
import TestModal from "./Screens/TestModal";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();

  function onAuth(_user) {
    setUser(_user);
  }
  function logOut() {
    setUser(null);
  }

  async function getUser() {
    const _user = await getUserFromStorage();
    if (_user.id) {
      const newUser = await checkAuth();

      setUser(newUser);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Reg}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Log}
          initialParams={{ onAuth }}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Devices"
          component={Devices}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          initialParams={{ user, logOut }}
          options={{
            title: "Профиль",
            headerTintColor: "#115ff9",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
              marginLeft: 50,
              color: "#115ff9",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notifi}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Monitor"
          component={Monitor}
          options={{
            title: "",
            headerTintColor: "#115ff9",
          }}
        />
        <Stack.Screen
          name="TestModal"
          component={TestModal}
          options={{
            title: "",
            headerTintColor: "#115ff9",
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
