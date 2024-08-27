import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { View, StyleSheet, Text, Image, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from "../styles/CustomColors";

const ProductItemHorizontal = ({ product, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.imageStyle} source={product.imagePath} />
            <View style={styles.table}>
                <Text style={styles.headStyle} ellipsizeMode="tail">{product.name}</Text>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Selling Price:</Text>
                    <Text style={styles.valueTextStyle} ellipsizeMode="tail" numberOfLines={1}>{product.sellingPrice}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Price:</Text>
                    <Text style={styles.valueTextStyle}>{product.price}</Text>
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
        width: wp(95),
        height: wp(40),
        flexDirection: 'row',
        elevation: 10,
        padding: wp(2),
        backgroundColor: 'white',
        borderRadius: wp(5),
    },
    imageStyle: {
        borderRadius: wp(5),
        width: '40%',
        height: '100%'
    },
    table: {
        marginTop: wp(1),
        marginStart: wp(2),
        width: '60%'
    },
    headStyle: {
        color: '#5a432f',
        textAlign: 'center',
        fontSize: wp(5),
        fontWeight: 'bold',
        marginBottom: wp(1),
        marginStart: wp(-2),
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'center',
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

export default ProductItemHorizontal