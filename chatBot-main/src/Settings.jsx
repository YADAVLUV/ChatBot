import React from 'react';
import { View, Text, StyleSheet ,Button} from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function Settings ({ navigation }){
   const handleLogout = async () => {
      await signOut(auth);
      navigation.replace("Login");
    };
  
  return (
    <View style={styles.container}>
      
        <Button title="Logout" onPress={handleLogout} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

 
