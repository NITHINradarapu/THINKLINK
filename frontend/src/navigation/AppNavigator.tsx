import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/theme';
import EmergencyModal from '../components/EmergencyModal';
import { TouchableOpacity } from 'react-native';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import IncidentsScreen from '../screens/IncidentsScreen';
import ControlsScreen from '../screens/ControlsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

import { useTelemetry } from '../context/TelemetryContext';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { showOnboarding, setShowOnboarding } = useTelemetry();

  const handleViewReport = () => {
    if (navigationRef.current) {
      navigationRef.current.navigate('Incidents');
    }
  };

  if (showOnboarding) {
    return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'cube';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Sensors') {
              iconName = focused ? 'speedometer' : 'speedometer-outline';
            } else if (route.name === 'Analytics') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            } else if (route.name === 'Incidents') {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';
            } else if (route.name === 'Controls') {
              iconName = focused ? 'options' : 'options-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            paddingBottom: 6,
            paddingTop: 6,
            height: 60,
          },
          headerStyle: {
            backgroundColor: COLORS.surface,
            borderBottomColor: COLORS.border,
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: route.name === 'Settings' ? undefined : () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }} 
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={22} color={COLORS.textPrimary} />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'ThinkLink Home', tabBarLabel: 'Home' }}
        />
        <Tab.Screen 
          name="Sensors" 
          component={DashboardScreen} 
          options={{ title: 'Telemetry Sensors', tabBarLabel: 'Sensors' }}
        />
        <Tab.Screen 
          name="Analytics" 
          component={AnalyticsScreen} 
          options={{ title: 'Data Analytics', tabBarLabel: 'Analytics' }}
        />
        <Tab.Screen 
          name="Incidents" 
          component={IncidentsScreen} 
          options={{ title: 'Incident Logs', tabBarLabel: 'Incidents' }}
        />
        <Tab.Screen 
          name="Controls" 
          component={ControlsScreen} 
          options={{ title: 'System Controls', tabBarLabel: 'Controls' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            title: 'IP Settings',
            tabBarButton: () => null, // Hidden from bottom tab bar
          }}
        />
      </Tab.Navigator>
      <EmergencyModal onViewReport={handleViewReport} />
    </NavigationContainer>
  );
}
