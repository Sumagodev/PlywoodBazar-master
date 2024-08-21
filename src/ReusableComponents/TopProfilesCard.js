import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import CustomRoundedTextButton from './CustomRoundedTextButton.js';
import CustomButton from './CustomButton.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TopProfilesCard = ({ imagePath, name, onCallPressed, onVisitPressed, onCardPressed }) => {
    return (
      <TouchableOpacity onPress={onCardPressed}>
        <View style={styles.container}>
            <View style={styles.elevatedContainer}>
                <View style={{flexDirection: 'column'}} >
                    <View style={styles.rowContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.nameText, {fontSize:16}]}>{name}</Text>
                        <View style={{width: 5,}} />
                        <Text style={[styles.nameText, {fontSize:16}]}>{"Product NA"}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <CustomButton style={styles.button} 
                        text='Contact' 
                        buttonBgColor={CustomColors.accentBrownFaint} 
                        textSize={18} 
                        leftIconPath={require('../../assets/img/phone.png')}
                        leftIconBgColor={CustomColors.accentGreen}
                        />
                        <View style={{width: 5,}} />
                        <CustomButton style={styles.button} 
                        textSize={18}
                        text='Visit' />
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
        margin: 2,
        borderRadius: 25,
        elevation: 10,
    },
    elevatedContainer: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
        justifyContent: 'space-between', // Distribute space evenly
        marginTop: 10, 
        marginStart: 28,
    },
    callIconContainer: {
        elevation: 5,
        position: 'absolute',
        left: '-10%',
        top: '50%',
        transform: [{ translateY: -40 }], // Adjust this value based on the icon size
        backgroundColor: 'white',
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    callIcon: {
        width: 75,
        height: 75,
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