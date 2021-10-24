import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState } from 'react';
import MainScreen from './screens/ MainScreen';
import SignIn from './screens/SignInScreen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Fredoka: require('./assets/fonts/FredokaOne-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Fragment>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="sign-in"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="sign-in">
            {(props) => (
              <SignIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen name="main-screen">
            {(props) => (
              <MainScreen
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
