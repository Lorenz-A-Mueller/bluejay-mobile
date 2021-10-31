import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import transparent_logo from '../assets/full_logo_transparent.png';
import ContactBox from '../components/ContactBox';
import GreyBox from '../components/GreyBox';
import Screen from '../components/Screen';

function getCookies(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

const validateSessionToken = gql`
  query ($token: String!) {
    customerSession(token: $token) {
      id
    }
  }
`;

export default function MainScreen(props) {
  const [showContactBox, setShowContactBox] = useState(false);
  const [currentSessionToken, setCurrentSessionToken] = useState(
    getCookies('sessionToken'),
  );
  useEffect(() => {}, []);
  console.log('currentSessionToken: ', currentSessionToken);
  const { loading, error, data } = useQuery(validateSessionToken, {
    variables: {
      token: currentSessionToken,
    },
    onCompleted: (data) => console.log(data),
    skip: !currentSessionToken,
  });
  const handleContactPress = () => {
    setShowContactBox((previous) => !previous);
  };
  return (
    // <Screen>
    <ScrollView>
      <Image source={transparent_logo} style={style.logo} />
      <Text style={style.header}>Welcome, placeholder!</Text>
      <GreyBox
        showContactBox={showContactBox}
        setIsLoggedIn={props.setIsLoggedIn}
        handleContactPress={handleContactPress}
      />
      {showContactBox && <ContactBox />}
    </ScrollView>
    // </Screen>
  );
}

const style = StyleSheet.create({
  logo: {
    width: 236,
    height: 112.87,
    marginTop: 40,
    alignSelf: 'flex-end',
  },
  header: {
    width: 284,
    height: 32,
    fontSize: 24,
    fontFamily: 'Fredoka',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 48,
  },
});
