import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getAllCategories } from '../services/Category.service';
import { generateImageUrl } from '../services/url.service';
import { getHomePageBannersApi } from '../services/homepageBanners.service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { getDecodedToken, getToken } from '../services/User.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Header(props) {
  const navigate = useNavigation();

  const [categoryArr, setCategoryArr] = useState([]);
  const focused = useIsFocused()
  const [displayChat, setDisplayChat] = useState(false)
  const handleNestedcategories = async () => {
    try {
      let { data: res } = await getHomePageBannersApi();
      if (res.data && res.data?.length > 0) {
        setCategoryArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const checkAuth = async () => {
    let token = await AsyncStorage.getItem('AUTH_TOKEN')
    console.log(token, "qqq")
    if (token != null) {
      setDisplayChat(true)
    }
    else {
      setDisplayChat(false)
    }
  }

  checkAuth()
  useEffect(() => {
    // console.log(...categoryArr.map(el => generateImageUrl(`${el?.image}`)), '...categoryArr.map(el => generateImageUrl(`${el?.image}`))');
  }, [categoryArr]);
  useEffect(() => {
    handleNestedcategories();
  }, []);
  return (
    <>
      {/* <View style={styles1.headermain}>
        <Image source={require('../../assets/img/logoheader.png')} style={styles1.logoheader} resizeMode="contain" />
        <View style={styles1.rowflex}>
          {displayChat ?
            <Ionicons onPress={()=>navigate.navigate("AllChats")} name="help-circle-outline" size={30} color="#e54d6b" />
            :
            <></>
          }
          <Ionicons name="notifications-circle" size={25} color="#e54d6b" />
          <Pressable onPress={() => navigation.navigate("")}>
            <Entypo name="user" size={25} color="#e54d6b" />
          </Pressable>
        </View>
      </View> */}
{props.slidersection && (
        <View style={styles1.sliderhome1}>
          <SliderBox
            images={categoryArr.map(el => generateImageUrl(`${el?.image}`))}
            sliderBoxHeight={hp(25)}
            autoplay
            circleLoop
            dotStyle={styles1.dotStyle}
            paginationBoxVerticalPadding={0}
            dotColor="#725842"
            inactiveDotColor="#F5F1E8"
            paginationBoxStyle={styles1.paginationBoxStyle}
            ImageComponentStyle={styles1.imageStyle}
            imageLoadingColor="#2196F3"
            onCurrentImagePressed={index => console.log('Image pressed:', categoryArr[index]?._id)}
            resizeMode={'stretch'}
          />
        </View>
      )}
    </>
  );
};

const styles1 = StyleSheet.create({
  sliderhome1: {
    borderRadius: 20,
    marginRight: wp(0),
    marginVertical: 15,
  },
  imageStyle: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dotStyle: {
    width: wp(4),
    height: wp(4),
    borderRadius: 10,
    marginHorizontal: 0,
  },
  paginationBoxStyle: {
    position: 'relative', // Position relative so it stays within the layout flow
    bottom:0, // Adjust as needed to move dots below the image slider without affecting other views
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

