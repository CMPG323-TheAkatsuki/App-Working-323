import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';

const url = Constants.expoConfig?.extra?.MongoURL ?? '';

const LoginScreen = () => {
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
    <View style=
    {{ 
      marginTop: 10,
      width: '75%',
      alignSelf: 'center',

    }}>
      <TextInput
        style = {{marginTop: 100, height: 40, fontSize: 30, borderColor: 'Black', borderWidth: 2}}
        placeholder="User Number"
        onChangeText={(userNumber) => setUserNumber(userNumber)}
        keyboardType="numeric"
        value={userNumber}
      />
      <TextInput
        style = {{marginTop: 10, height: 40, fontSize: 30, borderColor: 'Black', borderWidth: 2}}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry
        />

      <View style={{ marginTop: 10 }}>
        <Button 
          title="Login" 
          onPress={handleLogin} 
        />
      </View>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
