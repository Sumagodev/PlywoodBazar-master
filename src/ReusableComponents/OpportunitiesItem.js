import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import CustomButton from "./CustomButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomColors from '../styles/CustomColors';
import { color } from 'react-native-elements/dist/helpers';

export default OpportunitiesItem = ({ opportunityItem, onApplyPress }) => {
    return (
        <View style={styles.wrapper}>
            <ImageBackground style={styles.container} source={opportunityItem.imagePath}>
                <LinearGradient
                    colors={['transparent', 'transparent', CustomColors.mattBrownDark]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.buttonStyle}>
                        <CustomButton
                            text='Apply'
                            onPress={onApplyPress}
                            hasBorder={true}
                            buttonBgColor='#573C26'
                            paddingVertical={wp(2)}
                            paddingHorizontal={wp(4)}
                        />
                    </View>
                    <Text style={{fontSize:wp(4), color:'white', fontWeight:'bold'}}>{opportunityItem.isExclusive ? 'EXCLUSIVE' : ''}</Text>
                    <Text style={styles.titleStyle}>{opportunityItem.title}</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: wp(6),
        width: wp(46),
        height: wp(46),
        overflow: 'hidden',
        elevation: 10,
    },
    container: {
        width: wp(46),
        height: wp(46),
    },
    gradient: {
        width: '100%',
        height: '100%',
        padding: wp(2),
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        margin: wp(3),
        position: 'absolute',
        right: 0,
        top: 0,
    },
    titleStyle: {
        color: 'white',
        fontSize: wp(5),
        fontWeight: 'bold',
        shadowColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: wp(2),
    },
});