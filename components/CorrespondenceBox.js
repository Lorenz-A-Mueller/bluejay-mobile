import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMessagesQuery } from '../utils/queries';
import PastMessage from './PastMessage';

export default function CorrespondenceBox(props) {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  console.log('messages', messages);

  const {
    loading,
    error,
    data: getMessagesQueryData,
  } = useQuery(getMessagesQuery, {
    variables: { ticketID: props.ticketData.id },
    onCompleted: () => {
      console.log(getMessagesQueryData);
      setMessages(getMessagesQueryData.messages);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <View style={style.correspondence_container}>
      <Text style={style.title_box}>Some Placeholder Issue</Text>
      {messages.length &&
        messages.map((message) => (
          <PastMessage
            key={`message-${message.id}`}
            messageData={message}
            ticketData={props.ticketData}
          />
        ))}
      <View style={style.message_box}>
        <TextInput
          style={style.message_input}
          placeholder="Your Message"
          multiline={true}
          // numberOfLines={10}
          maxLength="1000"
          onChangeText={(text) => setMessageText(text)}
          value={messageText}
        />
        <TouchableOpacity
          style={style.send_button}
          onPress={() =>
            props.handleSendFurtherMessage(selectedCategory, title, messageText)
          }
        >
          <Text style={style.send_button_text}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  correspondence_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 284,
    // height: 512,
    height: 2000,
    backgroundColor: 'white',
    marginTop: 48,
    alignItems: 'center',
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
  },

  message_box: {},

  message_input: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    height: 284,
    width: 236,
    marginTop: 26,
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
});
