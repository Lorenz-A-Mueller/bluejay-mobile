import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import transparent_logo from '../assets/full_logo_transparent.png';
import ContactBox from '../components/ContactBox';
import GreyBox from '../components/GreyBox';
import Screen from '../components/Screen';

const validateSessionTokenQuery = gql`
  query {
    customerSession {
      id
    }
  }
`;

const validateSessionTokenWhenSendingQuery = gql`
  query {
    customerSession {
      customer_id
    }
  }
`;

const sendMessageMutation = gql`
  mutation (
    $number: String
    $customer: ID
    $category: String
    $title: String
    $messages: [Int]
  ) {
    createNewTicket(
      ticket_number: $number
      customer_id: $customer
      category: $category
      title: $title
      messages: $messages
    ) {
      ticket_number
    }
  }
`;

export default function MainScreen(props) {
  const [showContactBox, setShowContactBox] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [chosenCategory, setChosenCategory] = useState('');
  const [chosenTitle, setChosenTitle] = useState('');

  useEffect(() => {
    validateWhenMounting();
  }, []);

  useEffect(() => {
    createTicket();
  }, [customerId]);

  const [validateWhenMounting, { loading, error, data }] = useLazyQuery(
    validateSessionTokenQuery,
    {
      onCompleted: (data) => console.log('data', data),
      // must be set so the query doesn't use the cache (could not be called several times)
      fetchPolicy: 'network-only',
    },
  );

  const [validate, { loading: loading2, error: error2, data: data2 }] =
    useLazyQuery(validateSessionTokenWhenSendingQuery, {
      onCompleted: (data2) => {
        console.log('data2', data2);
        console.log(data2.customerSession.customer_id);
        setCustomerId(data2.customerSession.customer_id);
        //   createTicket(); // -> handle asynchronosity
      },
      fetchPolicy: 'network-only',
    });

  const [
    createTicket,
    {
      loading: sendMessageLoading,
      error: sendMessageError,
      data: sendMessageData,
    },
  ] = useMutation(sendMessageMutation, {
    variables: {
      number: '#22222222', // for testing
      customer: customerId,
      category: chosenCategory,
      title: chosenTitle,
      messages: [1], // for testing
    },
    onComplete: (thisData) => console.log('thisData', thisData),
  });

  const handleSendFirstMessage = (selectedCategory, title, messageText) => {
    console.log(selectedCategory, title, messageText);
    setChosenCategory(selectedCategory);
    setChosenTitle(title);
    // messageText
    validate();
  };

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
      {showContactBox && (
        <ContactBox handleSendFirstMessage={handleSendFirstMessage} />
      )}
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
