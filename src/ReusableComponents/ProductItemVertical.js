import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { View, StyleSheet, Text, Image, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from "../styles/CustomColors";

const ProductItemVertical = ({ product, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.imageStyle} source={product.imagePath} />
            <Text style={styles.headStyle}>{product.name}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle} ellipsizeMode="tail" numberOfLines={1}>Selling Price:</Text>
                    <Text style={styles.valueTextStyle} ellipsizeMode="tail" numberOfLines={1}>{product.sellingPrice}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Price:</Text>
                    <Text style={styles.valueTextStyle}ellipsizeMode="tail" numberOfLines={1}>{product.price}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Approved:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingRight: wp(4) }}>
                        <Text style={{ fontSize: wp(4), flex: 1 }} ellipsizeMode="tail" numberOfLines={1}>
                            {product.approval ? 'Approved' : 'Not Approved'}
                        </Text>
                        <Icon
                            name={product.approval ? 'check-decagram' : 'alert-decagram'}
                            size={wp(4)}
                            color={product.approval ? 'green' : 'red'}
                        />
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Status:</Text>
                    <Text style={styles.valueTextStyle} ellipsizeMode="tail" numberOfLines={1}>{product.status}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(45),
        height: wp(60),
        elevation: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: wp(5),
    },
    imageStyle: {
        borderRadius: wp(5),
        width: '100%',
        height: '40%'
    },
    table: {
        marginHorizontal: wp(2),
        width: '100%'
    },
    headStyle:{
        color: '#5a432f',
        textAlign: 'center',
        fontSize: wp(5),
        fontWeight: 'bold',
        marginVertical: wp(2),
        marginStart: wp(2),
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: wp(0.3),
    },
    nameStyle: {
        color: CustomColors.mattBrownDark,
        fontSize: wp(5),
        fontWeight: 'bold',
    },
    keyTextStyle: {
        color: 'black',
        flex: 1,
    },
    valueTextStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp(4),
        flex: 1,
        paddingRight: wp(4),
    }
})

export default ProductItemVertical