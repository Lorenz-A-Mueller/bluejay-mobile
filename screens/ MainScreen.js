import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { visitWithTypeInfo } from 'graphql';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import transparent_logo from '../assets/full_logo_transparent.png';
import loading_spinner from '../assets/spinner.gif';
import ContactBox from '../components/ContactBox';
import GreyBox from '../components/GreyBox';
import {
  createMessageMutation,
  createTicketMutation,
  validateSessionTokenQuery,
  validateSessionTokenWhenSendingQuery,
} from '../utils/queries';

export default function MainScreen(props) {
  const [showContactBox, setShowContactBox] = useState(false);
  const [ticketId, setTicketId] = useState();
  const [customerId, setCustomerId] = useState();
  const [chosenCategory, setChosenCategory] = useState('');
  const [chosenTitle, setChosenTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [newMessageId, setNewMessageId] = useState('');
  const [isLoadingAfterSending, setIsLoadingAfterSending] = useState(false);
  const [isCompletedAfterSending, setIsCompletedAfterSending] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    validateWhenMounting();
  }, []);

  const [validateWhenMounting] = useLazyQuery(validateSessionTokenQuery, {
    onCompleted: (data) => console.log('data', data),
    onError: () => {
      navigation.navigate('sign-in');
    },
    fetchPolicy: 'network-only',
  });

  const handleSendFirstMessage = (selectedCategory, title, messageText) => {
    setChosenCategory(selectedCategory);
    setChosenTitle(title);
    setMessageText(messageText);
    validate();
  };

  const [validate] = useLazyQuery(validateSessionTokenWhenSendingQuery, {
    onCompleted: (data) => {
      setCustomerId(data.customerSession.customer_id);
    },
    fetchPolicy: 'network-only',
  });

  // once customerId is set by lazyQuery "validate", trigger createMessage; but only once chosenTitle has been set (not directly after mounting).
  // cannot send another message without refreshing (customerId stays the same)

  useEffect(() => {
    if (customerId) createTicket();
  }, [customerId]);

  const [createTicket] = useMutation(createTicketMutation, {
    variables: {
      customer: customerId,
      category: chosenCategory,
      title: chosenTitle,
    },
    onCompleted: (data) => {
      console.log('data in createTicket', data);
      setTicketId(data.createNewTicket.id);
      setIsLoadingAfterSending(true);
      setTimeout(() => {
        setShowContactBox(false);
        setIsLoadingAfterSending(false);
        setIsCompletedAfterSending(true);
        setTimeout(() => {
          setIsCompletedAfterSending(false);
        }, 2000);
      }, 1000);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (ticketId) {
      createMessage();
      // console.log('newMessageId in use effect: ', newMessageId);
    }
  }, [ticketId]);

  const [createMessage] = useMutation(createMessageMutation, {
    variables: {
      ticketID: ticketId,
      content: messageText,
    },
    onCompleted: (data) => {
      setNewMessageId(data.createNewMessage.id);
      console.log('data in createMessage: ', data);
    },
    fetchPolicy: 'network-only',
  });

  const handleContactPress = () => {
    setShowContactBox((previous) => !previous);
  };

  if (isLoadingAfterSending || isCompletedAfterSending) {
    return (
      <ScrollView>
        <Image source={transparent_logo} style={style.logo} />
        <Text style={style.header}>Welcome, placeholder!</Text>
        {isLoadingAfterSending ? (
          <View style={style.loading_container}>
            <Image source={loading_spinner} style={style.loading_spinner} />
            <Text style={style.loading_text}>loading...</Text>
          </View>
        ) : (
          <View style={style.success_message_container}>
            <Text style={style.success_message_text}>Message sent!</Text>
          </View>
        )}
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <Image source={transparent_logo} style={style.logo} />
      <Text style={style.header}>Welcome, placeholder!</Text>
      <GreyBox
        showContactBox={showContactBox}
        handleContactPress={handleContactPress}
      />
      {showContactBox && (
        <ContactBox handleSendFirstMessage={handleSendFirstMessage} />
      )}
    </ScrollView>
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
  loading_container: {
    width: 284,
    height: 512,
    marginTop: 56,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading_spinner: {
    width: 200,
    height: 200,
  },
  loading_text: {
    marginTop: 92,
    fontWeight: 'bold',
    fontSize: 16,
  },
  success_message_container: {
    backgroundColor: '#E5E5E5',
    height: 400,
    width: 332,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  success_message_text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 12,
  },
});
