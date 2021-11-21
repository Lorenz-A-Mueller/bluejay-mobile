import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  PickerIOSComponent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  changeTicketLastResponseMutation,
  createMessageMutation,
} from '../utils/queries';
import PastMessage from './PastMessage';

export default function CorrespondenceBox(props) {
  const [messageText, setMessageText] = useState('');
  // const [messages, setMessages] = useState([]);

  console.log('props.messages', props.messages);

  // useEffect(() => {
  //   getMessages();
  // }, []);

  // const [getMessages, { data: getMessagesQueryData }] = useLazyQuery(
  //   getMessagesQuery,
  //   {
  //     variables: { ticketID: props.ticketData.id },
  //     onCompleted: () => {
  //       console.log(getMessagesQueryData);
  //       setMessages(getMessagesQueryData.messages);
  //     },
  //     fetchPolicy: 'network-only',
  //   },
  // );

  const handleSendFurtherMessage = () => {
    createNewMessage();
    setMessageText('');
  };

  const [
    createNewMessage,
    { data: createMessageMutationData, loading: createMessageMutationLoading },
  ] = useMutation(createMessageMutation, {
    variables: { ticketID: props.ticketData.id, content: messageText },
    onCompleted: () => {
      props.getMessages();
      setLastResponse();
    },
    fetchPolicy: 'network-only',
  });

  const [setLastResponse] = useMutation(changeTicketLastResponseMutation, {
    variables: {
      ticketID: props.ticketData.id,
    },
    onCompleted: (thisData) => {
      console.log('setLastResponseData: ', thisData);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <View style={[style.correspondence_container]}>
      <Text style={style.title_box}>{props.ticketData.title}</Text>
      {props.messages.length
        ? props.messages.map((message) => (
            <PastMessage
              key={`message-${message.id}`}
              messageData={message}
              ticketData={props.ticketData}
            />
          ))
        : null}
      {createMessageMutationLoading ? (
        <Text style={style.loading_message}>sending Message ...</Text>
      ) : null}
      <TextInput
        style={style.message_input}
        placeholder="Your Message"
        multiline={true}
        // numberOfLines={10}
        maxLength={1000}
        onChangeText={(text) => setMessageText(text)}
        value={messageText}
      />
      <TouchableOpacity
        style={style.send_button}
        onPress={() => handleSendFurtherMessage()}
      >
        <Text style={style.send_button_text}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  correspondence_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 284,
    // height: 512,
    // height: 2000,
    backgroundColor: 'white',
    marginTop: 48,
    alignItems: 'center',
    // flex: 1,
  },

  title_box: {
    width: 236,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    paddingTop: 8,
  },

  message_box: {},

  message_input: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    minHeight: 92,
    flex: 1,
    width: 236,
    marginTop: 26,
    textAlignVertical: 'top',
    padding: 8,
    fontSize: 16,
  },
  send_button: {
    backgroundColor: '#2799E0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 92,
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 24,
  },
  send_button_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading_message: {
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
});
