import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomButton from './CustomButton.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LikeProduct = ({ imagePath, name, location, price, onCallPressed, onGetQuotePressed, onCardPressed }) => {
    return (
      <TouchableOpacity onPress={onCardPressed}>
        <View style={styles.container}>
            <View style={styles.elevatedContainer}>
                <Image style={styles.upperImageStyle} source={imagePath} />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{name}</Text>
                    <View style={styles.locationRow}>
                      <Image style={styles.locationImageStyle} source={require('../../assets/img/location_icon.png')} />
                        <Text style={styles.locationText}>{location}</Text>
                    </View>
                    <Text style={styles.priceText}>₹{price}</Text>
                </View>
                <View style={styles.callIconContainer}>
                <TouchableOpacity onPress={onCallPressed}>
                  <Image style={styles.callIcon} source={require('../../assets/img/phone.png')} />
                </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.buttonContainer}>
        <CustomButton text='Get Quote' textSize={22} style={styles.button} onPress={onGetQuotePressed}/>
    </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 2,
        borderRadius: 25,
        width: screenWidth * 0.45,
        height: screenWidth * 0.65, // Adjust the height for a fixed but scalable size
        elevation: 10,
        overflow: 'hidden',
    },
    elevatedContainer: {
        flex: 1,
        borderRadius: 25,
        elevation: 10,
        backgroundColor: '#fff',
    },
    upperImageStyle: {
        width: '100%',
        height: '50%',
        borderRadius: 25,
    },
    callIconContainer: {
        position: 'absolute',
        top: '40%', // Center vertically in the upper half
        left: '50%', // Center horizontally
        transform: [{ translateX: -25 }], // Adjust for centering
        backgroundColor: 'white',
        height: 50, // Slightly larger than icon
        width: 50, // Slightly larger than icon
        borderRadius: 25, // Half of the height/width for perfect circle
        alignItems: 'center',
        justifyContent: 'center',
    },
    callIcon: {
        width: 42,
        height: 42,
        padding: 10,
        resizeMode: 'contain',
        backgroundColor: CustomColors.accentBrownFaint, // Background color
        borderRadius: 50,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    locationImageStyle: {
        height: 18,
        width: 18,
        marginRight: 5,
    },
    textContainer: {
        paddingTop: 25,
        height: '50%',
    },
    nameText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: CustomColors.textGrey,
        fontSize: 18,
    },
    locationText: {
        alignSelf: 'center',
        color: CustomColors.textGrey,
        fontSize: 16,
    },
    priceText: {
        alignSelf: 'center',
        color: CustomColors.textGrey,
        fontSize: 16,
        paddingBottom: 10,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: -14,
      left: 0,
      right: 0,
      alignItems: 'center',
  },
  button: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: CustomColors.primaryColor, // Replace with your color
      borderRadius: 25,
  },
});

export default LikeProduct;