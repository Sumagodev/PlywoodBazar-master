import { StyleSheet, View, Image, Text, Pressable } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CustomButton from "./CustomButton"

export default NewArrivalProductCardVertical = ({ newProductItem, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.imageStyle} source={newProductItem.imagePath} />
            <Text style={styles.headText} numberOfLines={1} ellipsizeMode="tail">{newProductItem.name}</Text>
            <View style={styles.rowStyle}>
                <Icon size={wp(5)} name='map-marker' color='gray' />
                <Text style={{width:'80%'}} numberOfLines={1} ellipsizeMode="tail">{newProductItem.location}</Text>
            </View>
            <View style={styles.rowStyle}>
                <Icon size={wp(5)}
                    name={newProductItem.isVerified ? 'check-decagram' : 'alert-decagram'}
                    color={newProductItem.isVerified ? 'green' : 'red'}
                />
                <Text style={wp(4)}>{newProductItem.isVerified ? 'Verified' : 'Unverified'}</Text>
            </View>
            <View>
                <CustomButton rightIcon={require('../../assets/img/phone.png')} rightIconBgColor={CustomColors.accentGreen} text='1 Get Quote'
                    onPress={() => { }}
                    textSize={wp(4)}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: wp(5),
        width: wp(45),
        height: wp(60),
        backgroundColor: 'white',
        elevation: 10,
        margin: wp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: '90%',
        height: '40%',
        borderRadius: wp(5),
    },
    headText: {
        fontWeight: 'bold',
        fontSize: wp(5),
        marginVertical: wp(2),
    },
    rowStyle: {
        flexDirection: 'row',
        marginBottom: wp(1),
        width: wp(45),
        justifyContent: 'center',
        overflow: "hidden"
    }
})