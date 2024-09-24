import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from "../styles/CustomColors";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const DealershipData = ({ onEditPress, product,onDeletePress }) => {
    return (
        <Pressable style={styles.container} onPress={onEditPress}>
            <Image style={styles.imageStyle} source={product.imagePath} />
            <Text style={styles.headStyle}>{product.name}</Text>
            <Text style={styles.headStyle}>{product.state}</Text>
    
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:wp(3),flex:1,alignSelf:'flex-end'}}>
            <TouchableOpacity style={{marginHorizontal: 10, width:wp(10), height:wp(10),display:'flex', alignItems:'center', justifyContent:'center',  borderRadius:50, backgroundColor:'#cc8d19', marginVertical: 2}} onPress={onDeletePress}>
            <FontAwesomeIcon name="trash-o" size={wp(5)}  color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 1, width:wp(10), height:wp(10),display:'flex', alignItems:'center', justifyContent:'center',  borderRadius:50, backgroundColor:'#cc8d19'}} onPress={onEditPress}>
            <FontAwesomeIcon name="edit" size={wp(5)} color='#fff' />
          </TouchableOpacity>
          
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:wp(2),
        width: wp(45),
        height: wp(60),
        elevation: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: wp(5),
    },
    imageStyle: {

        width: '100%',
        height: '55%',
        borderTopRightRadius:wp(5),
        borderTopLeftRadius:wp(5),
    },
    table: {
        marginHorizontal: wp(2),
        width: '100%'
    },
    headStyle:{
        color: '#cc8d19',
        textAlign: 'center',
        fontSize: wp(4),
        fontWeight: 'bold',
        marginVertical: wp(.5),
        marginStart: wp(2),
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: wp(0.3),
    },
    nameStyle: {
        color: CustomColors.mattBrownDark,
        fontSize: wp(3.5),
        fontWeight: 'bold',
    },
    keyTextStyle: {
        color: 'black',
        flex: 1,
    },
    valueTextStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        flex: 1,
        paddingRight: wp(4),
    },
    valueTextStyleLight: {
        color: 'gray',
        fontSize: wp(3.5),
        flex: 1,
        paddingRight: wp(4),
    }
})

export default DealershipData