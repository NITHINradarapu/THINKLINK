import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { TelemetryProvider } from './src/context/TelemetryContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <TelemetryProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </TelemetryProvider>
    </SafeAreaProvider>
  );
}

