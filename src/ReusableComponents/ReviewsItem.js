import { StyleSheet, View, Text, Image } from "react-native"
import { Rating } from "react-native-ratings"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const ReviewsItem =({reviewItem})=>{
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.rowStyle}>
                    <Text style={styles.headingStyle} ellipsizeMode="tail" numberOfLines={1}>{reviewItem.name}</Text>
                    <Rating imageSize={wp(5)} readonly={true} startingValue={reviewItem.rating}/>
                </View>
                <Text ellipsizeMode="tail" numberOfLines={4}>{reviewItem.description}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={reviewItem.imagePath}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: wp(2),
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    contentContainer:{
        elevation: 5,
        borderRadius: wp(25),
        width: '90%',
        paddingStart: wp(14),
        paddingVertical: wp(1),
        backgroundColor: 'white',
        alignItems: 'flex-start',
    },
    rowStyle:{
        flexDirection: 'row',
        marginBottom: wp(2),
        marginTop: wp(6),
        alignItems: 'center'
    },
    headingStyle:{
        color: '#000',
        fontSize: wp(5),
        fontWeight: 'bold',
        marginRight: wp(3)
    },
    imageContainer:{
        elevation: 5,
        marginStart: wp(2),
        borderRadius: wp(25),
        height: wp(22),
        width: wp(22),
        position: 'absolute',
        backgroundColor: 'blue',
        top: 0, left: 0,
    },
    image:{
        height: wp(22),
        width: wp(22),
        borderRadius: wp(25),
    },
})

export default ReviewsItem;