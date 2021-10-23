import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import MainScreen from './screens/ MainScreen';
import SignIn from './screens/Sign';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Fredoka: require('./assets/fonts/FredokaOne-Regular.ttf'),
  });
  return (
    <Fragment>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="main-screen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen name="main-screen" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
