import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import CustomColors from '../styles/CustomColors';

const FlashSaleItem = ({ imagePath, name, actualPrice, salePrice, onCallPress, onCardPress }) => {
    return (
      <View style={styles.masterContainer}>
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={imagePath}/>
            <Text style={styles.nameStyle}>{name}</Text>
            <Text style={styles.actualPriceStyle}>₹{actualPrice}/-</Text>
            <Text style={styles.salePriceStyle}>₹{salePrice}/-</Text>
        </View>
        <View style={styles.callImageStyle}>
            <Image style={styles.callIconStyle} source={require('../../assets/img/phone.png')} />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    masterContainer:{
        width: wp(40),
        height: wp(48),
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        elevation: 5,
    },
    container:{
        width: wp(40),
        height: wp(42),
        borderRadius: 25,
        backgroundColor: '#FFFFFFF',
        flexDirection: 'column',
    },
    imageStyle:{
        margin: wp(2),
        width:"90%",
        height: "55%",
        borderRadius: 20,
    },
    nameStyle:{
        fontSize: wp(4),
        color: '#333333',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    actualPriceStyle:{
        paddingTop: wp(1),
        fontSize: wp(3.6),
        color: '#333333',    
        paddingStart: wp(4.8),
        textDecorationLine: 'line-through',
    },
    salePriceStyle:{
        fontSize: wp(5),
        color: '#000000',    
        paddingStart: wp(4),
    },
    callImageStyle: {
        backgroundColor: CustomColors.accentGreen,
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: wp(2),
        width: wp(10),
        height: wp(10),
        margin: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
      },
      callIconStyle: {
        width: wp(10),
        height: wp(10),
        resizeMode: 'contain',
      },      
});

export default FlashSaleItem;