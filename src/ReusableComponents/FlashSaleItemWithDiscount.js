import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import CustomColors from '../styles/CustomColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FlashSaleItemWithDiscount = ({ imagePath, name, actualPrice, salePrice, offPercentage, onCallPress, onCardPress }) => {
    return (
        <Pressable style={styles.masterContainer} onPress={onCardPress}>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={imagePath} />
                <Text style={styles.nameStyle} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.salePriceStyle}>₹{salePrice}/-</Text>
                <Text style={styles.actualPriceStyle}>₹{actualPrice}/-</Text>
                <View style={{ flex: 1 }} />
                <View style={styles.callImageStyle}>
                    <TouchableOpacity onPress={onCallPress}>
                        <Image style={styles.callIconStyle} source={require('../../assets/img/phone.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.starContainer}>
                <Icon name='decagram' color='#c3a186' size={wp(15)} />
                <View style={{flexDirection:'column', position: 'absolute'}}>
                    <Text style={{color:'white', textAlign:'center', fontSize:wp(4)}}>{offPercentage}%</Text>
                    <Text style={{color:'white', textAlign:'center', fontSize:wp(3)}}>OFF</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    masterContainer: {
        width: wp(45),
        height: wp(50),
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        elevation: 5,
    },
    container: {
        width: "100%",
        height: "55%",
        borderRadius: 25,
        backgroundColor: '#FFFFFFF',
        flexDirection: 'column',
    },
    imageStyle: {
        margin: wp(2),
        width: "90%",
        height: "100%",
        borderRadius: 20,
    },
    nameStyle: {
        fontSize: wp(4),
        color: '#333333',
        fontWeight: 'bold',
        paddingStart: wp(2),
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    actualPriceStyle: {
        fontSize: wp(4),
        color: 'gray',
        paddingStart: wp(2),
        textDecorationLine: 'line-through',
    },
    salePriceStyle: {
        fontSize: wp(4),
        color: '#000000',
        paddingStart: wp(4),
    },
    callImageStyle: {
        backgroundColor: CustomColors.accentGreen,
        borderRadius: 50,
        padding: wp(2),
        width: wp(9),
        height: wp(9),
        margin: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    callIconStyle: {
        width: wp(9),
        height: wp(9),
        resizeMode: 'contain',
    },
    starContainer:{
        justifyContent:'center',
        alignItems: 'center',
        position:'absolute',
        top: 0,
        right: 0,
    },
});

export default FlashSaleItemWithDiscount;