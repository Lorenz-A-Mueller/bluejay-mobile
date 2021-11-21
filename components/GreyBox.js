import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import bird_icon from '../assets/bird-icon.png';
import contact_icon from '../assets/contact-icon.png';
import covid_icon from '../assets/covid-icon.png';
import globe_icon from '../assets/globe-icon.png';
import plane_icon from '../assets/plane-icon.png';
import settings_icon from '../assets/settings-icon.png';
import {
  deleteSessionMutation,
  getTicketByCustomerIdQuery,
} from '../utils/queries';

export default function GreyBox(props) {
  const navigation = useNavigation();

  console.log('props.messages in gray box: ', props.messages);

  useEffect(() => {
    // getTicketByCustomerId();
  }, []);

  const [deleteSession] = useMutation(deleteSessionMutation, {
    onCompleted: (data) => {
      // for data to be displayed, have to pass it here (not destructured two lines above)
      console.log('deleteSessionMutation', data);
    },
    fetchPolicy: 'network-only',
  });

  // **

  //** */

  const handleLogOutPress = () => {
    deleteSession();
    navigation.navigate('sign-in');
  };

  return (
    <View style={style.grey_box}>
      <View style={style.tile_box}>
        <TouchableOpacity style={style.tile}>
          <Image source={plane_icon} style={style.image} />
          <Text style={style.text}>My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.tile}>
          <Image source={globe_icon} style={style.image} />
          <Text style={style.text}>Miles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.tile}>
          <Image source={covid_icon} style={style.image} />
          <Text style={style.text}>Covid-19</Text>
        </TouchableOpacity>
      </View>
      <View style={style.tile_box}>
        <TouchableOpacity style={style.tile}>
          <Image source={bird_icon} style={style.image_bird} />
          <Text style={style.text_bird}>Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.tile,
            props.showContactBox && { backgroundColor: 'white' },
          ]}
          onPress={() => {
            props.handleContactPress();
            props.getMessages();
          }}
        >
          {props.messages.length &&
          props.messages[props.messages.length - 1].responder_id ? (
            <View style={style.notification} />
          ) : null}

          <Image source={contact_icon} style={style.image} />
          <Text style={style.text}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.tile}>
          <Image source={settings_icon} style={style.image} />
          <Text style={style.text}>Settings</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={style.log_out} onPress={handleLogOutPress}>
        <Text style={style.log_out_text}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  grey_box: {
    backgroundColor: '#E5E5E5',
    height: 400,
    width: 332,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'center',
  },
  tile_box: {
    width: 280,
    height: 108,
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  log_out: {
    marginTop: 48,
    marginRight: 26,
    backgroundColor: '#FF8484',
    width: 80,
    height: 48,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  log_out_text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tile: {
    height: 108,
    width: 80,
    backgroundColor: '#2799E0',
    alignItems: 'center',
  },
  image: {
    height: 56,
    width: 56,
    marginTop: 12,
  },
  image_bird: {
    height: 68,
    width: 49.54,
    marginTop: 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  text_bird: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 0,
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
