import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { colors } from "../styles/theme";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native'; // Import Lottie

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = async () => {
    setLoading(true); // Set loading to true before starting the login process
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false); // Set loading to false after login attempt (success or failure)
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={styles.card}>
          <Image
            source={require('../Images/WhatsApp Image 2025-02-11 at 12.39.49.jpeg')} // Corrected path
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome Back!</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {/* Conditionally render the button or the Lottie animation */}
          {loading ? (
            <LottieView
              source={require('../Images/loading_animation.json')} // Corrected path
              autoPlay
              loop
              style={styles.lottie} // Style the Lottie view
            />
          ) : (
            <CustomButton title="Login" onPress={handleLogin} style={styles.button} />
          )}

          <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.registerButton}>
            <Text style={styles.link}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // ... (rest of your styles)
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center vertically as well
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400, // Limit card width on larger screens
    backgroundColor: "#fff",
    padding: 25, // Increased padding
    borderRadius: 15, // More rounded corners
    elevation: 8, // Increased elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  logo: {
    width: 150, // Adjust logo size as needed
    height: 80,
    marginBottom: 20,
    alignSelf: 'center', // Center the logo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  input: { // Styles for the input fields
    marginBottom: 15,
  },
  button: { // Styles for the button
    marginTop: 10,
  },
  registerButton: { // Style for the register button container
    marginTop: 20, // Increased margin
    alignItems: "center",  // Center the text horizontally
  },
  link: {
    color: colors.primary,
    fontSize: 16, // Increased font size
  },
  lottie: { // Style for the Lottie animation
    width: 100, // Adjust size as needed
    height: 100,
    alignSelf: 'center', // Center the animation
    marginBottom: 10,  // Add some margin below
  },
});
