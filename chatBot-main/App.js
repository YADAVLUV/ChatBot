import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/Login/LoginScreen";
import RegisterScreen from "./src/Register/RegisterScreen";
import HomeScreen from "./src/HomeScreen";
import SettingsScreen from "./src/Settings"; // Assuming you want to add Settings as a tab
import { Ionicons } from "@expo/vector-icons"; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Settings") iconName = "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{ headerShown: false }} 
      />
      <Tab.Screen name="Settings"
       component={SettingsScreen}
      options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Home" 
          component={HomeTabs} 
          options={{ headerShown: false }} // Hide header for Home
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}