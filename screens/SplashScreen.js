import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'; // Import Expo SplashScreen

const SplashScreenComponent = ({ navigation }) => {
  useEffect(() => {
    // Prevent the splash screen from hiding automatically
    SplashScreen.preventAutoHideAsync();

    // Simulate some delay (e.g., fetching data, checking authentication)
    setTimeout(() => {
      // Hide the splash screen
      SplashScreen.hideAsync();

      // Navigate to the Home screen after the splash screen
      navigation.replace('Projects'); // Use 'replace' to avoid going back to splash
    }, 3000); // 3 seconds delay, adjust as needed
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to My App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Splash screen background color
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreenComponent;
