import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomButton from './CustomButton.js';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TopProfilesCard = ({ imagePath, name, onCallPressed, onVisitPressed, onCardPressed }) => {
    return (
      <TouchableOpacity onPress={onCardPressed}>
        <View style={styles.container}>
            <View style={styles.elevatedContainer}>
                <View style={flexDirection='column'} >
                    <Text style={styles.nameText}>{name}</Text>
                    <View style={flexDirection='row'}>
                        <CustomButton text='Connect'></CustomButton>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.callIconContainer}>
            <TouchableOpacity onPress={onCallPressed}>
                <Image style={styles.callIcon} source={imagePath} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin: 2,
        borderRadius: 25,
        width: screenWidth * 0.5,
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
    callIconContainer: {
        elevation: 5,
        position: 'absolute',
        top: 25,
        left: '-10%',
        backgroundColor: 'white',
        width: wp(20),
        height: wp(20),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    callIcon: {
        width: wp(20),
        height: wp(20),
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
});

export default TopProfilesCard;