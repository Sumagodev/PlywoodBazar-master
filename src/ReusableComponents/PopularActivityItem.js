import { Pressable, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default PopularActivityItem = ({popularActivityItem, onPress, onReadMePress}) => {
    return(
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.imageStyle} source={popularActivityItem.imagePath} />
            <Text style={{fontSize:wp(4), fontWeight: 'bold', marginVertical: wp(1)}} numberOfLines={1} ellipsizeMode="tail">{popularActivityItem.title}</Text>
            <Text style={{fontSize:wp(3.5), width: '100%', paddingHorizontal: wp(2), marginBottom: wp(1)}} numberOfLines={3} ellipsizeMode="tail">{popularActivityItem.description}</Text>
            <TouchableOpacity onReadMePress>
                <Text style={{fontSize:wp(3.5), marginBottom: wp(2), color: '#624832', fontWeight: 'bold'}}>Read More</Text>
            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        height: wp(68),
        width: wp(45),
        backgroundColor: 'white',
        borderRadius: wp(3),
        elevation: 10,
        padding: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle:{
        width: '95%',
        height: '60%',
        borderRadius: wp(4),
        marginTop: wp(4)
    },
})