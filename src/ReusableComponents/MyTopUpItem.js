import CustomButton from "./CustomButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FadeRibbonText from "./FadeRibbon";
import { Icon } from "react-native-elements";

const { StyleSheet, View, Text } = require("react-native")

const MyTopUpItem = ({
    topUpItem,
    onPress
})=>{
    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FadeRibbonText paddingHorizontal={wp(5)} text='TOPUP FOR PROMOTION' fontWeight={800} fontSize={wp(4.2)} colorStart='#926139' colorEnd="#e1cebd" />
                <Text style={styles.priceText}>{topUpItem.price}₹</Text>
                <Text style={styles.validityStyle}>{topUpItem.validity}</Text>
                <View style={{marginVertical: wp(2)}}>
                <View style={[styles.rowContainer, {marginBottom: wp(1)}]}>
                    <Icon size={wp(4)} name="check" color='white' backgroundColor='#ba9576' borderRadius={wp(5)} padding={wp(1)}/>
                    <View style={styles.columnContainer}>
                        <Text style={styles.keyText}>{topUpItem.numberOfSale} FLASH SALE(S)</Text>
                        <Text style={styles.valueText}>FOR {topUpItem.daysOfSale} DAY(S)</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <Icon size={wp(4)} name="check" color='white' backgroundColor='#ba9576' borderRadius={wp(5)} padding={wp(1)}/>
                    <View style={styles.columnContainer}>
                        <Text style={styles.keyText}>{topUpItem.numberOfAdvertisement} ADVERTISEMENT(S)</Text>
                        <Text style={styles.valueText}>FOR {topUpItem.daysOfAdvertisement} DAY(S)</Text>
                    </View>
                </View>
                </View>
            </View>
            <View style={styles.buttonStyle}>
                <CustomButton
                    paddingHorizontal={wp(8)}
                    paddingVertical={wp(3)}
                    text='Buy Now'
                    onPress={onPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:wp(1),
        width: wp(80),
    },
    mainContainer: {
        paddingTop: wp(3),
        borderRadius: 25,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: wp(2),
        paddingBottom: wp(7),
    },
    buttonStyle: {
        position: 'absolute',
        bottom: wp(-6),
        alignSelf: 'center'
    },
    priceText:{
        fontSize: wp(7),
        color: '#624832',
        fontWeight: 'bold',
        marginTop: wp(2.5),
    },
    validityStyle:{
        fontWeight: 'bold',
        marginBottom: wp(1.5),
    },
    keyText:{
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    valueText:{
        fontSize: wp(3),
    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    columnContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginStart: wp(2),
    }
    
})

export default MyTopUpItem;