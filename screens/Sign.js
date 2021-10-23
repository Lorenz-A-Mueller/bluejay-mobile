import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import transparent_logo from '../assets/full_logo_transparent.png';
import Screen from '../components/Screen';

export default function SignIn() {
  return (
    <Screen>
      <View style={style.container}>
        <View style={style.logo_container}>
          <Image style={style.logo} source={transparent_logo} />
        </View>
        <View style={style.sign_in_container}>
          <Text style={style.header}>Sign In</Text>
          <TextInput
            style={style.numberInput}
            placeholder="Blue Jay Premium Number"
          />
          <TextInput style={style.passwordInput} placeholder="Password" />
          <TouchableOpacity style={style.button}>
            <Text style={style.button_text}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={style.need_help}>Need help?</Text>
        </View>
      </View>
    </Screen>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#2799E0',
    flex: 1,
    alignItems: 'center',
  },
  logo_container: {
    width: 284,
    height: 148,
    backgroundColor: 'white',
    marginTop: 56,
    borderRadius: 12,
  },
  sign_in_container: {
    width: 284,
    height: 512,
    marginTop: 56,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 148,
    marginTop: 6,
  },
  header: {
    marginTop: 40,
    fontSize: 48,
    fontWeight: 'bold',
  },
  numberInput: {
    marginTop: 48,
    height: 40,
    width: 236,
    borderWidth: 1,
    padding: 4,
    fontSize: 18,
  },
  passwordInput: {
    marginTop: 26,
    height: 40,
    width: 236,
    borderWidth: 1,
    padding: 4,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2799E0',
    marginTop: 68,
    width: 236,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: 'white',
    fontSize: 18,
  },
  need_help: {
    textDecorationLine: 'underline',
    marginTop: 40,
  },
});
