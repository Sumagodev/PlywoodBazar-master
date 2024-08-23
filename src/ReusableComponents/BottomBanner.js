import { StyleSheet, View, Image, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LinearGradient from 'react-native-linear-gradient';

const BottomBanner = ()=>{
    return(
        <View style={styles.container}>
            <LinearGradient 
                style={styles.mainContainer}
                colors={['#e1c9af', '#72563d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                >
                <View style={styles.roundContainer}>
                    <Image style={styles.iconStyle} source={require('../../assets/img/tell.png')} />
                    <Text style={styles.textStyle}>TELL US WHAT YOU NEED</Text>
                </View>
                <View style={styles.roundContainer}>
                    <Image style={styles.iconStyle} source={require('../../assets/img/seal.png')} />
                    <Text style={styles.textStyle}>SEAL THE DEAL</Text>
                </View>
                <View style={styles.roundContainer}>
                    <Image style={styles.iconStyle} source={require('../../assets/img/receive.png')} />
                    <Text style={styles.textStyle}>RECEIVE FREE QUOTES</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={require('../../assets/img/bottomBannerImg.png')} />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: wp(100),
        height: wp(30),
        alignItems: 'center',
        marginBottom: wp(1),
        justifyContent: 'center',
    },
    mainContainer:{
        flexDirection: 'row',
        width: '95%',
        height: '90%',
        borderRadius: 25,
        backgroundColor: '#d2b99f',
        alignItems: 'center',
    },
    roundContainer:{
        flexDirection:'column',
        borderRadius: 50,
        backgroundColor: '#6c4f37',
        height: wp(20),
        width: wp(20),
        marginStart: wp(1),
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle:{
        height: '30%',
        width: '30%',
    },
    textStyle:{
        color: 'white',
        fontSize: wp(2.8),
        textAlign: 'center',
        width: wp(18),
    },
    imageContainer:{
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: wp(34),
        width: wp(34),
    },
    imageStyle:{
        resizeMode: 'stretch',
        height: wp(34),
        width: wp(34),
    }
})

export default BottomBanner;