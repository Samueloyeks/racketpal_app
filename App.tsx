/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import ActionCompletedPage from './src/pages/ActionCompleted';
import LandingActionCompleted from './src/pages/LandingActionCompleted';
import SelectVersion from './src/pages/SelectVersion';
import Landing from './src/pages/Landing';
import Contact from './src/pages/Contact';
import CustomModal from './src/components/CustomModal';
import RatingModal from './src/components/RatingModal';
import { ssEvents } from './src/config';
import { EventSourceListener } from "react-native-sse";

const Stack = createNativeStackNavigator();

const App = () => {
  const navigationRef = React.createRef();

  useEffect(() => {
    const listener: EventSourceListener = (event) => {
      if (event.type === "message") {

        navigationRef.current?.navigate("CustomModal");
      }
    };

    ssEvents.addEventListener("message", listener);
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage}></Stack.Screen>
        <Stack.Screen name='SelectVersion' component={SelectVersion}></Stack.Screen>
        <Stack.Screen name='Home' component={HomePage}></Stack.Screen>
        <Stack.Screen name='Landing' component={Landing}></Stack.Screen>
        <Stack.Screen name='ActionCompleted' component={ActionCompletedPage} options={{ title: 'Success' }}></Stack.Screen>
        <Stack.Screen name='LandingActionCompleted' component={LandingActionCompleted} options={{ title: 'Success' }}></Stack.Screen>
        <Stack.Screen name='Contact' component={Contact}></Stack.Screen>
        <Stack.Screen name='CustomModal' component={CustomModal} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='RatingModal' component={RatingModal} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
