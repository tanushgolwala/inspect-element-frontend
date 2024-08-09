import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import LoginPage from './screens/LoginPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SpeechText from './screens/SpeechText';



const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string>("LoginPage");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setInitialRoute("SpeechText");
    }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute!}>
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SpeechText" component={SpeechText} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
