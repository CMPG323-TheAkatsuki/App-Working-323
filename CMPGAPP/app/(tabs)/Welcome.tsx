import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image 
        source={{ uri: 'https://example.com/logo.png' }} // Replace with your logo URL
        style={styles.logo}
      />

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome to Our App!</Text>

      {/* Description */}
      <Text style={styles.description}>
        Discover amazing features and explore the world with our mobile app.
      </Text>

      {/* Call-to-Action Button */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Get Started</Text>
      </TouchableOpacity>

      {/* Secondary Button */}
      <TouchableOpacity>
        <Text style={styles.secondaryText}>Learn More</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  ctaText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#1E90FF',
    fontSize: 16,
    marginTop: 20,
  },
});
