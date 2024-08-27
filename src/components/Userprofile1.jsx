import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
//   import {DocumentPickerOptions} from 'react-native-document-picker';
import styles from '../../assets/stylecomponents/Style';
import {getUserById} from '../services/User.service';
import {errorToast} from '../utils/toastutill';
import {ROLES_CONSTANT} from '../utils/constants';
import {generateImageUrl} from '../services/url.service';
import Video from 'react-native-video';
import Header from '../navigation/customheader/Header';
import moment from 'moment';

export default function Userprofile1(props) {
  const [userObj, setUserObj] = useState(null);
  const navigation = useNavigation();
  const focused = useIsFocused();
  const getUserObj = async () => {
    try {
      const {data: res} = await getUserById();
      if (res) {
        console.log(JSON.stringify(res.data, null, 2));
        setUserObj(res.data);
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

  const navigate = useNavigation();
  const [text, setText] = React.useState('');
  const theme = useTheme();

  const [singleFile, setSingleFile] = useState('');

  const renderImage = ({item, index}) => {
    return <Image source={{uri: generateImageUrl(item.image)}} style={{height: 100, width: 100}} resizeMode="contain" />;
  };

  const onBuffer = val => console.log(val);
  const videoError = val => console.error(val);

  const renderVideo = ({item, index}) => {
    return (
      <Video
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={videoError}
        source={{uri: generateImageUrl(item.video)}}
        style={{height: 200, width: 200}}
        resizeMode="cover"
      />
      // <Image source={{ uri: generateImageUrl(item.image) }} style={{ height: 100, width: 100 }} resizeMode='contain' />
    );
  };

  return (
    <>
      <ScrollView style={[styles.padinghr, styles.bgwhite, {paddingBottom: 50}]}  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
>
      <Header stackHeader={true} screenName={'User'} rootProps={props} />
        {/* <View style={styles1.flexbetween}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
          </Pressable>
          <Text style={styles1.categry}>User</Text>
          <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
        </View> */}

        {/* <ImageBackground source={{uri: generateImageUrl(userObj?.bannerImage)}} style={[styles1.paddinghor10, {height: hp(20), borderRadius:20, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',}]} resizeMode='stretch'></ImageBackground> */}

        <View>
          <Image source={{uri: generateImageUrl(userObj?.bannerImage)}} style={{height: hp(20), borderRadius: 10}} resizeMode="cover" />
          <View style={{display: 'flex', flexDirection: 'row', gap: 10, paddingHorizontal: 5}}>
            <TouchableOpacity style={{marginTop: hp(-3), flex: 1}}>
              <Image source={userObj && userObj.profileImage ? {uri: generateImageUrl(userObj?.profileImage)} : require('../../assets/img/userpic.png')} style={styles1.imgfluid} resizeMode='stretch' />
            </TouchableOpacity>

            <View style={[{flex: 3, paddingTop: 5}]}>
              <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{display: 'flex',justifyContent: 'space-between',}}>
                <Text style={styles1.namehd}>{userObj?.name}</Text>
                <Text style={styles1.namehdemail}>{userObj?.email} </Text>
              </View>

                {userObj?.isVerified && (
                  <View style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10}}>
                    <Image source={require('../../assets/img/Business.png')} style={{width: wp(13), height: hp(6)}} />
                    <Text style={styles1.verfied}>Verified by plywood Bazar</Text>
                  </View>
                )}
                <TouchableOpacity onPress={() => navigate.navigate('Editprofile')}>
                  <Text style={[styles1.verfied, {color: '#b08218'}]}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Supplier', {data: userObj})} style={[styles.btnbg, {marginTop: hp(5)}]}>
          <Text style={[styles.textbtn, {fontFamily: 'Manrope-Medium'}]}>View Public Profile</Text>
        </TouchableOpacity>
            

        <Text style={{color: '#b08229', fontSize: 15, paddingLeft: 7, marginTop: 10, fontFamily:'Poppins-Medium', }}>Personal Details</Text>  
        <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
          <Text style={[styles1.nameheading, {color:'#797979'}]}>User Name</Text>
          <Text style={styles1.nameheading}>{userObj?.name}</Text>
        </View>
        <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
        <Text style={[styles1.nameheading, {color:'#797979'}]}>Phone </Text>
          <Text style={styles1.nameheading}>{userObj?.phone}</Text>
        </View>
        <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
        <Text style={[styles1.nameheading, {color:'#797979'}]}>Role </Text>
          <Text style={styles1.nameheading}> {userObj?.role}</Text>
        </View>
      
        <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
        <Text style={[styles1.nameheading, {color:'#797979'}]}>Country</Text>
          <Text style={styles1.nameheading}>{userObj?.countryObj?.name}</Text>
        </Pressable>
        <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
        <Text style={[styles1.nameheading, {color:'#797979'}]}>State</Text>
          <Text style={styles1.nameheading}>{userObj?.stateObj?.name}</Text>
        </Pressable>
        <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
        <Text style={[styles1.nameheading, {color:'#797979'}]}>City</Text>
          <Text style={styles1.nameheading}>{userObj?.cityObj?.name}</Text>
        </Pressable>
        {/* <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
        <Text style={[styles1.nameheading, {color:'#797979'}]}>Birthday</Text>
          <Text style={styles1.nameheading}>{moment(userObj?.aniversaryDate).format('YYYY-MM-DD')}</Text>
        </View> */}

        {userObj?.role != ROLES_CONSTANT.USER && (
          <>
            <Text style={{color: '#b08229', fontSize: 15, paddingLeft: 7, marginTop: 10, fontFamily:'Poppins-Medium', }}>Company Details</Text>

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
               <Text style={[styles1.nameheading, {color:'#797979'}]}>Company Name</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.name}</Text>
            </Pressable>

            {/* <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
               <Text style={[styles1.nameheading, {color:'#797979'}]}>Organization Phone / Landline</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.name}</Text>
            </Pressable> */}

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
            <Text style={[styles1.nameheading, {color:'#797979'}]}>Company Email:</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.email}</Text>
            </Pressable>

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
               <Text style={[styles1.nameheading, {color:'#797979'}]}>Company Phone:</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.phone}</Text>
            </Pressable>

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
               <Text style={[styles1.nameheading, {color:'#797979'}]}>Dealing With Brand Names:</Text>
              <Text style={styles1.nameheading}>{userObj?.brandNames}</Text>
            </Pressable>

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
            <Text style={[styles1.nameheading, {color:'#797979'}]}>GST number</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.gstNumber}</Text>
            </Pressable>

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
            <Text style={[styles1.nameheading, {color:'#797979'}]}>Company address</Text>
              <Text style={[styles1.nameheading, {maxWidth: '50%'}]}>{userObj?.companyObj?.address}</Text>
            </Pressable>
          

            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
            <Text style={[styles1.nameheading, {color:'#797979'}]}>Year of Establishment:</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.yearOfEstablishment}</Text>
            </Pressable>

            {/* <Pressable style={[styles1.card_main, {marginTop: 20, paddingVertical: 15}]}>
            <Text style={[styles1.nameheading, {color:'#797979'}]}>Established in Year</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.yearOfEstablishment}</Text>
            </Pressable> */}
            <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
            <Text style={[styles1.nameheading, {color:'#797979'}]}>Google Maps Link</Text>
              <Text style={styles1.nameheading}>{userObj?.companyObj?.googleMapsLink}</Text>
            </Pressable>
            <Text style={{color: 'black', fontSize: 18, paddingLeft: 7, marginVertical: 10}}>Your Images</Text>
            {
              userObj?.imagesArr && userObj?.imagesArr.length > 0 ?
              <FlatList
              data={userObj?.imagesArr}
              // ListHeaderComponent={}
              horizontal
              renderItem={renderImage}
              keyExtractor={(item, index) => index}
              />
               :
               <Text>No Images</Text>
            }
            <Text style={{color: 'black', fontSize: 18, paddingLeft: 7, marginVertical: 10}}>Your Videos </Text>

            {
              userObj?.videoArr && userObj?.videoArr.length > 0 ?
              
              <FlatList
              data={userObj?.videoArr}
              // ListHeaderComponent={}
              horizontal
              renderItem={renderVideo}
              keyExtractor={(item, index) => index}
              />
              :
              <Text>No Videos</Text>
            }
              </>
        )}

        {/* <Pressable onPress={() => navigate.navigate('Userprofile1')} style={[styles1.card_main, {marginTop: 20}]}>
          <Text style={styles1.nameheading}>Logout</Text>
          <Image source={require('../../assets/img/logout.png')} style={styles1.imgfluid1} />
        </Pressable> */}
      </ScrollView>
    </>
  );
}
const styles1 = StyleSheet.create({
  imgfluid1: {
    width: wp(20),
    height: hp(8),
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
  },
  verfied: {
    fontFamily: 'Manrope-Medium',
    color: '#000',
  },
  namehdemail: {
    color: '#323142',
    fontSize: 13,
    fontFamily: 'Manrope-Regular',
  },
  namehd: {
    fontSize: 15,
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  textcenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  boxproduct: {
    backgroundColor: '#F4F4F4',
    borderRadius: 24,
    padding: 12,
    marginRight: 15,
    height: hp(18),
    width: wp(40),
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textsave: {
    textAlign: 'center',
    fontFamily: 'Outfit-Medium',
    fontSize: 17,
    color: '#fff',
  },
  savebtn: {
    backgroundColor: '#C63B3B',
    padding: 18,
    borderRadius: 5,
  },
  textchg: {
    textAlign: 'center',
    fontFamily: 'Outfit-Medium',
    fontSize: 17,
    color: '#C63B3B',
  },
  chngox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputbor: {
    borderColor: 'red',
  },
  userinfo: {
    marginVertical: 25,
    position: 'relative',
    // height:hp(23),
    // backgroundColor:'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgfluid: {
    width: wp(20),
    height: wp(20),
    borderColor: '#B08218',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 50,
  },
  abosoluicon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    lineHeight: 25,
  },
  mbboot: {
    fontSize: 13,
    marginBottom: 12,
    fontFamily: 'Outfit-Medium',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'relative',
    zIndex: 1,
    height: hp(100),
  },
  modalView: {
    margin: 20,
    width: wp(95),
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 30,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  canclebtn: {
    borderRadius: 5,
    borderColor: '#C63B3B',
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'center',
    padding: 10,
    color: '#C63B3B',
    fontSize: 15,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    fontSize: 18,
    color: '#C63B3B',
  },
  textcenter1: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
});
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import React, {useState} from 'react';
// import {useEffect} from 'react';
// import {FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {useTheme} from 'react-native-paper';
// import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// //   import {DocumentPickerOptions} from 'react-native-document-picker';
// import styles from '../../assets/stylecomponents/Style';
// import {getUserById} from '../services/User.service';
// import {errorToast} from '../utils/toastutill';
// import {ROLES_CONSTANT} from '../utils/constants';
// import {generateImageUrl} from '../services/url.service';
// import Video from 'react-native-video';
// import Header from '../navigation/customheader/Header';
// import moment from 'moment';

// export default function Userprofile1(props) {
//   const [userObj, setUserObj] = useState(null);
//   const navigation = useNavigation();
//   const focused = useIsFocused();
//   const getUserObj = async () => {
//     try {
//       const {data: res} = await getUserById();
//       if (res) {
//         console.log(JSON.stringify(res.data, null, 2));
//         setUserObj(res.data);
//       }
//     } catch (error) {
//       errorToast(error);
//     }
//   };

//   useEffect(() => {
//     if (focused) {
//       getUserObj();
//     }
//   }, [focused]);

//   const navigate = useNavigation();
//   const [text, setText] = React.useState('');
//   const theme = useTheme();

//   const [singleFile, setSingleFile] = useState('');

//   const renderImage = ({item, index}) => {
//     return <Image source={{uri: generateImageUrl(item.image)}} style={{height: 100, width: 100}} resizeMode="contain" />;
//   };

//   const onBuffer = val => console.log(val);
//   const videoError = val => console.error(val);

//   const renderVideo = ({item, index}) => {
//     return (
//       <Video
//         onBuffer={onBuffer} // Callback when remote video is buffering
//         onError={videoError}
//         source={{uri: generateImageUrl(item.video)}}
//         style={{height: 200, width: 200}}
//         resizeMode="cover"
//       />
//       // <Image source={{ uri: generateImageUrl(item.image) }} style={{ height: 100, width: 100 }} resizeMode='contain' />
//     );
//   };

//   return (
//     <>
//       <ScrollView style={[styles.padinghr, styles.bgwhite, {paddingBottom: 50}]}  showsVerticalScrollIndicator={false}
//   showsHorizontalScrollIndicator={false}
// >
//       <Header stackHeader={true} screenName={'User'} rootProps={props} />
//         {/* <View style={styles1.flexbetween}>
//           <Pressable onPress={() => navigation.goBack()}>
//             <Image source={require('../../assets/img/backbtn.png')} style={styles1.imgsmall} resizeMode="contain" />
//           </Pressable>
//           <Text style={styles1.categry}>User</Text>
//           <Image source={require('../../assets/img/notification.png')} style={styles1.imgsmall} />
//         </View> */}

//         {/* <ImageBackground source={{uri: generateImageUrl(userObj?.bannerImage)}} style={[styles1.paddinghor10, {height: hp(20), borderRadius:20, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',}]} resizeMode='stretch'></ImageBackground> */}

//         <View>
//           <Image source={{uri: generateImageUrl(userObj?.bannerImage)}} style={{height: hp(20), borderRadius: 10}} resizeMode="cover" />
//           <View style={{display: 'flex', flexDirection: 'row', gap: 10, paddingHorizontal: 5}}>
//             <TouchableOpacity style={{marginTop: hp(-3), flex: 1}}>
//               <Image source={userObj && userObj.profileImage ? {uri: generateImageUrl(userObj?.profileImage)} : require('../../assets/img/userpic.png')} style={styles1.imgfluid} resizeMode='stretch' />
//             </TouchableOpacity>

//             <View style={[{flex: 3, paddingTop: 5}]}>
//               <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
//               <View style={{display: 'flex',justifyContent: 'space-between',}}>
//                 <Text style={styles1.namehd}>{userObj?.name}</Text>
//                 <Text style={styles1.namehdemail}>{userObj?.email} </Text>
//               </View>

//                 {userObj?.isVerified && (
//                   <View style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10}}>
//                     <Image source={require('../../assets/img/Business.png')} style={{width: wp(13), height: hp(6)}} />
//                     <Text style={styles1.verfied}>Verified by plywood Bazar</Text>
//                   </View>
//                 )}
//                 <TouchableOpacity onPress={() => navigate.navigate('Editprofile')}>
//                   <Text style={[styles1.verfied, {color: '#b08218'}]}>Edit</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity onPress={() => navigation.navigate('Supplier', {data: userObj})} style={[styles.btnbg, {marginTop: hp(5)}]}>
//           <Text style={[styles.textbtn, {fontFamily: 'Manrope-Medium'}]}>View Public Profile</Text>
//         </TouchableOpacity>
            

//         <Text style={{color: '#b08229', fontSize: 15, paddingLeft: 7, marginTop: 10, fontFamily:'Poppins-Medium', }}>Personal Details</Text>  
//         <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//           <Text style={[styles1.nameheading, {color:'#797979'}]}>User Name</Text>
//           <Text style={styles1.nameheading}>{userObj?.name}</Text>
//         </View>
//         <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//         <Text style={[styles1.nameheading, {color:'#797979'}]}>Phone </Text>
//           <Text style={styles1.nameheading}>{userObj?.phone}</Text>
//         </View>
//         <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//         <Text style={[styles1.nameheading, {color:'#797979'}]}>Role </Text>
//           <Text style={styles1.nameheading}> {userObj?.role}</Text>
//         </View>
      
//         <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//         <Text style={[styles1.nameheading, {color:'#797979'}]}>Country</Text>
//           <Text style={styles1.nameheading}>{userObj?.countryObj?.name}</Text>
//         </Pressable>
//         <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//         <Text style={[styles1.nameheading, {color:'#797979'}]}>State</Text>
//           <Text style={styles1.nameheading}>{userObj?.stateObj?.name}</Text>
//         </Pressable>
//         <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//         <Text style={[styles1.nameheading, {color:'#797979'}]}>City</Text>
//           <Text style={styles1.nameheading}>{userObj?.cityObj?.name}</Text>
//         </Pressable>
//         {/* <View style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//         <Text style={[styles1.nameheading, {color:'#797979'}]}>Birthday</Text>
//           <Text style={styles1.nameheading}>{moment(userObj?.aniversaryDate).format('YYYY-MM-DD')}</Text>
//         </View> */}

//         {userObj?.role != ROLES_CONSTANT.USER && (
//           <>
//             <Text style={{color: '#b08229', fontSize: 15, paddingLeft: 7, marginTop: 10, fontFamily:'Poppins-Medium', }}>Company Details</Text>

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//                <Text style={[styles1.nameheading, {color:'#797979'}]}>Company Name</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.name}</Text>
//             </Pressable>

//             {/* <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//                <Text style={[styles1.nameheading, {color:'#797979'}]}>Organization Phone / Landline</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.name}</Text>
//             </Pressable> */}

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//             <Text style={[styles1.nameheading, {color:'#797979'}]}>Company Email:</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.email}</Text>
//             </Pressable>

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//                <Text style={[styles1.nameheading, {color:'#797979'}]}>Company Phone:</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.phone}</Text>
//             </Pressable>

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//                <Text style={[styles1.nameheading, {color:'#797979'}]}>Dealing With Brand Names:</Text>
//               <Text style={styles1.nameheading}>{userObj?.brandNames}</Text>
//             </Pressable>

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//             <Text style={[styles1.nameheading, {color:'#797979'}]}>GST number</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.gstNumber}</Text>
//             </Pressable>

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//             <Text style={[styles1.nameheading, {color:'#797979'}]}>Company address</Text>
//               <Text style={[styles1.nameheading, {maxWidth: '50%'}]}>{userObj?.companyObj?.address}</Text>
//             </Pressable>
          

//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//             <Text style={[styles1.nameheading, {color:'#797979'}]}>Year of Establishment:</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.yearOfEstablishment}</Text>
//             </Pressable>

//             {/* <Pressable style={[styles1.card_main, {marginTop: 20, paddingVertical: 15}]}>
//             <Text style={[styles1.nameheading, {color:'#797979'}]}>Established in Year</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.yearOfEstablishment}</Text>
//             </Pressable> */}
//             <Pressable style={[styles1.card_main, {marginTop: 5, paddingVertical: 15}]}>
//             <Text style={[styles1.nameheading, {color:'#797979'}]}>Google Maps Link</Text>
//               <Text style={styles1.nameheading}>{userObj?.companyObj?.googleMapsLink}</Text>
//             </Pressable>
//             <Text style={{color: 'black', fontSize: 18, paddingLeft: 7, marginVertical: 10}}>Your Images</Text>
//             {
//               userObj?.imagesArr && userObj?.imagesArr.length > 0 ?
//               <FlatList
//               data={userObj?.imagesArr}
//               // ListHeaderComponent={}
//               horizontal
//               renderItem={renderImage}
//               keyExtractor={(item, index) => index}
//               />
//                :
//                <Text>No Images</Text>
//             }
//             <Text style={{color: 'black', fontSize: 18, paddingLeft: 7, marginVertical: 10}}>Your Videos </Text>

//             {
//               userObj?.videoArr && userObj?.videoArr.length > 0 ?
              
//               <FlatList
//               data={userObj?.videoArr}
//               // ListHeaderComponent={}
//               horizontal
//               renderItem={renderVideo}
//               keyExtractor={(item, index) => index}
//               />
//               :
//               <Text>No Videos</Text>
//             }
//               </>
//         )}

//         {/* <Pressable onPress={() => navigate.navigate('Userprofile1')} style={[styles1.card_main, {marginTop: 20}]}>
//           <Text style={styles1.nameheading}>Logout</Text>
//           <Image source={require('../../assets/img/logout.png')} style={styles1.imgfluid1} />
//         </Pressable> */}
//       </ScrollView>
//     </>
//   );
// }
// const styles1 = StyleSheet.create({
//   imgfluid1: {
//     width: wp(20),
//     height: hp(8),
//   },
//   card_main: {
//     borderWidth: 1,
//     borderColor: '#D9D9D9',
//     borderStyle: 'solid',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 16,
//     marginBottom: 10,
//     fontFamily: 'Manrope-Medium',
//     color: '#000',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   verfied: {
//     fontFamily: 'Manrope-Medium',
//     color: '#000',
//   },
//   namehdemail: {
//     color: '#323142',
//     fontSize: 13,
//     fontFamily: 'Manrope-Regular',
//   },
//   namehd: {
//     fontSize: 15,
//     fontFamily: 'Manrope-Bold',
//     color: '#000',
//   },
//   textcenter: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   flexbetween: {
//     display: 'flex',
//     flexDirection: 'row',
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//   },
//   imgsmall: {
//     width: wp(6),
//     height: hp(3),
//   },
//   categry: {
//     fontSize: 18,
//     color: '#000',
//     fontFamily: 'Manrope-Medium',
//   },
//   boxproduct: {
//     backgroundColor: '#F4F4F4',
//     borderRadius: 24,
//     padding: 12,
//     marginRight: 15,
//     height: hp(18),
//     width: wp(40),
//     display: 'flex',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textsave: {
//     textAlign: 'center',
//     fontFamily: 'Outfit-Medium',
//     fontSize: 17,
//     color: '#fff',
//   },
//   savebtn: {
//     backgroundColor: '#C63B3B',
//     padding: 18,
//     borderRadius: 5,
//   },
//   textchg: {
//     textAlign: 'center',
//     fontFamily: 'Outfit-Medium',
//     fontSize: 17,
//     color: '#C63B3B',
//   },
//   chngox: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   inputbor: {
//     borderColor: 'red',
//   },
//   userinfo: {
//     marginVertical: 25,
//     position: 'relative',
//     // height:hp(23),
//     // backgroundColor:'red',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imgfluid: {
//     width: wp(20),
//     height: wp(20),
//     borderColor: '#B08218',
//     borderWidth: 2,
//     borderStyle: 'solid',
//     borderRadius: 50,
//   },
//   abosoluicon: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     textAlign: 'center',
//     borderRadius: 50,
//     backgroundColor: '#fff',
//     width: 25,
//     height: 25,
//     lineHeight: 25,
//   },
//   mbboot: {
//     fontSize: 13,
//     marginBottom: 12,
//     fontFamily: 'Outfit-Medium',
//   },

//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     position: 'relative',
//     zIndex: 1,
//     height: hp(100),
//   },
//   modalView: {
//     margin: 20,
//     width: wp(95),
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     paddingVertical: 30,
//     // alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   canclebtn: {
//     borderRadius: 5,
//     borderColor: '#C63B3B',
//     borderWidth: 2,
//     borderStyle: 'solid',
//     textAlign: 'center',
//     padding: 10,
//     color: '#C63B3B',
//     fontSize: 15,
//   },

//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 5,
//     fontSize: 18,
//     color: '#C63B3B',
//   },
//   textcenter1: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#000',
//   },
// });
