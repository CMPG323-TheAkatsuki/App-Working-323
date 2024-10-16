import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

export default function LoginScreen({}) {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (studentNumber === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    // Placeholder logic for authentication
    // Replace this with actual API call or authentication logic
    if (studentNumber === '12345' && password === 'password') {
      Alert.alert('Success', 'Login successful!');
      // Navigate to the next screen after successful login
    } else {
      Alert.alert('Error', 'Invalid student number or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Student Login</Text>

      {/* Student Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Student Number"
        keyboardType="numeric"
        value={studentNumber}
        onChangeText={text => setStudentNumber(text)}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#1E90FF',
    fontSize: 16,
    marginTop: 20,
  },
});
