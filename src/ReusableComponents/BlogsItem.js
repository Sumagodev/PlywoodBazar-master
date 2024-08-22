import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import CustomColors from '../styles/CustomColors';
import CustomButton from './CustomButton';

const BlogsItem = ({ blog }) => {
    return (
        <View style={styles.container}>
            <Image source={require(blog.imagePath)} style={styles.imageStyle} />
            <Text style={styles.titleStyle}>{blog.title}</Text>
            <Text style={styles.descriptionStyle}>{blog.description}</Text>
            <CustomButton onPress={()=>{}} text="Read more" />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: wp(40),
        height: wp(45),
        borderRadius: 25,
        elevation: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    imageStyle:{
        width: "90%",
        height: "60%",
        margin: wp(1),
        elevation: 5,
    },
});

export default BlogsItem;