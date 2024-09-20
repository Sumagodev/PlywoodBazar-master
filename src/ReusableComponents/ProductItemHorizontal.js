import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { View, StyleSheet, Text, Image, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from "../styles/CustomColors";
import { useState } from "react";

const ProductItemHorizontal = ({ product, onPress }) => {
    const [imageFailed, setImageFailed] = useState(false); // State to track image failure
    
    return (
        <Pressable style={styles.container} onPress={onPress}>
            
            <Image
          source={imageFailed ? require('../../assets/img/logo_1.png') : product.imagePath} // Fallback to default image
          resizeMode='contain'
          style={styles.imageStyle}
          onError={() => setImageFailed(true)} // Set imageFailed to true on error
        />
            <View style={styles.table}>
                <Text style={styles.headStyle} numberOfLines={1} ellipsizeMode="tail">{product.name}</Text>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Selling Price:</Text>
                    <Text style={styles.valueTextStyle} ellipsizeMode="tail" numberOfLines={1}>{product.sellingPrice}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.keyTextStyle}>Price:</Text>
                    <Text style={styles.valueTextStyle}>{product.price}</Text>
                </View>
                <View style={styles.tableRow}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingRight: wp(4) }}>
                        <Text style={{ fontSize: wp(4), }} ellipsizeMode="tail" numberOfLines={1}>
                            {product.approval ? 'Approved' : 'Not Approved'}
                        </Text>
                        <Icon
                            name={product.approval ? 'check-decagram' : 'alert-decagram'}
                            size={wp(4)}
                            color={product.approval ? 'green' : 'red'}
                        />
                    </View>
                </View>            
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:wp(1),
        width: wp(95),
        height: wp(32),
        flexDirection: 'row',
        elevation: 1,
        padding: wp(2),
        backgroundColor: 'white',
        borderRadius: wp(5),
    },
    imageStyle: {
        borderRadius: wp(5),
        width: '30%',
        height: '100%'
    },
    table: {
        marginTop: wp(1),
        marginStart: wp(4),
        width: '60%'
    },
    headStyle: {
        color: '#cc8d19',
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