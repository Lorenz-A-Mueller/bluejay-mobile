import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import transparent_logo from '../assets/full_logo_transparent.png';
import ContactBox from '../components/ContactBox';
import GreyBox from '../components/GreyBox';
import Screen from '../components/Screen';

export default function MainScreen() {
  const [showContactBox, setShowContactBox] = useState(true);
  return (
    // <Screen>
    <ScrollView>
      <Image source={transparent_logo} style={style.logo} />
      <Text style={style.header}>Welcome, placeholder!</Text>
      <GreyBox />
      {showContactBox && <ContactBox />}
    </ScrollView>
    // </Screen>
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
});
