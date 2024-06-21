import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import Auth from "./Screens/Auth";
import User from "./Screens/User";
import Devices from "./Screens/Devices";
import Dashboard from "./Screens/Dashboard";
import Monitor from "./Screens/Monitor";
import Log from "./Screens/Log";
import Reg from "./Screens/Reg";
import Notifi from "./Screens/Notifi";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();

  function onAuth(_user) {
    setUser(_user);
  }

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
        <Stack.Screen name="User" component={User} options={{}} />
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
            headerShown: false,
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
