import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomButton from './CustomButton.js';
import CustomRoundedTextButton from './CustomRoundedTextButton.js';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NewArrivalProductCard = ({ imagePath, name, price, location, isVerified = false, onCallPressed, onGetQuotePressed, onCardPressed }) => {
  return (
    <Pressable onPress={onCardPressed}>
      <View style={styles.container}>
        <View style={[styles.elevatedContainer, { flexDirection: 'row' }]}>
          <Image source={imagePath} style={styles.imageStyle} />
          <View style={[{ flexDirection: 'column', flex: 1, marginEnd: 10 }]}>
            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
            <View style={{ flexDirection: 'row', marginTop: screenWidth * 0.01 }}>
              <Image style={styles.locationImageStyle} source={require('../../assets/img/location_icon.png')} />
              <Text style={styles.locationText} numberOfLines={1} ellipsizeMode='tail'>{location}</Text>
            </View>
            <View style={styles.locationRow}>
              {isVerified && (
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.locationImageStyle} source={require('../../assets/img/verified_icon.png')} />
                  <Text style={styles.locationText} numberOfLines={1} ellipsizeMode='tail'>Verified</Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.textPrice]} numberOfLines={1} ellipsizeMode='tail' >₹{price}</Text>
          

            </View>
            <TouchableOpacity style={[styles.getQuoteBtn]} onPress={onGetQuotePressed}>
            <Text style={[styles.textQuote]} numberOfLines={1} ellipsizeMode='tail' >Get Quote</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.callIconContainer}>
        <TouchableOpacity onPress={onCallPressed}>
        <Ionicons  name="call" size={wp(6)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: screenWidth * 0.02,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    margin: screenWidth * 0.01,

    elevation: 5,
  },
  elevatedContainer: {
    flex: 1,
    borderRadius: 25,
    elevation: 10,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
  },
  imageStyle: {
    margin: 5,
    width: screenWidth * 0.30,
    height: 'auto',
    borderRadius: 25,
  },
  callIconContainer: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    backgroundColor: '#39AB68',
    height: screenWidth * 0.095,
    width: screenWidth * 0.095,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIcon: {
    width: screenWidth * 0.085,
    height: screenWidth * 0.085,
    padding: screenWidth * 0.02,
    resizeMode: 'contain',
    backgroundColor: CustomColors.accentGreen, // Background color
    borderRadius: 50,
  },
  nameText: {
    marginTop: screenWidth * 0.04,
    fontWeight: 'bold',
    color: CustomColors.textGrey,
    fontSize: screenWidth * 0.045,
  },
  locationRow: {
    flexDirection: 'row',
    alignContent: 'center',

  },
  locationImageStyle: {
    alignSelf: 'center',
    height: screenWidth * 0.035,
    width: screenWidth * 0.035,
    marginRight: 5,
  },
  locationText: {
    alignSelf: 'center',
    color: CustomColors.textGrey,
    fontSize: screenWidth * 0.035,
  },
  priceText: {
    alignSelf: 'center',
    color: CustomColors.textGrey,
    fontSize: screenWidth * 0.045,
    paddingBottom: screenWidth * 0.02,
  },

  getQuoteBtn: {
    backgroundColor: CustomColors.mattBrownDark,
    paddingBottom: screenWidth * 0.01,
    borderRadius: 25,
    paddingTop: screenWidth * 0.01,
    paddingBottom: screenWidth * 0.02,
    paddingLeft: screenWidth * 0.02,
    paddingRight: screenWidth * 0.02,
    alignSelf: 'flex-end',
    marginBottom: screenWidth * 0.02,
  },
  textQuote: {
    color: 'white',
    paddingLeft: screenWidth * 0.02,
    paddingRight: screenWidth * 0.02,
    fontSize: screenWidth * 0.0400,
    fontWeight: 500,
  },
  textPrice: {
    color: '#3D3B3B',
    fontFamily: 'Poppins-Bold',
    fontWeight: 400,
    paddingLeft: screenWidth * 0.02,
    paddingRight: screenWidth * 0.02,
    fontSize: screenWidth * 0.045,
  }
});

export default NewArrivalProductCard;
