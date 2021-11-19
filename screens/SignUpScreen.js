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
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSignedUp, setHasSignedUp] = useState(false);
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
        setErrorMessage('');
        setFirstNameInput('');
        setLastNameInput('');
        setEmailInput('');
        setPhoneNumberInput('');
        setDobInput('');
        setPasswordInput('');
        setHasSignedUp(true);
        setTimeout(() => {
          setHasSignedUp(false);
          navigation.navigate('sign-in');
        }, 4000);
      },
      onError: (error) => {
        console.log('error: ', error);
        setErrorMessage(error.message);
      },
      fetchPolicy: 'network-only',
    },
  );

  if (hasSignedUp) {
    return (
      <View style={style.container}>
        <View style={style.logo_container}>
          <Image style={style.logo} source={transparent_logo} />
        </View>
        <View style={style.success_message_container}>
          <Text style={style.success_message_text}>
            Account created! Please log in.
          </Text>
        </View>
      </View>
    );
  }

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
          <Text style={style.label}>First Name</Text>
          <TextInput
            style={style.input}
            placeholder="Your First Name"
            onChangeText={(text) => setFirstNameInput(text)}
            value={firstNameInput}
            accessibilityLabel="First Name"
            labelStyle={{ fontSize: 20 }}
          />
          <Text style={style.label}>Last Name</Text>
          <TextInput
            style={style.input}
            placeholder="Your Last Name"
            onChangeText={(text) => setLastNameInput(text)}
            accessibilityLabel="Last Name"
            value={lastNameInput}
          />
          <Text style={style.label}>E-Mail</Text>
          <TextInput
            style={style.input}
            placeholder="your.email@gmail.com"
            onChangeText={(text) => setEmailInput(text)}
            accessibilityLabel="E-Mail"
            value={emailInput}
          />
          <Text style={style.label}>Phone Number</Text>
          <TextInput
            style={style.input}
            placeholder="00234234323"
            onChangeText={(text) => setPhoneNumberInput(text)}
            value={phoneNumberInput}
            accessibilityLabel="Phone Number"
            keyboardType="numeric"
          />
          <Text style={style.label}>Date of Birth (MM-DD-YYYY)</Text>
          <TextInput
            style={style.input}
            placeholder="01-01-1970"
            onChangeText={(text) => setDobInput(text)}
            accessibilityLabel="Date of Birth"
            value={dobInput}
            // keyboardType="numeric"
          />
          <Text style={style.label}>Password</Text>
          <TextInput
            style={style.input}
            onChangeText={(text) => setPasswordInput(text)}
            accessibilityLabel="Password"
            value={passwordInput}
            textContentType="password"
            secureTextEntry={true}
          />
          {errorMessage ? (
            <Text style={style.error_text}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={style.button}
            onPress={() => createCustomer()}
          >
            <Text style={style.button_text}>SIGN UP</Text>
          </TouchableOpacity>
          <Text
            style={style.need_help}
            onPress={() => navigation.navigate('sign-in')}
          >
            Already have an account? Log In!
          </Text>
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
    marginBottom: 12,
    fontSize: 48,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  label: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    // marginTop: 48,
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
    marginTop: 20,
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
    alignSelf: 'center',
  },
  success_message_container: {
    backgroundColor: '#E5E5E5',
    height: 400,
    width: 332,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  success_message_text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 12,
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
