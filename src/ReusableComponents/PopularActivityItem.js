import { Pressable, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default PopularActivityItem = ({popularActivityItem}) => {
    return(
        <Pressable style={styles.container} onPress={()=>{}}>
            <Image style={styles.imageStyle} source={popularActivityItem.imagePath} />
            <Text style={{fontSize:wp(4), fontWeight: 'bold', marginVertical: wp(1)}} numberOfLines={1} ellipsizeMode="tail">{popularActivityItem.title}</Text>
            <Text style={{fontSize:wp(3.5), width: '100%', paddingHorizontal: wp(2), marginBottom: wp(1)}} numberOfLines={3} ellipsizeMode="tail">{popularActivityItem.description}</Text>
            <TouchableOpacity onPress={()=>{}} style={{marginBottom: wp(2)}}>
                <Text style={{fontSize:wp(3.5), color: '#624832', fontWeight: 'bold'}}>Read More</Text>
            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: wp(3),
        height: wp(55),
        width: wp(40),
        backgroundColor: 'white',
        borderRadius: wp(3),
        elevation: 5,
        paddingVertical: wp(4),
        paddingHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle:{
        width: '95%',
        height: '55%',
        borderRadius: wp(4),
        marginTop: wp(4)
    },
})