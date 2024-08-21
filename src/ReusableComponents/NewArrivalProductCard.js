import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomButton from './CustomButton.js';
import CustomRoundedTextButton from './CustomRoundedTextButton.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NewArrivalProductCard = ({imagePath, name, location, isVerified = false, onCallPressed, onGetQuotePressed, onCardPressed}) => {
  return (
    <TouchableOpacity onPress={onCardPressed}>
      <View style={styles.container}>
        <View style={[styles.elevatedContainer, {flexDirection: 'row'}]}>
          <Image source={imagePath} style={styles.imageStyle} />
          <View style={[{flexDirection: 'column',flex:1,marginEnd:10}]}>
            <Text style={styles.nameText}>{name}</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image style={styles.locationImageStyle} source={require('../../assets/img/location_icon.png')} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            <View style={styles.locationRow}>
              {isVerified && (
                <View style={{flexDirection: 'row'}}>
                  <Image style={styles.locationImageStyle} source={require('../../assets/img/verified_icon.png')} />
                  <Text style={styles.locationText}>Verified</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={[styles.getQuoteBtn]} onPress={onGetQuotePressed}>
              <Text style={[styles.textQuote]}>Get Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.callIconContainer}>
        <TouchableOpacity onPress={onCallPressed}>
          <Image style={styles.callIcon} source={require('../../assets/img/phone.png')} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    backgroundColor:'#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    margin: screenWidth * 0.02,
    elevation: 5,
  },
  elevatedContainer: {
    flex: 1,
    borderRadius: 25,
    elevation: 10,
    borderColor: 'black',
    backgroundColor:'#FFFFFF',
  },
  imageStyle: {
    margin: 5,
    width: screenWidth * 0.35,
    height:'auto',
    borderRadius: 25,
  },
  callIconContainer: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    backgroundColor: 'white',
    height: screenWidth * 0.075,
    width: screenWidth * 0.075 ,
    borderRadius: 25,
    elevation:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIcon: {
    width:screenWidth * 0.065 ,
    height: screenWidth * 0.065 ,
    padding: screenWidth * 0.02 ,
    resizeMode: 'contain',
    backgroundColor: CustomColors.accentGreen, // Background color
    borderRadius: 50,
  },
  nameText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: CustomColors.textGrey,
    fontSize: screenWidth * 0.055,
  },
  locationRow: {
    flexDirection: 'row',
    
  },
  locationImageStyle: {
    height: screenWidth * 0.055,
    width: screenWidth * 0.055,
    marginRight: 5,
  },
  locationText: {
    alignSelf: 'center',
    color: CustomColors.textGrey,
    fontSize: screenWidth * 0.045,
  },
  priceText: {
    alignSelf: 'center',
    color: CustomColors.textGrey,
    fontSize: screenWidth * 0.045,
    paddingBottom: screenWidth * 0.02,
  },

  getQuoteBtn: {
    backgroundColor: CustomColors.mattBrownDark,
    paddingBottom:screenWidth * 0.01,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginBottom:screenWidth * 0.01,
  },
  textQuote:{
    color:'white',
    paddingLeft: screenWidth * 0.02,
    paddingRight: screenWidth * 0.02,
    fontSize: screenWidth * 0.045,
  }
});

export default NewArrivalProductCard;
