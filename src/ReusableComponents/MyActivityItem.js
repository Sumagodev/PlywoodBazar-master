import { StyleSheet, View, Text } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FadeRibbonText from "./FadeRibbon"
import CustomColors from "../styles/CustomColors"

export default MyActivityItem = ({activityItem})=>{
    console.log(activityItem)
    return (
        <View style={styles.container}>            
            <Text style={styles.textStyle} numberOfLines={1} ellipsizeMode='tail'>{activityItem.name}</Text>
            <View style={styles.rowContainer}>
                <Text style={styles.keyTextStyle}>Products Name: </Text>
                <Text style={styles.valueTextStyle}>{activityItem.productName}</Text>
            </View>
            <View style={[styles.rowContainer, {marginBottom: wp(4)}]}>
                <Text style={styles.keyTextStyle}>Products Price: </Text>
                <Text style={styles.valueTextStyle}>{activityItem.price}</Text>
            </View>
            <FadeRibbonText fontSize={wp(4.5)} text={['Contacted On: ', activityItem.date]} itemsAlignment='flex-start' style={{backgroundColor: 'red'}} paddingVertical={wp(1)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:wp(1),
        borderRadius: wp(3),
        color: 'white',
        elevation: 3,
        width: wp(95),
        padding: wp(3),
        backgroundColor: 'white',
    },
    textStyle:{
        color:'black',
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