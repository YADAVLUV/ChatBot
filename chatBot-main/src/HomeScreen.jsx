import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ChatScreen from "./ChatScreen";

export default function HomeScreen({ navigation }) {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home</Text>
      <ChatScreen/>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
});
