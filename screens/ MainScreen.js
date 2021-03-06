import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import transparent_logo from '../assets/full_logo_transparent.png';
import loading_spinner from '../assets/spinner.gif';
import ContactBox from '../components/ContactBox';
import GreyBox from '../components/GreyBox';
import {
  createMessageMutation,
  createTicketMutation,
  getCustomerNameQuery,
  getMessagesQuery,
  getTicketByCustomerIdQuery,
  validateSessionTokenQuery,
  validateSessionTokenWhenSendingQuery,
} from '../utils/queries';

export default function MainScreen(props) {
  const [showContactBox, setShowContactBox] = useState(false);
  const [chosenCategory, setChosenCategory] = useState('');
  const [chosenTitle, setChosenTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isLoadingAfterSending, setIsLoadingAfterSending] = useState(false);
  const [isCompletedAfterSending, setIsCompletedAfterSending] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const [customerId, setCustomerId] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // validate the sessionToken (in cookies)

  useEffect(() => {
    validateWhenMounting();
  }, []);

  const [validateWhenMounting, { data: validateSessionTokenQueryData }] =
    useLazyQuery(validateSessionTokenQuery, {
      onCompleted: () => {
        if (!validateSessionTokenQueryData.customerSession) {
          navigation.navigate('sign-in');
        } else {
          // if successful, get customer first name for displaying
          console.log(
            'validateSessionTokenQueryData.customerSession.customer_id: ',
            validateSessionTokenQueryData.customerSession.customer_id,
          );
          setCustomerId(
            validateSessionTokenQueryData.customerSession.customer_id,
          );
          getCustomerName({
            variables: {
              customerID:
                validateSessionTokenQueryData.customerSession.customer_id,
            },
          });
        }
      },
      // if not, throw back to sign-in
      onError: () => {
        navigation.navigate('sign-in');
      },
      fetchPolicy: 'network-only',
    });

  const [getCustomerName, { data: getCustomerNameQueryData }] = useLazyQuery(
    getCustomerNameQuery,
    {
      onCompleted: () => {
        // getTicketByCustomerId();
      },
    },
  );

  const handleSendFirstMessage = (selectedCategory, title, messageText) => {
    setChosenCategory(selectedCategory);
    setChosenTitle(title);
    setMessageText(messageText);
    validate();
  };

  const [validate, { data: validateSessionTokenWhenSendingQueryData }] =
    useLazyQuery(validateSessionTokenWhenSendingQuery, {
      onCompleted: (data) => {
        createTicket({
          variables: {
            customer: data.customerSession.customer_id,
            category: chosenCategory,
            title: chosenTitle,
          },
        });
      },
      onError: () => {},
      fetchPolicy: 'network-only',
    });

  // once customerId is set by lazyQuery "validate", trigger createMessage; but only once chosenTitle has been set (not directly after mounting).
  // cannot send another message without refreshing (customerId stays the same)

  const [createTicket] = useMutation(createTicketMutation, {
    onCompleted: (data) => {
      createMessage({
        variables: { ticketID: data.createNewTicket.id, content: messageText },
      });
      setIsLoadingAfterSending(true);
      setTimeout(() => {
        setShowContactBox(false);
        setIsLoadingAfterSending(false);
        setIsCompletedAfterSending(true);
        setTimeout(() => {
          setIsCompletedAfterSending(false);
          // getTicketByCustomerId();
        }, 2000);
      }, 1000);
    },
    onError: () => {},
    fetchPolicy: 'network-only',
  });

  const [createMessage] = useMutation(createMessageMutation, {
    onCompleted: (data) => {},
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    console.log('customerId: ', customerId);
    if (customerId) {
      getTicketByCustomerId();
    }
  }, [customerId]);

  useEffect(() => {
    if ('id' in ticketData) {
      getMessages();
    }
  }, [ticketData]);

  const [getMessages, { data: getMessagesQueryData }] = useLazyQuery(
    getMessagesQuery,
    {
      variables: { ticketID: ticketData.id },
      onCompleted: () => {
        setMessages(getMessagesQueryData.messages);
      },
      fetchPolicy: 'network-only',
    },
  );

  //

  const [getTicketByCustomerId, { data: getTicketByCustomerIdData }] =
    useLazyQuery(getTicketByCustomerIdQuery, {
      variables: {
        customerID: customerId,
      },
      onCompleted: () => {
        console.log('TICKET - data in ContactBox', getTicketByCustomerIdData);
        setTicketData(getTicketByCustomerIdData.ticket || {});
        console.log(
          'getTicketByCustomerIdData.ticket: ',
          getTicketByCustomerIdData.ticket,
        );
      },
      onError: () => {
        console.log('here');
      },

      fetchPolicy: 'network-only',
    });

  if (isLoadingAfterSending || isCompletedAfterSending) {
    return (
      <ScrollView
        ref={(ref) => (scrollView = ref)}
        onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
      >
        <Image source={transparent_logo} style={style.logo} />
        <Text style={style.header}>
          Welcome,{' '}
          {getCustomerNameQueryData
            ? getCustomerNameQueryData.customer.first_name
            : null}
          !
        </Text>
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
      <Text style={style.header}>
        Welcome,{' '}
        {getCustomerNameQueryData
          ? getCustomerNameQueryData.customer.first_name
          : null}
        !
      </Text>
      <GreyBox
        showContactBox={showContactBox}
        handleContactPress={() => {
          setShowContactBox((previous) => !previous);
          getTicketByCustomerId();
        }}
        ticketData={ticketData}
        messages={messages}
        getMessages={getMessages}
      />
      {showContactBox && (
        <ContactBox
          handleSendFirstMessage={handleSendFirstMessage}
          ticketData={ticketData}
          messages={messages}
          getMessages={getMessages}
        />
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
