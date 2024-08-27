import { StyleSheet, View, Text } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FadeRibbonText from "./FadeRibbon"
import CustomColors from "../styles/CustomColors"

export default MyLeadItem = ({leadItem})=>{
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems: 'center', padding:wp(2)}}>
                <Icon name='record-circle' size={wp(4.5)} color={CustomColors.glossBrownDark}/>
                <Text style={styles.textStyle} numberOfLines={1} ellipsizeMode='tail'>{leadItem.name}</Text>
            </View>
            <View style={{paddingStart:wp(6)}}>
                <FadeRibbonText text={['Contacted On: ', leadItem.date]} itemsAlignment='flex-start' style={{backgroundColor: 'red'}} paddingVertical={wp(1)}/>
            </View>
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
    },
    textStyle:{
        fontWeight: 'bold',
        paddingStart: wp(2),
        fontSize: wp(4.5)
    }
})