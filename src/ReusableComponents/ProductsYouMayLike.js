import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomButton from './CustomButton.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LikeProduct = ({ imagePath, name, location, price, onCallPress, onGetQuotePress }) => {
    return (
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
                    <CustomButton text='Get Quote' />
                </View>
                <View style={styles.callIconContainer}>
                <TouchableOpacity onPress={onCallPress}>
                    <Icon
                        name="phone"
                        size={25}
                        color='white'
                        style={styles.callIcon}
                    />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 2,
        borderRadius: 25,
        width: screenWidth * 0.5,
        height: screenWidth * 0.75, // Adjust the height for a fixed but scalable size
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
        width: 40,
        height: 40,
        padding: 8,
        backgroundColor: CustomColors.mattBrownDark, // Background color
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
    },
});

export default LikeProduct;