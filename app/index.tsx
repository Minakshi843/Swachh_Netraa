import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Title */}
      <Text style={[styles.title, { color: colors.primary }]}>Swachh Netra</Text>
      <Text style={[styles.tagline, { color: colors.primary }]}>A Smarter Way to See a Cleaner City</Text>

      {/* App Illustration */}
      <Image
        source={require('../assets/images/WasteCollectionAppInterfaceDesign.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Monitor waste, track collection, and help make your city cleaner — all in one app.
      </Text>

      {/* Get Started Button → Go to SignIn */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.push('./auth/signIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

