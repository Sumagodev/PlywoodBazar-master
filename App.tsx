import React from 'react';
import {View, StyleSheet} from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesCard from './src/ReusableComponents/TopProfilesCard';
import CustomButton from './src/ReusableComponents/CustomButton';
import CategorySlider from './src/ReusableComponents/CategorySlider';
import StartBusinessBanner from './src/ReusableComponents/StartBusinessBanner';
import FlashSaleItem from './src/ReusableComponents/FlashSaleItem';
import { widthPercentageToDP } from 'react-native-responsive-screen';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <CategorySlider data={
        [
          {imagePath: require('./assets/img/product1.png'), name: 'a', key},
          {imagePath: require('./assets/img/product2.png'), name: 'a'},
          {imagePath: require('./assets/img/product3.png'), name: 'a'},
          {imagePath: require('./assets/img/product4.png'), name: 'a'},
          {imagePath: require('./assets/img/product5.png'), name: 'a'},
          {imagePath: require('./assets/img/product6.png'), name: 'a'},
          {imagePath: require('./assets/img/product1.png'), name: 'a'},
          {imagePath: require('./assets/img/product2.png'), name: 'a'},
          {imagePath: require('./assets/img/product3.png'), name: 'a'},
          {imagePath: require('./assets/img/product4.png'), name: 'a'},
          {imagePath: require('./assets/img/product5.png'), name: 'a'},
          {imagePath: require('./assets/img/product6.png'), name: 'a'},
        ]
      }/>
      {/*
    <FlashSaleItem
      imagePath={require('./assets/img/category.png') }
      name='Royal Forest Plywood'
      actualPrice='300'
      salePrice='245'
      duration='10'
      onCallPress={()=>{
        console.log('onCallPressed');
      }}
      onCardPress={()=>{
        console.log('onCardPressed');
      }}
    />
    */}
    </View>
  );
}

const styles{
  
}

export default App;