import 'react-native-gesture-handler';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createHttpLink } from 'apollo-link-http';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState } from 'react';
import MainScreen from './screens/ MainScreen';
import SignIn from './screens/SignInScreen';

const link = createHttpLink({
  // uri: 'https://api-bluejay.herokuapp.com/graphql',
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

const Stack = createStackNavigator();

export default function App() {
  useFonts({
    Fredoka: require('./assets/fonts/FredokaOne-Regular.ttf'),
  });
  return (
    <Fragment>
      <ApolloProvider client={client}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="main-screen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="sign-in">{(props) => <SignIn />}</Stack.Screen>
            <Stack.Screen name="main-screen">
              {(props) => <MainScreen />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Fragment>
  );
}
