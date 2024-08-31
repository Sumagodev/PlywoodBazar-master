import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CustomColors from "../styles/CustomColors"
import CustomButtonOld from "./CustomButtonOld"

export default TicketItem = ({ticketItem, onViewPress}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.nameStyle} ellipsizeMode="tail" numberOfLines={1}>{ticketItem.name}</Text>
            <View style={styles.row}>
                <Text style={styles.dateStyle}>{ticketItem.date}</Text>
                <TouchableOpacity onPress={onViewPress} style={styles.iconStyle}>
                    <CustomButtonOld text={'View'} onPress={onViewPress}></CustomButtonOld>                    
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:wp(2),
        elevation: 5,
        width: wp(90),
        padding: wp(1),
        borderRadius: wp(20),
        backgroundColor: '#EDDAC6',
        paddingHorizontal: wp(8),
        paddingVertical: wp(2),
    },
    nameStyle:{
        fontSize: wp(5),
        fontWeight: 'bold'
    },
    dateStyle:{
        fontSize: wp(3.5),
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