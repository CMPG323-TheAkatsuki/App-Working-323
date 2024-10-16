import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';

const url = Constants.expoConfig?.extra?.MongoURL ?? '';

// Define RootStackParamList directly in this file if it doesn't exist
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: Props) => {
  const [userNumber, setUserNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch({url}+'/login', { // Replace with your actual server IP or URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_number: userNumber, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token); // Store the token securely
        navigation.navigate('Home'); // Redirect to the home screen after successful login
      } else {
        setError(data.message); // Display error message
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('An error occurred during login: ' + err.message);
      } else {
        setError('An unknown error occurred during login. No u');
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="User Number"
        value={userNumber}
        onChangeText={(text) => setUserNumber(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
