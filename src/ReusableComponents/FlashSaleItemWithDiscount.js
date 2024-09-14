import React, { useState, useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import CustomColors from '../styles/CustomColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FlashSaleItemWithDiscount = ({ imagePath, name, actualPrice, salePrice, offPercentage, onCallPress, onCardPress,discountType,EndDate }) => {
    const [timeDiff, setTimeDiff] = useState('');
    useEffect(() => {
        const givenTime = new Date(EndDate);
    
        const calculateTimeDifference = () => {
          const currentTime = new Date();
          const differenceInMs = givenTime - currentTime; // Time left
    
          if (differenceInMs <= 0) {
            // If time has passed or reached 0, show "Sale Ended"
            setTimeDiff("Sale Ended");
          } else {
            // Calculate days, hours, minutes
            const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    
            setTimeDiff(`${days} days, ${hours} hours, ${minutes} minutes`);
          }
        };
    
        calculateTimeDifference();
    
        // Optionally update every minute
        const interval = setInterval(calculateTimeDifference, 60000);
    
        return () => clearInterval(interval); // Cleanup the interval
      }, []);
    return (
        <Pressable style={styles.masterContainer} onPress={onCardPress}>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={imagePath} />
                <View style={{}}>
                <Text style={styles.nameStyle} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                <Text style={[styles.nameStyle,{fontSize:wp(3),color:CustomColors.accentBrownFaint}]} ellipsizeMode='tail' numberOfLines={1}>{timeDiff}</Text>
                </View>
               
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
            {offPercentage && (
  <View style={styles.starContainer}>
    <Icon name='decagram' color='#c3a186' size={wp(15)} />
    <View style={{flexDirection: 'column', position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
    <Text style={{color: 'white', textAlign: 'center', fontSize: wp(3)}}>
  {discountType === 'Amount' ? `₹ ${offPercentage}` : `${offPercentage} %`}
</Text>
      <Text style={{color: 'white', textAlign: 'center', fontSize: wp(3)}}>OFF</Text>
    </View>
  </View>
)}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    masterContainer: {
        width: wp(45),
        height: wp(50),
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
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