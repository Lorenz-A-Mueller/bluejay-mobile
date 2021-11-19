import { gql, useLazyQuery, useQuery } from '@apollo/client';
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
import transparent_logo from '../assets/full_logo_transparent.png';
import loading_spinner from '../assets/spinner.gif';
import {
  logInValidationQuery,
  validateSessionTokenQuery,
} from '../utils/queries';

export default function SignIn(props) {
  const [accessDenied, setAccessDenied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [serverError, setServerError] = useState(false);
  const [wasPressed, setWasPressed] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    validateWhenMounting();
  }, []);

  const [validateWhenMounting] = useLazyQuery(validateSessionTokenQuery, {
    onCompleted: () => {
      navigation.navigate('main-screen');
    },
    onError: () => {
      // navigation.navigate('sign-in');
    },
    fetchPolicy: 'network-only',
  });

  // graphQL hook -- gets called on every render -> state var "wasPressed" designed to only allow query after pressing

  const { loading, error, data } = useQuery(logInValidationQuery, {
    variables: {
      userEmail: emailInput,
      userPassword: passwordInput,
    },
    onCompleted: () => {
      console.log('data', data);
      setWasPressed(false);
      setEmailInput('');
      setPasswordInput('');
      setAccessDenied(false);
      navigation.navigate('main-screen');
    },
    onError: () => {
      console.log('error: ', error);
      setEmailInput('');
      setPasswordInput('');
      setAccessDenied(true);
      setWasPressed(false);
    },
    skip: !wasPressed,
    fetchPolicy: 'network-only',
  });

  return (
    <KeyboardAvoidingView style={style.container} behavior="position">
      <View style={style.logo_container}>
        <Image style={style.logo} source={transparent_logo} />
      </View>
      {!loading ? (
        <View
          style={[
            style.sign_in_container,
            accessDenied &&
              {
                /* animation shake?  */
              },
          ]}
        >
          <Text style={style.header}>Sign In</Text>
          <Text style={style.label}>E-Mail-Address</Text>
          <TextInput
            style={style.emailInput}
            placeholder="your.email@gmail.com"
            onChangeText={(text) => setEmailInput(text)}
            value={emailInput}
          />
          <Text style={style.label}>Password</Text>
          <TextInput
            style={style.passwordInput}
            onChangeText={(text) => setPasswordInput(text)}
            value={passwordInput}
            textContentType="password"
            secureTextEntry={true}
          />
          {accessDenied && (
            <Text style={style.error_text}>Invalid email/password </Text>
          )}
          {serverError && (
            <Text style={style.error_text}>Error! Please try later! </Text>
          )}
          <TouchableOpacity
            style={style.button}
            onPress={() => setWasPressed(true)}
          >
            <Text style={style.button_text}>SIGN IN</Text>
          </TouchableOpacity>
          <Text
            style={style.need_help}
            onPress={() => navigation.navigate('sign-up')}
          >
            Create an Account
          </Text>
        </View>
      ) : (
        <View style={style.loading_container}>
          <Image source={loading_spinner} style={style.loading_spinner} />
          <Text style={style.loading_text}>loading...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
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
    marginBottom: 12,
    fontSize: 48,
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
  },
  emailInput: {
    height: 40,
    width: 236,
    borderWidth: 1,
    padding: 4,
    fontSize: 18,
  },
  passwordInput: {
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
