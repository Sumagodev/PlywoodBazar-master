import { StyleSheet, View, Text, Image } from "react-native"
import { Rating } from "react-native-ratings"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const ReviewsItem =({reviewItem})=>{
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                    
                        <Text style={styles.headingStyle} ellipsizeMode="tail" numberOfLines={1}>{reviewItem.name}</Text>
                        <Rating imageSize={wp(3)} readonly={true} startingValue={reviewItem.rating}/>
                <Text ellipsizeMode="tail" numberOfLines={3} style={{fontSize:wp(3.5)}}>{reviewItem.message}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer:{
        justifyContent:'flex-start',
        elevation: 5,
        borderRadius: wp(25),
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        padding: wp(4),
        paddingStart: wp(17)
    },
  
    headingStyle:{
        color: '#000',
        fontSize: wp(4),
        fontWeight: 'bold',
        marginRight: wp(3),
    },
    imageContainer:{
        elevation: 5,
        marginStart: wp(2),
        borderRadius: wp(25),
        height: wp(18),
        width: wp(18),
        position: 'absolute',
        top: 0, left: 0,
    },
    image:{
        height: wp(18),
        width: wp(18),
        borderRadius: wp(25),
    },
})

export default ReviewsItem;