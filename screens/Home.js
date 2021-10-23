import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import start_screen_background from '../assets/bluejay_background7.jpeg';
import transparent_logo from '../assets/full_logo_transparent.png';
import Screen from '../components/Screen';

export default function Home() {
  return (
    <Screen>
      <ImageBackground
        style={styles.background_image}
        source={start_screen_background}
        resizeMode="cover"
      >
        <Image
          source={transparent_logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 400,
    height: 182.2,
    marginTop: 40,
  },
});
