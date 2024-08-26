import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import CustomButton from './CustomButton';
import { generateImageUrl } from '../services/url.service';

const BlogsItem = ({ item }) => {
    return (
        <Pressable onPress={()=>{}}>
            <View style={styles.container} >
                <Image source={{uri: generateImageUrl(item.image)}} style={styles.imageStyle}/>
                <Text style={styles.titleStyle} numberOfLines={2} ellipsizeMode="tail">{item?.name}</Text>
                {/* <Text style={styles.descriptionStyle}>{item.description}</Text> */}
                <View style={styles.btnStyle}>
                <CustomButton
                    onPress={() => { /* Button Action */ }} 
                    text="Read more" 
                    textSize={wp(4)}
                    fontWeight='bold'
                    buttonBgColor='#624832'
                />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        width: wp(45),
        height: wp(50),
        borderRadius: 25,
        marginHorizontal:wp(2),
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    imageStyle:{
        width: "95%",
        height: "50%",
        marginTop: wp(1),
        alignSelf: 'center',
        borderRadius: 20,
    },
    titleStyle:{
        paddingStart: wp(2),
        color: '#624832',
        fontWeight: 'bold',
        fontSize: wp(4),
    },
    descriptionStyle:{
        paddingStart: wp(2),
        marginBottom: wp(2),
        fontSize: wp(3),
    },
    btnStyle:{
        position: 'absolute',
        bottom: wp(1),
        margin: wp(1)
    }
});

export default BlogsItem;