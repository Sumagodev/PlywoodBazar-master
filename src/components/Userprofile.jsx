import {ScrollView, View, Text, SafeAreaView, FlatList, Image, Pressable, StyleSheet, StatusBar, TouchableOpacity, Modal} from 'react-native';
import React, {useState, useRef, useEffect, useContext} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../../assets/stylecomponents/Style';
import {TextInput, useTheme} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
// import Header from '../ReusableComponents/Header';
import useRedirectToLoginIfNotLoggedIn from '../utils/RedirectToLoginIfNotLoggedIn';
import {isAuthorisedContext} from '../navigation/Stack/Root';
import {deleteUserByID, getUserById, removeToken} from '../services/User.service';
import Header from '../navigation/customheader/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from '../styles/CustomColors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// import Modal from "react-native-modal";
export default function Userprofile(props) {
  const navigate = useNavigation();

  const focused = useIsFocused();
  const [isAuthorized, setIsAuthorized] = useContext(isAuthorisedContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userID, setUserID] = useState('');

  const redirectToLogin = useRedirectToLoginIfNotLoggedIn({isAuthorized});

  useEffect(() => {
    if (isAuthorized) {
    } else {
      redirectToLogin();
    }
  }, [isAuthorized, focused]);
  const getUserObj = async () => {
    try {
      const {data: res} = await getUserById();
      if (res) {
        console.log(JSON.stringify(res.data._id, null, 2), '//////////////////');
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
    navigate.navigate('Home');
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteUserByID(userID);
      if (res) {
        console.log(res.message);
        await removeToken();
        setIsAuthorized(false);
        // navigate('home')
        navigate.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header normal={true} screenName={'Account'} rootProps={props} />
      <ScrollView style={[{paddingVertical: wp(0.5), paddingHorizontal: wp(2), backgroundColor: 'white'}]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {/* <Header /> */}

        <Pressable onPress={() => navigate.navigate('Userprofile1')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="user" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Profile</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MyProducts')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="box-open" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>My Products</Text>
        </Pressable>
        <Pressable onPress={() => navigate.navigate('DealershipOppolisting')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="box-open" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Dealership Opportunities</Text>
        </Pressable>
        <Pressable onPress={() => navigate.navigate('AppliedOpportunitieslist')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="box-open" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Applied Opportunities</Text>
        </Pressable>
        <Pressable onPress={() => navigate.navigate('SelfAppliedOpportunitiesList')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="box-open" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>My Applied Opportunities</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('Leads')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="clipboard-list" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>My Leads</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('RecentActivity')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="history" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Recent Activity</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MySubscriptions')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="credit-card" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>My Subscriptions</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('Topups')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="money-bill-wave" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Topups</Text>
        </Pressable>
        <Pressable onPress={() => navigate.navigate('AddBannerfrom')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="money-bill-wave" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Add Banner</Text>
        </Pressable>
        <Pressable onPress={() => navigate.navigate('AllBannerslisting')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="money-bill-wave" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}> My Banner List</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MyFlashSales')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="bolt" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>My Flash Sales</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('MyPromotions')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="bullhorn" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>My Promotions ( New Arrival )</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('AllChats')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="comments" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Help Center</Text>
        </Pressable>

        <Pressable onPress={() => navigate.navigate('LegalAbouts')} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="info-circle" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Legal & Abouts</Text>
        </Pressable>

        <Pressable onPress={() => setDeleteModal(true)} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="trash" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Delete Account</Text>
        </Pressable>

        <Pressable onPress={() => handleLogout()} style={profileStyle.container}>
          <View style={profileStyle.iconContainer}>
            <FontAwesome5Icon style={profileStyle.icon} name="power-off" size={wp(6)} color="white" />
          </View>
          <Text style={profileStyle.title}>Logout</Text>
        </Pressable>

        {/* <Pressable
          onPress={() => setDeleteModal(true)}
          style={{
            borderColor: '#BA3F25',
            borderWidth: 1,
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
            height: hp(8),
          }}>
          <Text
            style={{
              color: '#BA3F25',
              color: '#000000',
              fontFamily: 'Manrope-Light',
            }}>
            Delete Account
          </Text>
          <Image source={require('../../assets/img/trash.png')} style={{width: wp(5), height: wp(5)}} resizeMode="contain" />
        </Pressable>

       

        <Pressable style={[styles1.bgbtn, {paddingBottom: 15}]} onPress={() => handleLogout()}>
          <Text style={{textAlign: 'center', color: '#000', fontSize: 18, padding: 10, fontFamily: 'Manrope-Regular'}}>
            Logout <Feather name="log-out" size={19} color="#000" />{' '}
          </Text>
        </Pressable> */}

        
        <Modal visible={deleteModal} style={{height: hp(100), backgroundColor: 'rgba(0,0,0,1)'}}>
          <View style={{width: wp(90), height: hp(25), alignSelf: 'center', backgroundColor: 'white', top: hp(40), elevation: 2, borderRadius: 5}}>
            <TouchableOpacity onPress={() => setDeleteModal(false)}>
              <Image source={require('../../assets/img/close.png')} style={{height: wp(6), width: wp(6), left: wp(80), top: hp(2)}} />
            </TouchableOpacity>
            <Text style={{fontSize: hp(2), alignSelf: 'center', top: hp(5)}}>Are You Sure Want To Delete Account?</Text>
            <View style={{flexDirection: 'row', width: wp(80), alignSelf: 'center', top: hp(10), justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => setDeleteModal(false)} style={{width: wp(35), borderColor: 'gray', borderWidth: 0.7, height: hp(5), alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'black', fontSize: hp(1.8)}}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteAccount()} style={{width: wp(35), backgroundColor: '#BA3F25', height: hp(5), alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: hp(1.8)}}>Yes</Text>
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
    height: hp(8),
  },
});

const profileStyle = StyleSheet.create({
  container: {
    margin: wp(2),
    flex: 1,
    width: wp(90),
    flexDirection: 'row',
    backgroundColor: '#FFF1E6',
    borderRadius: wp(20),
    alignContent: 'center',
  },

  iconContainer: {
    backgroundColor: CustomColors.colorNewButton,
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15),
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    marginLeft: wp(2),
    fontSize: wp(5),
    fontWeight: 800,
    color: CustomColors.mattBrownDark,
  },
});
