import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import CustomColors from '../styles/CustomColors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FaqAccordion = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View >
      <ListItem.Accordion style={styles.container}
        content={
          <ListItem.Content style={styles.headerContainer}>
            <ListItem.Title style={styles.headerText}>{item.question}</ListItem.Title>
          </ListItem.Content>
        }
        containerStyle={styles.container} // Apply rounded corners
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        <ListItem containerStyle={styles.contentContainer} bottomDivider>
          <ListItem.Content>
            <Text style={styles.contentText}>{item.answer}</Text>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    borderRadius: wp(5),
    backgroundColor: '#6c4f37',
    overflow: 'hidden',
    elevation: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: 'brown',
    borderRadius: wp(5),
  },
  contentContainer: {
    backgroundColor: 'white', // Content background color
    padding: 10, // Adjust padding as needed
    borderBottomLeftRadius: 10, // Rounded corners on the bottom-left
    borderBottomRightRadius: 10, // Rounded corners on the bottom-right
  },
});


export default FaqAccordion;