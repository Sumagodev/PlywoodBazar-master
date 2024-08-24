import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";

const StateItem=({item})=>{
    return (
        <View style={stateStyle.container}>                       
                <Image  style={stateStyle.image}source={require('../../assets/img/userimg.png')}></Image>            
                <Text style={stateStyle.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        </View>
    );
}

const stateStyle=StyleSheet.create({

    container:{        
        marginHorizontal:widthPercentageToDP(3),
        marginVertical:widthPercentageToDP(3),
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center'
    }
,
    image:{
        width:widthPercentageToDP(25),
        height:widthPercentageToDP(25),
        borderRadius:50,
    },
    title:{
        alignSelf:'center',
        paddingVertical:widthPercentageToDP(3)
    },
    heading:{
       
    }
});


export default StateItem;