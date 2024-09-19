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
        <Pressable style={styles.masterContainer} onPress={onCardPress}>
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={imagePath} />
                <View style={styles.starContainer1}>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: 'bold', fontSize: wp(4), color: '#ffffff' }]}>{time.days}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                            <Text style={[styles.starText, { fontWeight: '500', fontSize: wp(3.2), color: '#ffffff' }]}>D</Text>
                        </View>
                    </View>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: 'bold', fontSize: wp(4), color: '#ffffff' }]}>{time.hours}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                            <Text style={[styles.starText, { fontWeight: '500',fontSize: wp(3.2), color: '#ffffff' }]}>H</Text>
                        </View>
                    </View>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: 'bold', fontSize: wp(4), color: '#ffffff' }]}>{time.minutes}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                        <Text style={[styles.starText, { fontWeight: '500', fontSize: wp(3.2), color: '#ffffff' }]}>M</Text>
                    </View>
                    </View>
                    <View style={styles.timerwrap}>
                        <Text style={[styles.starText, { fontWeight: 'bold', fontSize: wp(4), color: '#ffffff' }]}>{time.seconds}</Text>
                        <View style={{ position: 'absolute', alignItems: 'flex-end', bottom: wp(-5) }}>
                        <Text style={[styles.starText, { fontWeight: '500', fontSize: wp(3.2), color: '#ffffff' }]}>S</Text>
                    </View>
                    </View>

                </View>
            </View>
            <View style={{ marginTop: wp(5) }}>
                <Text style={styles.nameStyle} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                <Text style={[styles.nameStyle, { fontSize: wp(3), color: CustomColors.accentBrownFaint }]} ellipsizeMode='tail' numberOfLines={1}>{timeDiff}</Text>
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
                    <View style={{ flexDirection: 'column', position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: wp(3) }}>
                            {discountType === 'Amount' ? `₹ ${offPercentage}` : `${offPercentage} %`}
                        </Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: wp(3) }}>OFF</Text>
                    </View>
                </View>
            )}


        </Pressable>
    );
};

const styles = StyleSheet.create({
    masterContainer: {
        width: wp(45),
        height: wp(55),
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 5,
    },
    container: {
        width: "100%",
        height: "60%",
        borderRadius: 25,
        // backgroundColor: '#FFFFFFF',
        // flexDirection: 'column',
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
    starContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    starContainer1: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: '100%',
        width: '90%',
        borderRadius: 20,
        margin: wp(2),
        flexDirection: 'row',
        paddingTop: wp(3)
    },
    timerwrap: {
        height: 35,
        width: 30,
        backgroundColor: 'transparent',
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 3
    }
});

export default FlashSaleItemWithDiscount;