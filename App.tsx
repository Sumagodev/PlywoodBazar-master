import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesCard from './src/ReusableComponents/TopProfilesCard';
import CustomButton from './src/ReusableComponents/CustomButton';
import CategorySlider from './src/ReusableComponents/CategorySlider';
import StartBusinessBanner from './src/ReusableComponents/StartBusinessBanner';
import FlashSaleItem from './src/ReusableComponents/FlashSaleItem';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import BlogsItem from './src/ReusableComponents/BlogsItem';
import CustomTextInputField from './src/ReusableComponents/CustomTextInputField';
import FlashSaleCard from './src/ReusableComponents/FlashSaleAnimatedCard';
import FlashSaleAnimatedCard from './src/ReusableComponents/FlashSaleAnimatedCard';
import TellUsYourRequirementForm from './src/ReusableComponents/TellUsYourRequirementForm';
import BottomBanner from './src/ReusableComponents/BottomBanner';
import NavBar from './src/ReusableComponents/NavBar';
import InfiniteScrollImplementation from './src/ReusableComponents/InfiniteScrollImplementation';

function App(): JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 20 }} />
      <InfiniteScrollImplementation delay={1500} infinite={true} data={[
        { imagePath: require('./assets/img/imgtre.png'), title: 'long1', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long2', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long3', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long3', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long4', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long5', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long6', description: 'small description' },
      ]
      }/>
      <View style={{ height: 20 }} />
      <InfiniteScrollImplementation delay={1000} infinite={false} data={[20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]}/>
      <View style={{ height: 20 }} />
      <NavBar />
      <View style={{ height: 20 }} />
      <BottomBanner />
      <View style={{ height: 20 }} />
      <TellUsYourRequirementForm />
      <View style={{ height: 20 }} />
      <FlashSaleAnimatedCard gifSource={require('./assets/anim/flashSale1.gif')} />
      <View style={{ height: 20 }} />
      <StartBusinessBanner />
      <View style={{ height: 20 }} /><TopProfilesCard imagePath={require('./assets/img/user.png')} name={'Hari'}
        onCallPressed={() => { }}
        onCardPressed={() => { }}
        onVisitPressed={() => { }}
      />
      <View style={{ height: 20 }} />
      {/*
      <BlogsItem
        blog={{ imagePath: require('./assets/img/imgtre.png'), title: 'long title of the image', description: 'small description' }}
      />
      */}
      <View style={{ height: 20 }} />
      <CustomTextInputField imagePath={require('./assets/img/addcheck.png')} placeholder='Test' validator={() => { }} />
      <View style={{ height: 20 }} />
      <CategorySlider data={
        [
          { imagePath: require('./assets/img/product1.png'), name: 'a' },
          { imagePath: require('./assets/img/product2.png'), name: 'a' },
          { imagePath: require('./assets/img/product3.png'), name: 'a' },
          { imagePath: require('./assets/img/product4.png'), name: 'a' },
          { imagePath: require('./assets/img/product5.png'), name: 'a' },
          { imagePath: require('./assets/img/product6.png'), name: 'a' },
          { imagePath: require('./assets/img/product1.png'), name: 'a' },
          { imagePath: require('./assets/img/product2.png'), name: 'a' },
          { imagePath: require('./assets/img/product3.png'), name: 'a' },
          { imagePath: require('./assets/img/product4.png'), name: 'a' },
          { imagePath: require('./assets/img/product5.png'), name: 'a' },
          { imagePath: require('./assets/img/product6.png'), name: 'a' },
        ]
      } />
      <View style={{ height: 20 }} />
      <FlashSaleItem
        imagePath={require('./assets/img/category.png')}
        name='Royal Forest Plywood'
        actualPrice='300'
        salePrice='245'
        duration='10'
        onCallPress={() => {
          console.log('onCallPressed');
        }}
        onCardPress={() => {
          console.log('onCardPressed');
        }}
      />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.masterBackground,
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