import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default UpcomingEventItem = ({eventItem, onPress})=>{
    return(
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.imageStyle} source={eventItem.imagePath} />
            <View style={styles.contentContainer}>
                <Text style={{fontSize:wp(3.5)}}>{eventItem.date}</Text>
                <Text style={{fontSize:wp(4), fontWeight: 'bold'}} numberOfLines={1} ellipsizeMode="tail">{eventItem.title}</Text>
                <Text style={{fontSize:wp(3)}} numberOfLines={3} ellipsizeMode="tail">{eventItem.description}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: wp(2),
        elevation: 10,
        padding: wp(2),
        borderRadius: wp(5),
        width: wp(75),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    imageStyle:{
        height: '100%',
        width: '40%',
        borderRadius: wp(5),
    },
    contentContainer:{
        paddingHorizontal: wp(2),
        paddingVertical: wp(3),
        flex: 1,
        flexDirection: 'column',
    }
})