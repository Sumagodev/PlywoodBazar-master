import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet, View, Image, Pressable ,Linking} from "react-native";
import { Text } from "react-native-paper";
import { Rating } from "react-native-ratings";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "./CustomButton";
import CustomColors from "../styles/CustomColors";

const SearchList = ({vendorItem,onItemPress})=>{
    console.log('vendorItem',vendorItem);
    
    return(
        <Pressable style={styles.container} onPress={onItemPress}>
            <View style={styles.mainContainer}>                
                    <Image style={styles.imageStyle} resizeMode="contain" source={vendorItem.imagePath} />
                <View style={{width: wp(1.5)}} />
                <View style={styles.columnContainer}>
                    <Text style={[styles.vendorName, {marginBottom: wp(0.256)}]} numberOfLines={2} ellipsizeMode="tail">{vendorItem.name}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={{fontWeight: '200', fontSize:wp(3.5)}}>Role: </Text>
                        <Text style={styles.vendorProducts}>{vendorItem.Role}</Text>
                    </View>
                   
                 
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: wp(1),
        borderRadius: 25,        
        alignItems: 'center',
        alignSelf:'center',

    },
    mainContainer:{
        width: wp(94),
        elevation: 5,
        borderRadius: 20,
        flexDirection: 'row',
        padding: wp(2),
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: '#fff'
    },
    imageStyle:{
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: wp(0.5),
        height: wp(23),
        width: wp(23),
        backgroundColor: '#ffffff',
        shadowColor: 'black',
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    columnContainer:{
        flex:1,
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
        fontSize: wp(4.5),
        color: 'black',              
        fontWeight: 'bold',
    },
    vendorProducts:{
        fontSize: wp(3.0),
        color: 'black',
        fontWeight: 'bold',
    },
    vendorAddress:{
        fontSize: wp(2.7),
        color: 'grey',
        width: wp(45),
    }
})
export default SearchList