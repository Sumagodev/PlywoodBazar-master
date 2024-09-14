import React,{useState,useEffect} from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { generateImageUrl } from "../services/url.service";

const StateItem = ({ item ,onPress}) => {
    console.log('item.image', generateImageUrl(item.image));
    const [imageFailed, setImageFailed] = useState(false);
    return (
        <TouchableOpacity style={stateStyle.container} onPress={onPress}>
            <Image
                style={stateStyle.image}
                source={imageFailed ? require('../../assets/img/globe.png') : { uri: generateImageUrl(item?.image) }}
                onError={() => setImageFailed(true)}
            />


            <Text style={stateStyle.title} numberOfLines={1} ellipsizeMode="tail">{item.stateId.name}</Text>
        </TouchableOpacity>
    );
}

const stateStyle = StyleSheet.create({

    container: {
        marginHorizontal: widthPercentageToDP(1),
        marginVertical: widthPercentageToDP(3),
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
    ,
    image: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
        borderRadius: widthPercentageToDP(15),
    },
    title: {
        alignSelf: 'center',
        paddingVertical: widthPercentageToDP(3)
    },
    heading: {

    }
});


export default StateItem;