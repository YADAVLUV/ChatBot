import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

const CustomInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CustomInput;
