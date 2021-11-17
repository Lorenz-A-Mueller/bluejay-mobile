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
import CategorySelect from './CategorySelect';

export default function FirstMessageBox(props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [messageText, setMessageText] = useState('');

  return (
    <View style={style.message_box}>
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <TextInput
        style={style.title_input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
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
        onPress={() =>
          props.handleSendFirstMessage(selectedCategory, title, messageText)
        }
      >
        <Text style={style.send_button_text}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  message_box: {
    width: 284,
    height: 512,
    backgroundColor: 'white',
    marginTop: 48,
    alignItems: 'center',
  },
  title_input: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    height: 40,
    width: 236,
    marginTop: 8,
  },
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
