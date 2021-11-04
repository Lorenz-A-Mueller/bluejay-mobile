import { useLazyQuery } from '@apollo/client';
import { isConstValueNode } from 'graphql';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getEmployeeFirstNameQuery } from '../utils/queries';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';

export default function PastMessage(props) {
  const [created, setCreated] = useState();
  const [authorFirstName, setAuthorFirstName] = useState('You');
  console.log('props in single message', props);

  useEffect(() => {
    setCreated(transformTimestampIntoDatetime(props.messageData.created));
    console.log(
      'props.messageData.responder_id',
      props.messageData.responder_id,
    );
    if (props.messageData.responder_id) {
      getEmployeeFirstName();
    }
  }, []);

  const [
    getEmployeeFirstName,
    { loading, error, data: getEmployeeFirstNameQueryData },
  ] = useLazyQuery(getEmployeeFirstNameQuery, {
    variables: { employeeID: props.messageData.responder_id },
    onCompleted: () => {
      setAuthorFirstName(getEmployeeFirstNameQueryData.employee.first_name);
    },
    fetchPolicy: 'network-only',
  });
  return (
    <View style={[style.past_message_container, { height: 'fit-content' }]}>
      <View style={style.header}>
        <View style={style.header_text}>
          <Text>{authorFirstName}</Text>
          <Text>{created && created.slice(0, -5)}</Text>
          <Text>{created && created.slice(-5)}</Text>
        </View>
        <Image style={style.header_image} />
      </View>
      <View style={style.message_box}>
        <Text>{props.messageData && props.messageData.content}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  past_message_container: {
    width: 236,
    height: 336,
    backgroundColor: '#2799E0',
    borderRadius: 12,
    marginTop: 20,
  },
  header: {},
  header_text: {},
  header_image: {},
  message_box: {},
});
