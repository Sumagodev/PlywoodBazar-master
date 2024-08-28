import { StyleSheet, View, Text } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FadeRibbonText from "./FadeRibbon"
import CustomColors from "../styles/CustomColors"

export default MyActivityItem = ({activityItem})=>{
    return (
        <View style={styles.container}>            
            <Text style={styles.textStyle} numberOfLines={1} ellipsizeMode='tail'>{activityItem.userName}</Text>
            <View style={styles.rowContainer}>
                <Text style={styles.keyTextStyle}>Products Name: </Text>
                <Text style={styles.valueTextStyle}>{activityItem.productName}</Text>
            </View>
            <View style={[styles.rowContainer, {marginBottom: wp(4)}]}>
                <Text style={styles.keyTextStyle}>Products Name: </Text>
                <Text style={styles.valueTextStyle}>{activityItem.price}</Text>
            </View>
            <FadeRibbonText fontSize={wp(4.5)} text={['Contacted On: ', activityItem.date]} itemsAlignment='flex-start' style={{backgroundColor: 'red'}} paddingVertical={wp(1)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius: wp(5),
        color: 'white',
        elevation: 10,
        width: wp(90),
        padding: wp(5),
        backgroundColor: 'white',
        paddingHorizontal: wp(10)
    },
    textStyle:{
        fontWeight: 'bold',
        fontSize: wp(5),
        paddingBottom: wp(2),
    },
    keyTextStyle:{
        fontSize: wp(4),
    },
    valueTextStyle:{
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    rowContainer:{
        flexDirection:'row',
    }
})