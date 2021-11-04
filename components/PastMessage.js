import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';

export default function PastMessage(props) {
  const [created, setCreated] = useState();
  console.log('props in single message', props);

  useEffect(() => {
    setCreated(transformTimestampIntoDatetime(props.messageData.created));
  }, []);
  return (
    <View style={style.past_message_container}>
      <View style={style.header}>
        <View style={style.header_text}>
          <Text>John</Text>
          <Text>{created && created.slice(0, -5)}</Text>
          <Text>{created && created.slice(-5)}</Text>
        </View>
        <Image style={style.header_image} />
      </View>
      <View style={style.message_box}>
        <Text>{props.messageData && props.messageData.content}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  past_message_container: {
    width: 236,
    height: 336,
    backgroundColor: '#2799E0',
    borderRadius: 12,
    marginTop: 20,
  },
  header: {},
  header_text: {},
  header_image: {},
  message_box: {},
});
