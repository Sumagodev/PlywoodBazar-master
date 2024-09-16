import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { Rating } from 'react-native-ratings';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
import CustomButtonNew from './CustomButtonNew';

const TopProfilesVerticalCard = ({imagePath,name,products,rating,address,onViewPress}) => {
    const [imageFailed, setImageFailed] = useState(false); // State to track image failure
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                
                <Image
          source={imageFailed ? require('../../assets/img/logo_1.png') : imagePath} // Fallback to default image
          resizeMode='stretch'
          style={styles.imageStyle}
          onError={() => setImageFailed(true)} // Set imageFailed to true on error
        />
            </View>
            <Text style={styles.nameStyle} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyle, {fontWeight: '400'}]}>Products: </Text>
                <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>{products}</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyle, {fontWeight: 'bold', paddingRight: wp(2)}]}>{rating}</Text>
                <Rating startingValue={rating} imageSize={wp(4)} />
            </View>
            <View style={[styles.rowStyle, {width: '80%'}]}>
                <Icon name='map-marker' color='gray' size={wp(5)} />
                <Text style={[styles.textStyle,{marginHorizontal:wp(1)}]} numberOfLines={1} ellipsizeMode='tail'>{address}</Text>
            </View>
            <View style={{paddingTop: wp(1)}}>
                <CustomButtonNew  textSize={wp(3.5)} onPress={onViewPress} text={'View Profile'} paddingHorizontal={wp(4)} paddingVertical={wp(2)}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingTop:wp(7),
        paddingBottom:wp(3),
        backgroundColor:'red',
        width: wp(46),
        backgroundColor: 'white',
        borderRadius: wp(5),
        elevation: 10,
        margin: wp(1),
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
        width: wp(30), height: wp(30),
    },
    nameStyle:{
        marginTop: wp(6 ),
        fontSize: wp(4),
    },
    rowStyle:{
        flexDirection: 'row',
        marginTop: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
        width:wp(30)
    },
    textStyle:{
        fontSize: wp(3),
    }
});

export default TopProfilesVerticalCard;