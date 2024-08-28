import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesVerticalCard from './src/ReusableComponents/TopProfilesVerticalCard';
import CategorySlider from './src/ReusableComponents/CategorySlider';
import StartBusinessBanner from './src/ReusableComponents/StartBusinessBanner';
import FlashSaleItem from './src/ReusableComponents/FlashSaleItem';
import CustomTextInputField from './src/ReusableComponents/CustomTextInputField';
import FlashSaleAnimatedCard from './src/ReusableComponents/FlashSaleAnimatedCard';
import TellUsYourRequirementForm from './src/ReusableComponents/TellUsYourRequirementForm';
import BottomBanner from './src/ReusableComponents/BottomBanner';
import NavBar from './src/ReusableComponents/NavBar';
import InfiniteScrollImplementation from './src/ReusableComponents/InfiniteScrollImplementation';
import ZoomInfiniteScrollImplementation from './src/ReusableComponents/ZoomInfiniteScrollImplementation';
import BlogsItem from './src/ReusableComponents/BlogsItem';
import ShopListItem from './src/ReusableComponents/ShopListItem';
import MySubscriptionItem from './src/ReusableComponents/MySubscriptionItem';
import MyTopUpItem from './src/ReusableComponents/MyTopUpItem';
import FlashSaleItemWithDiscount from './src/ReusableComponents/FlashSaleItemWithDiscount';
import ReviewsItem from './src/ReusableComponents/ReviewsItem';
import ProductItemHorizontal from './src/ReusableComponents/ProductItemHorizontal';
import ProductItemVertical from './src/ReusableComponents/ProductItemVertical';
import MyLeadItem from './src/ReusableComponents/MyLeadItem';
import MyActivityItem from './src/ReusableComponents/MyActivityItem';
import FaqAccordion from './src/ReusableComponents/FaqAccordion';
import TicketItem from './src/ReusableComponents/TicketItem';

function App(): JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacer} />
      <TicketItem 
        ticketItem={{name: 'PLYWOOoooooooooooooooooooooooooooooooooooooooooooooooooD', date: '12-07-2024'}}
        onViewPress={()=>{}}
        onDeletePress={()=>{}}
      />
      <View style={styles.spacer} />
      <FaqAccordion item={{question:'What is plywoodbazar.com ?', 
        answer:"Plywood bazar. com is India's largest online B2B market place brought a platform to interact with Manufacturers, Distributors, Dealers, Wholesalers and Retailers of Furniture, Plywood"
      }} />
      <View style={styles.spacer} />
      <ReviewsItem reviewItem=
      {{
        imagePath:require("./assets/img/category.png"),
        name:'Sakshi Malik',
        rating:4.5,
        description:'Business today online offering latest news or Read about the reviews of the latest products launched, their prices, performances and durability.'
      }} />
      <View style={styles.spacer} />
      <MyActivityItem activityItem={{userName: 'Anirudh Daud', productName:'Royal Forest Plywood', price:'88 RS per Sqft', date: '18-04-2024'}}/>
      <View style={styles.spacer} />
      <MyLeadItem leadItem={{name: 'Shree Chhatrapati Plywood Hardware', date: '18-04-2024'}} />
      <View style={{flexDirection:'row', width:'100%', justifyContent: 'space-evenly', marginVertical: 8}}>
      <ProductItemVertical onPress={()=>{}}
      product={{
        name: 'Plywood', sellingPrice: '20 Per Nos / Sheet', price:3360, approval:true, status: 'Dummy Status',
        imagePath: require('./assets/img/category.png')
      }} />
      <ProductItemVertical onPress={()=>{}}
      product={{
        name: 'Plywood', sellingPrice: '20 Per Nos / Sheet', price:3360, approval:false, status: 'Dummy Status',
        imagePath: require('./assets/img/category.png')
      }} /></View>
      <View style={{ height: 20 }} />
      <TopProfilesVerticalCard onPress={()=>{}}
        userProfile={{
          imagePath:require('./assets/img/userimg.png'),
          name:'Hari',
          products: 'N.A.',
          rating: 4.4,
          address:'opp B. ed college , new akole road sangamner - 42205'
        }}
      />
      <View style={{ height: 20 }} />
      <ProductItemHorizontal onPress={()=>{}}
      product={{
        name: 'Plywood', sellingPrice: '20 Per Nos / Sheet', price:3360, approval:true, status: 'Dummy Status',
        imagePath: require('./assets/img/category.png')
      }} />
      <View style={{ height: 20 }} />
      <ProductItemHorizontal onPress={()=>{}}
      product={{
        name: 'Plywood', sellingPrice: '20 Per Nos / Sheet', price:3360, approval:false, status: 'Dummy Status',
        imagePath: require('./assets/img/category.png')
      }} />
      <View style={{ height: 20 }} />
      <FlashSaleItemWithDiscount 
        offPercentage={20}
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
      <MySubscriptionItem subscriptionItem={{ 
        name: 'Distributer', 
        description: 'Plywood Bazaar Ads',
        price: 5899,
        startDate: '06-12-2031',
        endDate: '06-12-2032',
        purchaseDate: '01-03-2024',
        numberOfSale: 1,
        daysOfSale: 5,
        numberOfAdvertisement: 1,
        daysOfAdvertisement: 5,
      }}/>
      <View style={{ height: 20 }} />
      <MyTopUpItem topUpItem={{ 
        price: '1500',
        validity: 'No Validity',
        numberOfSale: 1,
        daysOfSale: 3,
        numberOfAdvertisement: 1,
        daysOfAdvertisement: 3,
      }} />
      <View style={{ height: 20 }} />
      <ShopListItem vendorItem={{ imagePath: require('./assets/img/category.png'), name: 'Nilkanth Furniture', rating: 4.4, address: 'opp B. ed college , new akole road sangamner - 42205', contact: 8857955788, products: 'N.A' }}/>
      <View style={{ height: 20 }} />
      <ZoomInfiniteScrollImplementation data={[
        { imagePath: require('./assets/img/imgtre.png'), title: 'long1', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long2', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long3', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long4', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long5', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long6', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long7', description: 'small description' },
      ]} />
      <View style={{ height: 20 }} />
      <InfiniteScrollImplementation delay={1500} infinite={true} data={[
        { imagePath: require('./assets/img/imgtre.png'), title: 'long1', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long2', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long3', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long4', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long5', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long6', description: 'small description' },
        { imagePath: require('./assets/img/imgtre.png'), title: 'long7', description: 'small description' },
      ]
      }/>
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
      <View style={{ height: 20 }} />
      <BlogsItem
        blog={{ imagePath: require('./assets/img/imgtre.png'), title: 'long title of the image', description: 'small description' }}
        onCardPress={()=>{}} onButtonPress={()=>{}}
      />
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