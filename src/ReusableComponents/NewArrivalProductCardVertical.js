import { StyleSheet, View, Image, Text, Pressable } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CustomButton from "./CustomButton"
import { generateImageUrl } from '../services/url.service';
export default NewArrivalProductCardVertical = ({ newProductItem, image, onPress, onCallPress }) => {
    const item = newProductItem
    console.log('tttt', item);

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.imageStyle} source={image} />
            <Text style={styles.headText} numberOfLines={1} ellipsizeMode="tail">{newProductItem.productname}</Text>
        
            <View style={styles.rowStyle}>
                <View style={{ width: '90%', padding: wp(1), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Icon size={wp(5)} name='map-marker' color='gray' />
                    <Text style={{}} numberOfLines={1} ellipsizeMode="tail">{newProductItem.cityName}</Text>
                </View>
            </View>
            <View style={styles.rowStyle}>
                <Icon size={wp(5)}
                    name={newProductItem.verifeied ? 'check-decagram' : null}
                    color={newProductItem.verifeied ? 'green' : null}
                />
                <Text style={wp(4)}>{newProductItem.verifeied ? ' Verified' : null}</Text>
            </View>
            <View style={{ marginVertical: wp(1) }}>
                <CustomButton rightIcon={require('../../assets/img/phone.png')} rightIconBgColor={CustomColors.accentGreen} text='Get Quote'
                    onPress={onCallPress}
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
        height: wp(70),
        backgroundColor: 'white',
        elevation: 10,
        margin: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:wp(5)
    },
    imageStyle: {
        width: '90%',
        height: '40%',
        borderRadius: wp(5),
    },
    headText: {
        width: '85%',
        fontWeight: 'bold',
        fontSize: wp(5),
        marginVertical: wp(2),
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: wp(1),
        width: '85%',
        justifyContent: 'center',
        overflow: "hidden"
    }
})