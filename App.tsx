import React from 'react';
import {View, StyleSheet} from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesCard from './src/ReusableComponents/TopProfilesCard';
import CustomButton from './src/ReusableComponents/CustomButton';
import CategorySliderSingleItem from './src/ReusableComponents/CategorySliderSingleItem';
import CategorySlider from './src/ReusableComponents/CategorySlider';
import StartBusinessBanner from './src/ReusableComponents/StartBusinessBanner';
import FlashSaleItem from './src/ReusableComponents/FlashSaleItem';
import { widthPercentageToDP } from 'react-native-responsive-screen';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
    <FlashSaleItem
      imagePath={require('./assets/img/category.png') }
      name='Royal Forest Plywood'
      actualPrice='300'
      salePrice='245'
      onCallPress={()=>{}}
      onCardPress={()=>{}}
    />
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