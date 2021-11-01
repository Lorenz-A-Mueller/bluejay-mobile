import { Picker } from '@react-native-picker/picker';
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

export default function CategorySelect(props) {
  return (
    <Picker
      selectedValue={props.selectedCategory}
      style={style.picker}
      onValueChange={(item) => props.setSelectedCategory(item)}
    >
      <Picker.Item label="select a category" value="" />
      <Picker.Item label="complaint" value="complaint" />
      <Picker.Item label="suggestion" value="suggestion" />
    </Picker>
  );
}

const style = StyleSheet.create({
  picker: {
    height: 40,
    width: 236,
    marginTop: 32,
  },
});
