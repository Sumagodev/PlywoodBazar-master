import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { Rating } from 'react-native-ratings';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
import CustomButtonNew from './CustomButtonNew';

const TopProfilesVerticalCard = ({imagePath,name,products,rating,address}) => {

    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={imagePath} />
            </View>
            <Text style={styles.nameStyle}>{name}</Text>
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyle, {fontWeight: '100'}]}>PRODUCTS: </Text>
                <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>{products}</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyle, {fontWeight: 'bold', paddingRight: wp(2)}]}>{rating}</Text>
                <Rating startingValue={rating} imageSize={wp(4)} />
            </View>
            <View style={[styles.rowStyle, {width: '80%'}]}>
                <Icon name='map-marker' color='gray' size={wp(5)} />
                <Text style={[styles.textStyle]}>{address}</Text>
            </View>
            <View style={{paddingTop: wp(2)}}>
                <CustomButtonNew  textSize={wp(4)} onPress={()=>console.log('function called')} text={'View Profile'} paddingHorizontal={wp(4)} paddingVertical={wp(3)}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: wp(45),
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
        alignItems: 'center',
        width:wp(30)
    },
    textStyle:{
        fontSize: wp(4),
    }
});

export default TopProfilesVerticalCard;