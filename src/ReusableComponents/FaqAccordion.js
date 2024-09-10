import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FaqAccordion = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{margin: wp(1), backgroundColor: '#6c4f37', borderRadius: wp(10), overflow:'hidden', elevation: 10,}}>
      <ListItem.Accordion style={styles.bgContainer}
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.headerText} numberOfLines={1} ellipsizeMode='tail'>{item.question}</ListItem.Title>
          </ListItem.Content>
        }
        containerStyle={styles.container} // Apply rounded corners
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
        icon={{name: 'chevron-down', type: 'font-awesome', color:'white', size: wp(4)}}
      >
        <ListItem containerStyle={styles.contentContainer}>
          <ListItem.Content>
            <Text style={styles.contentText}>{item.answer}</Text>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>

    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer:{
    backgroundColor: '#6C4F37',
  },
  container: {
    backgroundColor: '#6c4f37',
    overflow: 'hidden',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(5),
  },
  contentContainer: {
    backgroundColor: '#F5F1E8',
    paddingVertical: wp(2),
    paddingHorizontal: wp(6),
    borderRadius: wp(10),
  },
});


export default FaqAccordion;