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
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import transparent_logo from '../assets/full_logo_transparent.png';
import ContactBox from '../components/ContactBox';
import GreyBox from '../components/GreyBox';
import Screen from '../components/Screen';

const validateSessionToken = gql`
  query ($token: String!) {
    customerSession(token: $token) {
      id
    }
  }
`;

export default function MainScreen(props) {
  const [showContactBox, setShowContactBox] = useState(false);
  const handleContactPress = () => {
    setShowContactBox((previous) => !previous);
  };
  const { loading, error, data } = useQuery(validateSessionToken, {
    variables: {
      token:
        'Jw3f4T6mTGR8WmymhyyKYZg9WVfCepuAXaxpIhsJAMc5wGzoIG/Ks+I1a/ADVmCFAzXWZjrH6/zgSJMuLkI6eA==',
    },
  });

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
