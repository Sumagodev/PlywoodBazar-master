import { ScrollView, View, Text, SafeAreaView, FlatList, Image, Pressable, StyleSheet, StatusBar, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../../assets/stylecomponents/Style';
import { TextInput, useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
// import Header from '../ReusableComponents/Header';
import useRedirectToLoginIfNotLoggedIn from '../utils/RedirectToLoginIfNotLoggedIn';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import { deleteUserByID, getUserById, removeToken } from '../services/User.service';
import Header from '../navigation/customheader/Header';
// import Modal from "react-native-modal";
export default function Userprofile(props) {
  const navigate = useNavigation();
  
  const focused = useIsFocused();
  const [isAuthorized, setIsAuthorized] = useContext(isAuthorisedContext);
  const [deleteModal, setDeleteModal] = useState(false)
  const [userID, setUserID] = useState('')

  const redirectToLogin = useRedirectToLoginIfNotLoggedIn({ isAuthorized });

  useEffect(() => {
    if (isAuthorized) {
    } else {
      redirectToLogin();
    }
  }, [isAuthorized, focused]);
  const getUserObj = async () => {
    try {
      const { data: res } = await getUserById();
      if (res) {
        console.log(JSON.stringify(res.data._id, null, 2), "//////////////////");
        setUserID(res.data._id);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    if (focused) {
      getUserObj();
    }
  }, [focused]);

  const handleLogout = async () => {
    await removeToken();
    setIsAuthorized(false);
  };

  const handleDeleteAccount = async () => {

    try {
      const res = await deleteUserByID(userID)
      if (res) {
        console.log(res.message)
        await removeToken();
        setIsAuthorized(false);
        // navigate('home')
        navigate.navigate('Home');
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <Header stackHeader={true} screenName={'Account'} rootProps={props} />
      <ScrollView style={[styles.padinghr, { paddingTop: 10, paddingBottom: hp(40) }]} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {/* <Header /> */}

        <Pressable onPress={() => navigate.navigate('Userprofile1')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>Profile</Text>
          <Image source={require('../../assets/img/user.png')} style={{ width: wp(12), height: wp(12), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MyProducts')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>My Products</Text>
          <Image source={require('../../assets/img/icon4.jpeg')} style={{ width: wp(8), height: wp(8), }} resizeMode='contain' />
        </Pressable>

        <Pressable style={styles1.card_main} onPress={() => navigate.navigate('Leads')}>
          <Text style={styles1.nameheading}>My Leads</Text>
          <Image source={require('../../assets/img/leads_icon.jpeg')} style={{ width: wp(8), height: wp(8), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('RecentActivity')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>Recent Activity</Text>
          <Image source={require('../../assets/img/icon7.jpeg')} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MySubscriptions')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>My Subscriptions</Text>
          <Image source={require('../../assets/img/icon2.jpeg')} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('Topups')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>Topups</Text>
          <Image source={require('../../assets/img/icon1.jpeg')} style={{ width: wp(8), height: wp(8), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MyFlashSales')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>My Flash Sales </Text>
          <Image source={require('../../assets/img/icon6.jpeg')} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MyPromotions')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>My Promotions </Text>
          <Image source={require('../../assets/img/icon3.jpeg')} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' />
        </Pressable>
        <Pressable onPress={() => navigate.navigate('AllChats')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>Help Center</Text>
          <Image source={require('../../assets/img/help.png')} style={{ width: wp(13), height: wp(13), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => navigate.navigate('LegalAbouts')} style={styles1.card_main}>
          <Text style={styles1.nameheading}>Legal & Abouts</Text>
          <Image source={require('../../assets/img/info.png')} style={{ width: wp(5), height: wp(5), }} resizeMode='contain' />
        </Pressable>

        <Pressable onPress={() => setDeleteModal(true)} style={{
          borderColor: "#BA3F25", borderWidth: 1,
          // borderColor: '#D9D9D9',
          borderStyle: 'solid',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 16,
          marginBottom: 10,
          fontFamily: 'Manrope-Medium',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: hp(8)
        }}>
          <Text style={{
            color: "#BA3F25", color: '#000000',
            fontFamily: 'Manrope-Light',
          }}>Delete Account</Text>
          <Image source={require('../../assets/img/trash.png')} style={{ width: wp(5), height: wp(5), }} resizeMode='contain' />
        </Pressable>

        {/* <FlatList data={categoryname1} keyExtractor={(item, index) => `${index}`} renderItem={rendercategoryname1} scrollEnabled style={{maxHeight: hp(63), width: '100%'}} contentContainerStyle={{paddingVertical: 5, marginBottom: 30}} /> */}

        <Pressable style={[styles1.bgbtn, { paddingBottom: 15 }]} onPress={() => handleLogout()}>
          <Text style={{ textAlign: 'center', color: '#000', fontSize: 18, padding: 10, fontFamily: 'Manrope-Regular' }}>Logout <Feather name='log-out' size={19} color='#000' /> </Text>
        </Pressable>
        <Modal
          visible={deleteModal}
          style={{ height: hp(100), backgroundColor: 'rgba(0,0,0,1)' }}
        >
          <View style={{ width: wp(90), height: hp(25), alignSelf: 'center', backgroundColor: 'white', top: hp(40), elevation: 2, borderRadius: 5 }}>
            <TouchableOpacity onPress={() => setDeleteModal(false)}>
              <Image source={require('../../assets/img/close.png')}
                style={{ height: wp(6), width: wp(6), left: wp(80), top: hp(2) }} />
            </TouchableOpacity>
            <Text style={{ fontSize: hp(2), alignSelf: 'center', top: hp(5) }}>
              Are You Sure Want To Delete Account?
            </Text>
            <View style={{ flexDirection: 'row', width: wp(80), alignSelf: 'center', top: hp(10), justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setDeleteModal(false)} style={{ width: wp(35), borderColor: "gray", borderWidth: 0.7, height: hp(5), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: hp(1.8) }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteAccount()} style={{ width: wp(35), backgroundColor: "#BA3F25", height: hp(5), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: hp(1.8) }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

    </>
  );
}
const styles1 = StyleSheet.create({
  nameheading: {
    color: '#000000',
    fontFamily: 'Manrope-Light',
  },
  imgfluid: {
    width: wp(20),
    height: hp(8),
  },
  headermain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  bgimgcolor: {
    backgroundColor: 'red',
    width: wp(),
  },
  categorystyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col6: {
    width: wp(46),
  },
  categorybix: {
    backgroundColor: '#FFF9E6',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    position: 'relative',
  },
  imgsize: {
    width: wp(30),
    height: hp(10),
  },
  sliderhome: {
    marginVertical: 15,
  },
  headingmain: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  headerslid: {
    width: wp(95),
    height: hp(25),
    borderRadius: 6,
  },
  logoheader: {
    width: wp(40),
    height: hp(8),
  },
  headermain: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_main: {
    borderWidth: 1,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: hp(8)
  },
});
