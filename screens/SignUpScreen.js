import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import transparent_logo from '../assets/full_logo_transparent.png';
import loading_spinner from '../assets/spinner.gif';
import { createCustomerMutation } from '../utils/queries';

export default function SignUp() {
  const [accessDenied, setAccessDenied] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [dobInput, setDobInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [serverError, setServerError] = useState(false);
  // const [wasPressed, setWasPressed] = useState(false);
  const navigation = useNavigation();

  const [createCustomer, { loading, error, data }] = useMutation(
    createCustomerMutation,
    {
      variables: {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput,
        phoneNumber: phoneNumberInput,
        dob: dobInput,
      },
      onCompleted: (data) => {
        console.log('createCustomerData: ', data);
      },
      fetchPolicy: 'network-only',
    },
  );

  return (
    <View style={style.container}>
      <View style={style.logo_container}>
        <Image style={style.logo} source={transparent_logo} />
      </View>
      {!loading ? (
        <ScrollView
          style={[
            style.sign_up_container,
            accessDenied &&
              {
                /* animation shake?  */
              },
          ]}
        >
          <Text style={style.header}>Sign Up</Text>
          <TextInput
            style={style.input}
            placeholder="First Name"
            onChangeText={(text) => setFirstNameInput(text)}
            value={firstNameInput}
          />
          <TextInput
            style={style.input}
            placeholder="Last Name"
            onChangeText={(text) => setLastNameInput(text)}
            value={lastNameInput}
          />
          <TextInput
            style={style.input}
            placeholder="E-Mail"
            onChangeText={(text) => setEmailInput(text)}
            value={emailInput}
          />
          <TextInput
            style={style.input}
            placeholder="phone number"
            onChangeText={(text) => setPhoneNumberInput(text)}
            value={phoneNumberInput}
          />
          <TextInput
            style={style.input}
            placeholder="Date of Birth"
            onChangeText={(text) => setDobInput(text)}
            value={dobInput}
          />
          <TextInput
            style={style.input}
            placeholder="Password"
            onChangeText={(text) => setPasswordInput(text)}
            value={passwordInput}
          />
          {accessDenied && (
            <Text style={style.error_text}>Invalid number/password </Text>
          )}
          {serverError && (
            <Text style={style.error_text}>Error! Please try later! </Text>
          )}
          <TouchableOpacity
            style={style.button}
            onPress={() => createCustomer()}
          >
            <Text style={style.button_text}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={style.need_help}>Need help?</Text>
        </ScrollView>
      ) : (
        <View style={style.loading_container}>
          <Image source={loading_spinner} style={style.loading_spinner} />
          <Text style={style.loading_text}>loading...</Text>
        </View>
      )}
    </View>
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
  sign_up_container: {
    width: 284,
    height: 512,
    marginTop: 56,
    backgroundColor: 'white',
    borderRadius: 12,
    // alignItems: 'center',
    flex: 1,
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
    alignSelf: 'center',
  },
  input: {
    marginTop: 48,
    height: 40,
    width: 236,
    borderWidth: 1,
    padding: 4,
    fontSize: 18,
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  button_text: {
    color: 'white',
    fontSize: 18,
  },
  need_help: {
    textDecorationLine: 'underline',
    marginTop: 40,
    alignSelf: 'center',
  },
  loading_container: {
    width: 284,
    height: 512,
    marginTop: 56,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading_spinner: {
    width: 200,
    height: 200,
  },
  loading_text: {
    marginTop: 92,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error_text: {
    color: 'red',
    marginTop: 26,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// const shake = keyframes`
//     from, 20%, 53%, 80%, to {
//       transform: translate(0);
//     }
//     40%, 43% {
//       transform: translate(-30px);
//     }
//     70% {
//       transform: translate(30px);
//     }
//     90% {
//       transform: translate(-10px);
//     }
//   `;
