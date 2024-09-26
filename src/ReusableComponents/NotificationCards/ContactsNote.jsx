import { View, Text } from 'react-native'
import React from 'react'


  const ContactsNote = ({ content, contactName, date }) => {
    return (
      <View>
        <Text>{content}</Text>
        <Text>Contact: {contactName}</Text>
        <Text>Date: {date}</Text>
      </View>
    );
  };
  

export default ContactsNote;