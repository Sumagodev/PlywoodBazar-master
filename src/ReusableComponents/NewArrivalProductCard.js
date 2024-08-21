import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomButton from './CustomButton.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NewArrivalProductCard = ({ imagePath, name, location, price, isVerified=false, onCallPressed, onGetQuotePressed, onCardPressed }) => {
    return (
      <TouchableOpacity onPress={onCardPressed}>
        <View style={styles.container}>
            <View style={[styles.elevatedContainer, {flexDirection: 'row'}]}>
                <Image source={imagePath} style={styles.imageStyle} />
                <View style={[{flexDirection: 'column', alignSelf:'center',}]}>
                <Text style={styles.nameText}>{name}</Text>
                    <View style={styles.locationRow}>
                        <Image style={styles.locationImageStyle} source={require('../../assets/img/location_icon.png')} />
                        <Text style={styles.locationText}>{location}</Text>
                        {isVerified && (
                            <View style={{flexDirection:'row'}}>
                            <Image style={styles.locationImageStyle} source={require('../../assets/img/verified_icon.png')} />
                            <Text style={styles.locationText}>Verified</Text>
                        </View>
                        )}
                    </View>
                    <View style={styles.locationRow}>
                        <Text style={styles.priceText}>₹{price}</Text>
                        <View style={{flex: 1}} />
                        <CustomButton text='Get Quote' textSize={18} style={styles.button} onPress={onGetQuotePressed}/>
                    </View>
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
        borderRadius: 25,
        width: screenWidth * 0.85,
        height: screenWidth * 0.35,
        elevation: 10,
        overflow: 'hidden',
    },
    elevatedContainer: {
        flex: 1,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fff',
    },
    imageStyle: {
        margin: 5,
        width: screenWidth * 0.35,
        height: screenWidth * 0.32,
        borderRadius: 25,
    },
    callIconContainer: {
        position: 'absolute',
        top: '-15%',
        right: '-10%',
        transform: [{ translateX: -25 }],
        backgroundColor: 'white',
        height: 40,
        width: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    callIcon: {
        width: 32,
        height: 32,
        padding: 10,
        resizeMode: 'contain',
        backgroundColor: CustomColors.accentGreen, // Background color
        borderRadius: 50,
    },
    nameText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: CustomColors.textGrey,
        fontSize: 18,
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
});

export default NewArrivalProductCard;