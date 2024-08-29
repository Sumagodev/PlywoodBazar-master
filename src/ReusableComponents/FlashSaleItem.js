import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import CustomColors from '../styles/CustomColors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const FlashSaleItem = ({ imagePath, name, actualPrice, salePrice, duration, onCallPress, onCardPress,id}) => {
    const navigation = useNavigation();

    return (
      <Pressable style={styles.masterContainer} onPress={onCardPress}>
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={imagePath}/>
            <Text style={styles.nameStyle}>{name}</Text>
            {duration &&<Text style={[styles.salePriceStyle, {color: 'red', fontSize: wp(2)}]}>{duration} days left</Text>}
            <Text style={styles.actualPriceStyle}>₹{actualPrice}/-</Text>
            <Text style={styles.salePriceStyle}>₹{salePrice}/-</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:wp(3)}}>
            <TouchableOpacity style={{marginHorizontal: 10, width:wp(10), height:wp(10),display:'flex', alignItems:'center', justifyContent:'center',  borderRadius:50, backgroundColor:'red', marginVertical: 2}} onPress={() => handleDeleteFlashSale(id)}>
            <FontAwesomeIcon name="trash-o" size={wp(6)}  color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 1, width:wp(10), height:wp(10),display:'flex', alignItems:'center', justifyContent:'center',  borderRadius:50, backgroundColor:'green'}} onPress={() => navigation.navigate("EditFlashSale", { data: id })}>
            <FontAwesomeIcon name="edit" size={wp(6)} color='#fff' />
          </TouchableOpacity>
          
        </View>
        </View>
        
       
      </Pressable>
    );
};

const styles = StyleSheet.create({
    masterContainer:{
        flexDirection:'column',
        width: wp(48),
        height:wp(65),
        backgroundColor: '#FFFFFF',
        marginHorizontal:wp(1),
        borderRadius: 10,
        elevation: 5,
    },
    container:{
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#FFFFFFF',
        flexDirection: 'column',
    },
    imageStyle:{
        margin: wp(2),
        width:"90%",
        height: "48%",
        borderRadius: 10,
    },
    nameStyle:{
        fontSize: wp(4),
        color: '#333333',
        fontWeight: 'bold',
        paddingStart: wp(3),
    },
    actualPriceStyle:{
        paddingTop: wp(1),
        fontSize: wp(3.6),
        color: '#333333',    
        paddingStart: wp(3.5),
        textDecorationLine: 'line-through',
    },
    salePriceStyle:{
        fontSize: wp(5),
        color: '#000000',    
        paddingStart: wp(2.5),
    },
    callImageStyle: {
        backgroundColor: CustomColors.accentGreen,
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: wp(2),
        width: wp(10),
        height: wp(10),
        margin: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
      },
      callIconStyle: {
        width: wp(10),
        height: wp(10),
        resizeMode: 'contain',
      },      
});

export default FlashSaleItem;