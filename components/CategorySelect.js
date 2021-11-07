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
      <Picker.Item label="select a category" value="5" />
      <Picker.Item label="Flight infos" value="1" />
      <Picker.Item label="Change flight" value="2" />
      <Picker.Item label="Suggestion" value="3" />
      <Picker.Item label="Complaint" value="4" />
      <Picker.Item label="Other" value="5" />
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
