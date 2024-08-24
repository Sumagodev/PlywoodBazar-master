import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { Rating } from "react-native-ratings";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "./CustomButton";
import CustomColors from "../styles/CustomColors";

const VendorListItem = ({vendorItem})=>{
    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Image style={styles.imageStyle} source={vendorItem.imagePath} />
                <View style={{width: wp(6)}} />
                <View style={styles.columnContainer}>
                    <Text style={[styles.vendorName, {marginBottom: wp(0.256)}]} >{vendorItem.name}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={{fontWeight: '200', fontSize:wp(3.5)}}>PRODUCTS: </Text>
                        <Text style={styles.vendorProducts}>{vendorItem.products}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.vendorProducts}>{vendorItem.rating}</Text>
                        <View style={{width: wp(2)}} />
                        <Rating imageSize={wp(4)} readonly={true} ratingCount={5} startingValue={vendorItem.rating}/>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name='map-marker' size={wp(5)} color='black' />
                        <Text style={styles.vendorAddress} numberOfLines={2} ellipsizeMode="tail">{vendorItem.address}</Text>
                    </View>
                    <CustomButton rightIcon={require('../../assets/img/phone.png')} rightIconBgColor={CustomColors.accentGreen} text='CONTACT' 
                        onPress={()=>{

                        }}
                        marginTop={wp(1)} textSize={wp(4)}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: wp(1),
        borderRadius: 25,
    },
    mainContainer:{
        width: wp(90),
        elevation: 5,
        borderRadius: 20,
        flexDirection: 'row',
        padding: wp(2),
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imageStyle:{
        marginStart: wp(3),
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: wp(0.5),
        height: wp(28),
        width: wp(28),
        backgroundColor: 'black',
        shadowColor: 'black',
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    columnContainer:{
        justifyContent: 'flex-start',
        paddingStart: wp(1),
    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: wp(0.256),
        alignItems: 'center'
    },
    vendorName:{
        fontSize: wp(5),
        color: 'black',              
        fontWeight: 'bold',
    },
    vendorProducts:{
        fontSize: wp(4),
        color: 'black',
        fontWeight: 'bold',
    },
    vendorAddress:{
        fontSize: wp(3.4),
        color: 'grey',
        width: wp(45),
    }
})
export default VendorListItem