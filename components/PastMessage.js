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
    if (props.messageData.created) {
      setCreated(transformTimestampIntoDatetime(props.messageData.created));
    }
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
    <View
      style={[
        style.past_message_container,
        authorFirstName === 'You' && { alignSelf: 'flex-end', marginRight: 24 },
      ]}
    >
      <View style={style.header}>
        <View style={style.header_text}>
          <Text
            style={[
              style.author_text,
              authorFirstName === 'You' && { alignSelf: 'flex-end' },
            ]}
          >
            {authorFirstName}
          </Text>
          <Text
            style={[
              style.time_text,
              authorFirstName === 'You' && { alignSelf: 'flex-end' },
            ]}
          >
            {created ? created.slice(0, -5) : null} -
            {created ? created.slice(-5) : null}
          </Text>
        </View>
        <Image style={style.header_image} />
      </View>
      <View style={style.message_box}>
        <Text>{props.messageData ? props.messageData.content : null}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  past_message_container: {
    width: '70%',
    alignSelf: 'flex-start',
    minHeight: 92,
    backgroundColor: '#2799E0',
    borderRadius: 12,
    marginTop: 20,
    marginLeft: 24,
    flex: 1,
    padding: 8,
  },
  header: {},
  header_text: {},
  header_image: {},
  message_box: { paddingTop: 8 },
  time_text: { fontSize: 10 },
  author_text: { fontWeight: 'bold' },
});
