import React from 'react';
import {View, StyleSheet} from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesCard from './src/ReusableComponents/TopProfilesCard';
import CustomButton from './src/ReusableComponents/CustomButton';
import CategorySliderSingleItem from './src/ReusableComponents/CategorySliderSingleItem';
import CategorySlider from './src/ReusableComponents/CategorySlider';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <CategorySlider data={[{id: '1', name:'A', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'B', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'C', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'D', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'E', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'F', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'G', imagePath:require('./assets/img/phone.png')},
        {id: '1', name:'H', imagePath:require('./assets/img/phone.png')},
       ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.masterBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { width: 20, height: 20, },
  row: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space between inputs
    alignItems: 'center', // Center align items vertically
    padding: 10, // Optional padding around the row
  },
});

export default App;