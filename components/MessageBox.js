import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MessageBox() {
  return (
    <View style={style.message_box}>
      <Text>MessageBox</Text>
    </View>
  );
}

const style = StyleSheet.create({
  message_box: {
    width: 284,
    height: 512,
    backgroundColor: 'white',
    marginTop: 48,
  },
});
