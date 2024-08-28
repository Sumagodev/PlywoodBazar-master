import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CustomColors from "../styles/CustomColors"

export default TicketItem = ({ticketItem, onViewPress, onDeletePress}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.nameStyle} ellipsizeMode="tail" numberOfLines={1}>{ticketItem.name}</Text>
            <View style={styles.row}>
                <Text style={styles.dateStyle}>{ticketItem.date}</Text>
                <TouchableOpacity onPress={onViewPress} style={styles.iconStyle}>
                    <Icon name='eye-circle' size={wp(10)} color={CustomColors.glossBrownDark} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDeletePress} style={styles.iconStyle}>
                    <Icon name='delete-circle' size={wp(10)} color={CustomColors.glossBrownDark} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        elevation: 10,
        width: wp(80),
        padding: wp(2),
        borderRadius: wp(20),
        backgroundColor: '#eddac6',
        paddingHorizontal: wp(8),
        paddingVertical: wp(4),
    },
    nameStyle:{
        fontSize: wp(5),
        fontWeight: 'bold'
    },
    dateStyle:{
        fontSize: wp(5),
        flex: 1,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle:{
        paddingHorizontal: wp(1)
    }
})