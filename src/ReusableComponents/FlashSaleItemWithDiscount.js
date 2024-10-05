import React, { useState, useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import CustomColors from '../styles/CustomColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FlashSaleItemWithDiscount = ({ imagePath, name, actualPrice, salePrice, offPercentage, onCallPress, onCardPress, discountType, EndDate }) => {
    const [timeDiff, setTimeDiff] = useState('');

    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasEnded: false
    });


    // useEffect(() => {
    //     const givenTime = new Date(EndDate);

    //     const calculateTimeDifference = () => {
    //         const currentTime = new Date();
    //         const differenceInMs = givenTime - currentTime; // Time left

    //         if (differenceInMs <= 0) {
    //             // If time has passed or reached 0, show "Sale Ended"
    //             setTimeDiff("Sale Ended");
    //         } else {
    //             // Calculate days, hours, minutes, seconds
    //             const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    //             const hours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //             const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    //             const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

    //             setTimeDiff(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    //         }
    //     };

    //     calculateTimeDifference();

    //     // Update every second for real-time countdown
    //     const interval = setInterval(calculateTimeDifference, 1000);

    //     return () => clearInterval(interval); // Cleanup the interval when component unmounts
    // }, [EndDate]);

    useEffect(() => {
        const givenTime = new Date(EndDate);

        const calculateTimeDifference = () => {
            const currentTime = new Date();
            const differenceInMs = givenTime - currentTime;

            if (differenceInMs <= 0) {
                setTime({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    hasEnded: true,
                });
            } else {
                const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

                setTime({
                    days,
                    hours,
                    minutes,
                    seconds,
                    hasEnded: false
                });
            }
        };

        const interval = setInterval(calculateTimeDifference, 1000);

        return () => clearInterval(interval);
    }, [EndDate]);
    return (
        <TouchableOpacity style={styles.masterContainer} onPress={onCardPress}>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={imagePath} />

            </View>
            <View style={{ marginTop: wp(2) }}>
                <Text style={styles.nameStyle} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                <Text style={[styles.nameStyle, { fontSize: wp(3), color: CustomColors.accentBrownFaint }]} ellipsizeMode='tail' numberOfLines={1}>{timeDiff}</Text>
                <View style={styles.starContainer1}>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: '400', fontSize: wp(4), color: '#000' }]}>{time.days}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                            <Text style={[styles.starText,]}>D</Text>
                        </View>
                    </View>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: '400', fontSize: wp(4), color: '#000' }]}>{time.hours}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                            <Text style={[styles.starText,]}>H</Text>
                        </View>
                    </View>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: '400', fontSize: wp(4), color: '#000' }]}>{time.minutes}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                            <Text style={[styles.starText,]}>M</Text>
                        </View>
                    </View>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: '400', fontSize: wp(4), color: '#000' }]}>{time.seconds}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                            <Text style={[styles.starText,]}>S</Text>
                        </View>
                    </View>

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
                    <Icon name='decagram' color='red' size={wp(15)} />
                    <View style={{ flexDirection: 'column', position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: wp(3),fontWeight:'bold'}}>
                            {discountType === 'Amount' ? `₹ ${offPercentage}` : `${offPercentage} %`}
                        </Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: wp(3),fontWeight:'bold' }}>OFF</Text>
                    </View>
                </View>
            )}


        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    masterContainer: {
        width: wp(48),
        height: wp(65),
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 5,
    },
    container: {
        width: "100%",
        height: "50%",
        borderRadius: 25,
        // backgroundColor: '#FFFFFFF',
        // flexDirection: 'column',
    },
    imageStyle: {
        // margin: wp(2),
        width: "100%",
        height: "100%",
        // borderRadius: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
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
    starContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    starContainer1: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: '90%',
        width: '80%',
        borderRadius: 20,
        marginTop: wp(3),
        margin: wp(1),
        flexDirection: 'row',
        paddingTop: wp(3)
    },
    timerwrap: {
        height: 35,
        width: 33,
        backgroundColor: 'transparent',
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 3,
        padding: wp(0)
    },
    starText: { fontWeight: '400', fontSize: wp(4), color: '#000' }
});

export default FlashSaleItemWithDiscount;