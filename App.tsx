import React from 'react';
import {View, StyleSheet} from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesCard from './src/ReusableComponents/TopProfilesCard';
import CustomButton from './src/ReusableComponents/CustomButton';
import CategorySlider from './src/ReusableComponents/CategorySlider';
import StartBusinessBanner from './src/ReusableComponents/StartBusinessBanner';
import FlashSaleItem from './src/ReusableComponents/FlashSaleItem';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import BlogsItem from './src/ReusableComponents/BlogsItem';
import CustomTextInputField from './src/ReusableComponents/CustomTextInputField';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <BlogsItem
        blog={{imagePath: require('./assets/img/imgtre.png'), title: 'long title of the image', description: 'small description'}}
      />
      {/*
      <CustomTextInputField imagePath={require('./assets/img/addcheck.png')} placeholder='Test' validator={()=>{}} />
      <CategorySlider data={
        [
          {imagePath: require('./assets/img/product1.png'), name: 'a'},
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