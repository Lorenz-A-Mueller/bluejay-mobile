import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import mail_icon from '../assets/mail-icon.png';
import telephone_icon from '../assets/telephone-icon.png';
import MessageBox from './MessageBox';

export default function ContactBox() {
  const [showMessageBox, setShowMessageBox] = useState(true);
  return (
    <View style={[style.contact_box, showMessageBox && { height: 800 }]}>
      <Text style={style.header}>Contact</Text>
      <View style={style.tile_box}>
        <TouchableOpacity style={style.tile}>
          <Image source={telephone_icon} style={style.image} />
          <Text style={style.text}>Call Us!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.tile}>
          <Image source={mail_icon} style={style.image} />
          <Text style={style.text}>Message</Text>
        </TouchableOpacity>
      </View>
      {showMessageBox && <MessageBox />}
    </View>
  );
}

// const contact_box_style = StyleSheet.create({
//   backgroundColor: '#E5E5E5',
//   height: 236,
//   width: 332,
//   alignSelf: 'center',
//   borderRadius: 12,
//   marginTop: 32,
//   alignItems: 'center',
// });

const contact_box_large_style = StyleSheet.create({
  height: 800,
});

const style = StyleSheet.create({
  contact_box: {
    backgroundColor: '#E5E5E5',
    height: 236,
    width: 332,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'center',
  },
  contact_box_large: {
    backgroundColor: '#E5E5E5',
    height: 800,
    width: 332,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Fredoka',
    fontSize: 24,
    marginTop: 20,
  },
  tile_box: {
    width: 280,
    height: 108,
    marginTop: 32,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 26,
  },
  tile: {
    height: 108,
    width: 80,
    backgroundColor: '#2799E0',
    alignItems: 'center',
    marginRight: 17,
  },
  image: {
    height: 56,
    width: 56,
    marginTop: 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    // marginTop: 12,
  },
});
