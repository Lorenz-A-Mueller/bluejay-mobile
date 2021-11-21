import { useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { isConstValueNode } from 'graphql';
import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import mail_icon from '../assets/mail-icon.png';
import telephone_icon from '../assets/telephone-icon.png';
import {
  getTicketByCustomerIdQuery,
  validateSessionTokenQuery,
} from '../utils/queries';
import CorrespondenceBox from './CorrespondenceBox';
import FirstMessageBox from './FirstMessageBox';

export default function ContactBox(props) {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    validateWhenMounting();
  }, []);

  const [validateWhenMounting] = useLazyQuery(validateSessionTokenQuery, {
    onCompleted: (data) => {
      if (!data.customerSession) {
        navigation.navigate('sign-in');
        return;
      }
    },
    onError: () => {
      navigation.navigate('sign-in');
    },
    fetchPolicy: 'network-only',
  });

  const handleOnPress = () => {
    setShowMessageBox((previous) => !previous);
    console.log('customerId', customerId);
  };

  return (
    <View style={[style.contact_box, !showMessageBox && { height: 236 }]}>
      <Text style={style.header}>Contact</Text>
      <View style={style.tile_box}>
        <TouchableOpacity style={style.tile}>
          <Image source={telephone_icon} style={style.image} />
          <Text style={style.text}>Call Us!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.tile, showMessageBox && { backgroundColor: 'white' }]}
          onPress={() => handleOnPress()}
        >
          {props.messages.length &&
          props.messages[props.messages.length - 1].responder_id ? (
            <View style={style.notification} />
          ) : null}
          <Image source={mail_icon} style={style.image} />
          <Text style={style.text}>Message</Text>
        </TouchableOpacity>
      </View>
      {showMessageBox && !props.ticketData.id ? (
        <FirstMessageBox
          handleSendFirstMessage={props.handleSendFirstMessage}
        />
      ) : showMessageBox && props.ticketData.id ? (
        <CorrespondenceBox
          ticketData={props.ticketData}
          handleSendFirstMessage={props.handleSendFirstMessage}
          messages={props.messages}
          getMessages={props.getMessages}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  contact_box: {
    backgroundColor: '#E5E5E5',
    height: 'auto',
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
  },
  notification: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
