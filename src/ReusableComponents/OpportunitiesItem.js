import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import CustomButton from "./CustomButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomColors from '../styles/CustomColors';
import { color } from 'react-native-elements/dist/helpers';
import CustomButtonNew from './CustomButtonNew';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
export default OpportunitiesItem = ({ opportunityItem, onApplyPress }) => {
    return (
        <View style={styles.wrapper}>
            <ImageBackground style={styles.container} source={opportunityItem.imagePath}>
                <LinearGradient
                    colors={['transparent','transparent',CustomColors.mattBrownFaint , CustomColors.mattBrownDark]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.buttonStyle}>
                        <CustomButtonNew
                            text='Apply'
                            onPress={onApplyPress}
                            hasBorder={true}
                            buttonBgColor={CustomColors.colorNewButton}
                            paddingVertical={wp(2)}
                            textSize={wp(3.5)}
                            paddingHorizontal={wp(4)}
                            
                            
                        />
                    </View>
                    <Text style={styles.titleStyle} numberOfLines={2} ellipsizeMode='tail'>{opportunityItem.title} </Text>
                    <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <FontAwesome5Icon  name="map-marker-alt" size={wp(4)} color="#ffffff" />
                    <Text style={{fontSize:wp(4), color:'white', fontWeight:'bold',marginHorizontal:wp(2)}}>{opportunityItem.stateName}</Text>
                  </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin:wp(1),
        borderRadius: wp(3),
        width: wp(65),
        height: wp(46),
        overflow: 'hidden',
        elevation: 1,
    },
    container: {
        width: wp(65),
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
        fontSize: wp(3.5),
        fontWeight: 'bold',
        shadowColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: wp(2),
    },
});