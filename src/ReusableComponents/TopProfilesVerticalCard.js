import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { Rating } from 'react-native-ratings';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';

const TopProfilesVerticalCard = ({userProfile, onPress}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={userProfile.imagePath} />
            </View>
            <Text style={styles.nameStyle}>{userProfile.name}</Text>
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyle, {fontWeight: '100'}]}>PRODUCTS: </Text>
                <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>{userProfile.products}</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyle, {fontWeight: 'bold', paddingRight: wp(2)}]}>{userProfile.rating}</Text>
                <Rating startingValue={userProfile.rating} imageSize={wp(4)} />
            </View>
            <View style={[styles.rowStyle, {width: '80%'}]}>
                <Icon name='map-marker' color='gray' size={wp(5)} />
                <Text style={[styles.textStyle]}>{userProfile.address}</Text>
            </View>
            <View style={{paddingTop: wp(2)}}>
                <CustomButton onPress={onPress} text={'View Profile'} paddingHorizontal={wp(5)} paddingVertical={wp(3)}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: wp(48),
        height: wp(75),
        backgroundColor: 'white',
        borderRadius: wp(5),
        elevation: 10,
        margin: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer:{
        width: wp(20), height: wp(20),
        backgroundColor: 'white', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(20),
        elevation: 10,
    },
    imageStyle:{
        width: wp(19), height: wp(19),
    },
    nameStyle:{
        marginTop: wp(2),
        fontSize: wp(5),
        fontWeight: 'bold',
    },
    rowStyle:{
        flexDirection: 'row',
        marginTop: wp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        fontSize: wp(4),
    }
});

export default TopProfilesVerticalCard;