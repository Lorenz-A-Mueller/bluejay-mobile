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

const createTicketMutation = gql`
  mutation (
    $customer: ID
    $category: String
    $title: String
    $messages: [Int]
  ) {
    createNewTicket(
      customer_id: $customer
      category: $category
      title: $title
      messages: $messages
    ) {
      ticket_number
    }
  }
`;

const createMessageMutation = gql`
  mutation ($customerID: ID!, $content: String!) {
    createNewMessage(customer_id: $customerID, content: $content) {
      content
    }
  }
`;

// const createMessageMutation = gql`
//   mutation {
//     createNewMessage(customer_id: "1", content: "jojojo") {
//       content
//     }
//   }
// `;

export default function MainScreen(props) {
  const [showContactBox, setShowContactBox] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [chosenCategory, setChosenCategory] = useState('');
  const [chosenTitle, setChosenTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [ticketWasSent, setTicketWasSent] = useState(false);

  useEffect(() => {
    validateWhenMounting();
  }, []);

  // once customerId is set by lazyQuery "validate", trigger createTicket; but only once chosenTitle has been set not directly after mounting.
  // cannot send another message without refreshing (customerId stays the same)
  useEffect(() => {
    if (chosenTitle) createTicket();
  }, [customerId]);

  useEffect(() => {
    if (messageText) createMessage();
  }, [ticketWasSent]);

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
        setCustomerId(data2.customerSession.customer_id);
        //   createTicket(); // -> cannot do here bc customerId not yet set --> useEffect()
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
  ] = useMutation(createTicketMutation, {
    variables: {
      customer: customerId,
      category: chosenCategory,
      title: chosenTitle,
      messages: [1], // for testing
    },
    onCompleted: (data) => {
      console.log('data in 1st mutation', data);
      console.log('customerId', customerId);
      console.log('messageText', messageText);
      // createMessage();
      setTicketWasSent(true);
    },
    fetchPolicy: 'network-only',
  });

  const [
    createMessage,
    {
      loading: createMessageLoading,
      error: createMessageError,
      data: createMessageData,
    },
  ] = useMutation(createMessageMutation, {
    variables: {
      customerID: customerId,
      content: messageText,
    },
    onCompleted: (data) => console.log('createMessageData', data),
    fetchPolicy: 'network-only',
  });

  const handleSendFirstMessage = (selectedCategory, title, messageText) => {
    console.log(selectedCategory, title, messageText);
    setChosenCategory(selectedCategory);
    setChosenTitle(title);
    setMessageText(messageText);
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
