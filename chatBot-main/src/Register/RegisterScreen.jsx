import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebaseConfig";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { colors } from "../styles/theme";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await set(ref(database, "users/" + user.uid), { email });
      navigation.replace("Home");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      
      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <CustomButton title="Register" onPress={handleRegister} />
        <Text style={styles.infoText}>Password must be at least 6 characters long.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: colors.background, 
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: colors.primary,
  },
  error: { 
    color: "red", 
    textAlign: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
});

