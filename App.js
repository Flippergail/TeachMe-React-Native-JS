import React from 'react';

// external packages
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';

header: ({ navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  
  return <MyHeader title={title} style={options.headerStyle}/>;
};

import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import HomeScreen from './app/Screens/HomeScreen';
import SettingsScreen from './app/Screens/SettingsScreen';

import colours from './app/config/colours';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator
        backBehavior='history'
        headerShown={false}

        screenOptions={({ route }) => ({
          tabBarStyle: {backgroundColor: colours.secondaryBackground},
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colours.primary,
          tabBarInactiveTintColor: 'gray',
        })}
        >
          <Tab.Screen name="Home" options={{tabBarShowLabel: false}} component={HomeScreen} />
          <Tab.Screen name="Settings" options={{tabBarShowLabel: false}} component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}