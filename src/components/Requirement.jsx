import {View,TextInput, Text, ImageBackground, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../assets/stylecomponents/Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Requirement() {
    const navigation = useNavigation()
  return (
    <ScrollView style={[styles.padinghr, styles.bgwhite]}>
      <View style={styles1.flexbetween}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
        </Pressable>
        <Text style={styles1.categry}>User</Text>
        <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
      </View>
      <ImageBackground style={styles1.bgheaderimg} source={require('../../assets/img/Image.png')} resizeMode="contain" blurRadius={10}>
        <Text style={styles1.textmid}>Tell us what you need</Text>
        <Text style={styles1.textmid2}>We'll give you the</Text>
        <Text style={styles1.textmid2}>best quotes! </Text>
      </ImageBackground>
      <Text style={styles1.textreqiment}>Requirement Information</Text>
        <View style={styles1.formgroup}>
            <Text style={styles1.labelform}>I want quotes for </Text>
            <TextInput style={styles1.card_main} placeholder='Enter Product / Service name' />
        </View>
        <View style={styles1.formgroup}>
            <Text style={styles1.labelform}>Requirement Details  </Text>
            <TextInput 
             multiline={true}
             numberOfLines={8}
            style={[styles1.card_main1textarea,]} placeholder='Additional details about your requirement...' />
        </View>
        <View style={styles1.formgroup}>
            <Text style={styles1.labelform}>Attach Files  </Text>
            <View style={styles1.borderupload}>
                <Image source={require('../../assets/img/Cloudupload.png')} style={{width:wp(16), height:hp(8)}} />
                <Text>Click here to upload</Text>
            </View>
        </View>
        <Text style={[styles1.textreqiment, {marginTop:15, marginBottom:10,}]}>Contact Details</Text>

        <View style={styles1.formgroup}>
            <Text style={styles1.labelform}>Email ID </Text>
            <TextInput style={styles1.card_main} placeholder='Enter your Email' />
        </View>
        <View style={styles1.formgroup}>
            <Text style={styles1.labelform}>Name</Text>
            <TextInput style={styles1.card_main} placeholder='Enter your Name' />
        </View>
        <View style={styles1.formgroup}>
            <Text style={styles1.labelform}>Mobile</Text>
            <TextInput style={styles1.card_main} placeholder='Enter your Phone' />
        </View>

            <TouchableOpacity onPress={()=> navigation.navigate('Mobilenumber')} style={[styles.btnbg, {marginVertical:15    }]}>
              <Text style={[styles.textbtn,  {fontFamily:'Manrope-Medium'}]}>Write a Review</Text>
            </TouchableOpacity>


            <View style={styles1.reviewbox}>
                <Image source={require('../../assets/img/quote.png')} style={styles1.qouteicon} resizeMode='contain' />
                <Text style={styles1.hedingreview}> Tell us what you need</Text>
                <Text  style={styles1.reviewtext}>Post your requirement to get the best deals from our wide network of 5.5 million verified suppliers</Text>
            </View>
            <View style={styles1.reviewbox}>
                <Image source={require('../../assets/img/quote.png')} style={[styles1.qouteicon1]} resizeMode='contain' />
                <Text style={styles1.hedingreview}>  Receive seller details</Text>
                <Text  style={styles1.reviewtext}>We will send you the most relevant supplier contact details on your registered email address and mobile number</Text>
            </View>
            <View style={styles1.reviewbox}>
                <Image source={require('../../assets/img/quote.png')} style={styles1.qouteicon} resizeMode='contain' />
                <Text style={styles1.hedingreview}> Tell us what you need</Text>
                <Text  style={styles1.reviewtext}>Post your requirement to get the best deals from our wide network of 5.5 million verified suppliers</Text>
            </View>
            <View style={styles1.reviewbox}>
                <Image source={require('../../assets/img/quote.png')} style={[styles1.qouteicon1]} resizeMode='contain' />
                <Text style={styles1.hedingreview}>  Receive seller details</Text>
                <Text  style={styles1.reviewtext}>We will send you the most relevant supplier contact details on your registered email address and mobile number</Text>
            </View>
    </ScrollView>
  );
}

const styles1 = StyleSheet.create({
    qouteicon:{
        width:wp(10), height:hp(4),
        position:'absolute',
        top:-15,
        left:10,
    },
    qouteicon1:{
        width:wp(10), height:hp(4),
        position:'absolute',
        top:-15,
        right:10,
    },
    hedingreview:{
        color:'#525564',
        fontSize:14,
        fontFamily:'Manrope-Medium'
    },
    reviewtext:{
        color:'#7C7E8A',
        fontSize:12,
        lineHeight:18,
        textAlign:'center',
        paddingHorizontal:10
    },
    reviewbox:{
        marginVertical:15,
        borderWidth: 0.5,
        borderColor: '#F7E9C9',
        borderStyle: 'solid',
        padding:15,
        textAlign:'center',
        alignItems:'center',
        borderRadius:6,
        position:'relative'
    },
    borderupload:{
        borderWidth: 1,
        borderRadius: 16,
        display:'flex',
        alignItems:'center',
        paddingVertical:30,
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
    },
    card_main1textarea:{
        height:120,
        textAlignVertical: 'top',
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
    },
    labelform:{
        color:'#000',
        marginBottom:10,
        fontFamily:'Manrope-Medium'
    },
    card_main: {
        borderWidth: 1,
        height:45,
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        marginBottom: 10,
        fontFamily: 'Manrope-Medium',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'row',
      },

    textreqiment:{
        color:'#000000',
        fontSize:18,
        fontFamily: 'Manrope-Bold', 
        marginBottom:15,   
    },
    formgroup:{
        marginBottom:10,
    },
  textmid: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Manrope-Light',
    marginBottom: 20,
  },
  textmid2: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
  },
  bgheaderimg: {
    
    width: wp(95),
    height: hp(24),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
  },
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  imgsmall: {
    width: wp(6),
    height: hp(3),
  },
  categry: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Manrope-Medium',
  },
});
