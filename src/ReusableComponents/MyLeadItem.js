import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FadeRibbonText from "./FadeRibbon"
import CustomColors from "../styles/CustomColors"
import FabeRibbonFlex from "./FabeRibbonFlex"
import { useNavigation } from "@react-navigation/native"
export default MyLeadItem = ({ leadItem, item }) => {
    console.log('leadItem', leadItem);
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Supplier', { data: { _id: item.userId } })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: wp(2) }}>
                <Icon name='record-circle' size={wp(4.5)} color={CustomColors.glossBrownDark} />
                <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode='tail'>{leadItem.name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <FabeRibbonFlex style={{ flex: 1 }} text={['Contacted On: ', leadItem.date]} itemsAlignment='flex-start' paddingVertical={wp(1)} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: wp(1.5),
        borderRadius: wp(5),
        color: 'white',
        elevation: 3,
        width: wp(90),
        padding: wp(2),
        backgroundColor: 'white',
    },
    textStyle: {
        fontWeight: 'bold',
        paddingStart: wp(2),
        fontSize: wp(4.5)
    }
})