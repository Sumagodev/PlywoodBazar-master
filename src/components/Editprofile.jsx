import { View, Text, Image, TextInput, StyleSheet, Pressable, ScrollView, Modal, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Header from '../navigation/customheader/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign'
import { getDecodedToken, getUserById, updateUserById } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { ROLES_CONSTANT } from '../utils/constants';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { generateImageUrl } from '../services/url.service';
import Video from 'react-native-video';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import CustomColors from '../styles/CustomColors';
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../services/location.service';
export default function Editprofile(props) {
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [companyEmail, setcompanyEmail] = useState('');
  const [companyPhone, setcompanyPhone] = useState('');
  const [gstNumber, setgstNumber] = useState('');
  const [address, setaddress] = useState('');
  const [dob, setdob] = useState('');
  const [noofepmployee, setnoofepmployee] = useState('');
  const [gstCertificate, setgstCertificate] = useState('');
  const [countryId, setcountryId] = useState('648d5b79f79a9ff6f10a82fb');
  const [stateId, setstateId] = useState('');
  const [cityId, setcityId] = useState('');
  const [aniversaryDate, setAniversaryDate] = useState(new Date());
  const [bannerImage, setBannerImage] = useState('');
  const [brandNames, setBrandNames] = useState('');
  const [aniversaryDateModal, setAniversaryDateModal] = useState(false);
  console.log('stateIdx', stateId);
  console.log('cityIdx', cityId);

  const [profileImage, setProfileImage] = useState('');
  const [signature, setsignature] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const [imagesArr, setImagesArr] = useState([{ image: '', imageObj: {} }]);
  const [videoArr, setVideoArr] = useState([{ video: '', videoObj: {} }]);

  ///////new Fields///////
  const [natureOfBusiness, setNatureOfBusiness] = useState();
  const [annualTurnover, setAnnualTurnover] = useState();
  const [iecCode, setIecCode] = useState();
  const [yearOfEstablishment, setYearOfEstablishment] = useState();
  const [legalStatus, setLegalStatus] = useState();
  const [cinNo, setCinNo] = useState();
  const [companyCeo, setCompanyCeo] = useState();
  const [googleMapsLink, setGoogleMapsLink] = useState();
  const [userObj, setUserObj] = useState(null);
  const [countryArr, setcountryArr] = useState([]);
  const [stateArr, setstateArr] = useState([]);
  const [cityArr, setcityArr] = useState([]);

  const [selectedStateName, setSelectedStateName] = useState('');

  const [selectedCityName, setSelectedCityName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState('Country');
  const [selected, setSelected] = useState([]);
  console.log('cityyyyy', cityArr);
  const focused = useIsFocused();


  const getUserObj = async () => {
    try {
      const { data: res } = await getUserById();

      console.log("name organation===========", res, "end ===================")

      if (res) {
        console.log('updatex',JSON.stringify(res.data));
        setUserObj(res.data);
        setemail(res?.data?.email);
        setName(res?.data?.name);
        setphone(res?.data?.phone);
        if (res?.data?.aniversaryDate) {
          setAniversaryDate(res?.data?.aniversaryDate);
        }
        setpassword(res?.data?.password);
        setconfirmpassword(res?.data?.confirmpassword);
        setBrandNames(res?.data?.brandNames);
        setcompanyName(res?.data?.companyObj?.name);
        setcompanyEmail(res?.data?.companyObj?.email);
        setcompanyPhone(res?.data?.companyObj?.phone);
        setgstNumber(res?.data?.companyObj?.gstNumber);
        setaddress(res?.data?.companyObj?.address);
        setdob(res?.data?.dob);
        setnoofepmployee(res?.data?.companyObj?.noofepmployee);
        setProfileImage(res?.data?.profileImage);
        setsignature(res?.data?.signature);
        setgstCertificate(res?.data?.documents[0]?.image);
        setcountryId(res?.data?.countryId);
        setstateId(res?.data?.stateId);
        console.log('xState',res?.data?.stateId)
        setcityId(res?.data?.cityId);
        setNatureOfBusiness(res?.data?.companyObj?.natureOfBusiness);
        setAnnualTurnover(res?.data?.companyObj?.annualTurnover);
        setIecCode(res?.data?.companyObj?.iecCode);
        setYearOfEstablishment(res?.data?.companyObj?.yearOfEstablishment);
        setLegalStatus(res?.data?.companyObj?.legalStatus);
        setCinNo(res?.data?.companyObj?.cinNo);
        setBannerImage(res?.data?.bannerImage);
        setwhatsapp(res?.data?.whatsapp ? res?.data?.whatsapp : '');
        setCompanyCeo(res?.data?.companyObj?.companyCeo);
        setGoogleMapsLink(res?.data?.companyObj?.googleMapsLink);
        setImagesArr(res?.data?.imagesArr && res?.data?.imagesArr.length > 0 ? res?.data?.imagesArr : [{ image: '' }]);
        setVideoArr(res?.data?.videoArr && res?.data?.videoArr.length > 0 ? res?.data?.videoArr : [{ video: '' }]);
        setSelectedStateName(res?.data?.stateObj?.name)
        setSelectedCityName(res?.data?.cityObj?.name)
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
  const handleGetStates = async countrysId => {
    console.log();

    try {
      let { data: res } = await getStateByCountryApi(`countryId=${countryId}`);
      if (res.data) {
        console.log(res.data, 'asd');
        setstateArr(res.data);
      } else {
        setstateArr([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCities = async stateId => {
    try {
      let { data: res } = await getCityByStateApi(`stateId=${stateId}`);
      if (res.data) {
        setcityArr(res.data);
      } else {
        setcityArr([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (countryId) {
      handleGetStates(countryId);
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      handleGetCities(stateId.value);
    }
  }, [stateId]);
  const handleSubmit = async () => {
    try {
      if (`${companyName}` === '') {
        errorToast('Company Name is Required');
        return 0;
      }
      // if (`${companyPhone}` === '') {
      //   errorToast('Company Phone is Required');
      //   return 0;
      // }
      // if (`${gstNumber}` === '') {
      //   errorToast('Gst is Required');
      //   return 0;
      // }
      if (`${address}` === '') {
        errorToast('Address is Required');
        return 0;
      }
      if (`${countryId}` === '') {
        errorToast('Country is Required');
        return 0;
      }
      if (`${stateId}` === '') {
        errorToast('State is Required');
        return 0;
      }
      if (`${cityId}` === '') {
        errorToast('City is Required');
        return 0;
      }
      if (`${yearOfEstablishment}` === '') {
        errorToast('Year of Establishment is Required');
        return 0;
      }
      if (`${companyCeo}` === '') {
        errorToast('Company Ceo Name is Required');
        return 0;
      }
      if (`${googleMapsLink}` === '') {
        errorToast('Google Maps Link Name is Required');
        return 0;
      }
      if (`${address}` === '') {
        errorToast('Address is Required');
        return 0;
      }
      if (`${cityId.name}` === '') {
        errorToast('City  is Required');
        return 0;
      }
      if (`${stateId.name}` === '') {
        errorToast('State is Required');
        return 0;
      }
      let obj = {
        name,
        email,
        phone,
        address,
        dob,
        gstNumber,
        countryId,
        stateId: stateId.value,
        brandNames,
        cityId: cityId.value,
        profileImage,
        bannerImage,
        aniversaryDate,
        companyObj: {
          name: companyName,
          email: companyEmail,
          phone: companyPhone,
          address,
          gstNumber,
          noofepmployee,
          natureOfBusiness,
          aniversaryDate,
          annualTurnover,
          iecCode,
          yearOfEstablishment,
          legalStatus,
          cinNo,
          companyCeo,
          googleMapsLink,
        },

        whatsapp,
        gstCertificate,
        imagesArr,
        videoArr,
      };

      const { data: res } = await updateUserById(userObj?._id, obj);
      if (res) {
        toastSuccess(res.message);
        navigation.goBack();
      }
    } catch (error) {
      errorToast(error);
      console.log('catch', error);

    }
  };

  const handleAddImage = () => {
    // alert("asd")
    // let tempArr = imagesArr
    // tempArr.push({ image: "" })
    if (imagesArr && imagesArr.length < 3) {
      setImagesArr([...imagesArr, { image: '' }]);
    }
  };

  const handleRemoveImage = () => {
    if (imagesArr.length > 0) {
      let tempArr = imagesArr;
      tempArr = tempArr.filter((el, index) => index != tempArr.length - 1);
      setImagesArr([...tempArr]);
    }
  };
  // const handleSetImage = (index, value) => {

  // }

  const handleAddVideo = () => {
    if (videoArr && videoArr.length < 3) {
      let tempArr = videoArr;
      tempArr.push({ video: '' });
      setVideoArr([...tempArr]);
    }
  };

  const handleRemoveVideo = () => {
    if (videoArr.length > 0) {
      let tempArr = videoArr;
      tempArr = tempArr.filter((el, index) => index != tempArr.length - 1);
      setVideoArr([...tempArr]);
    }
  };
  const handleSetVideo = (index, value) => {
    let tempArr = videoArr;
    tempArr[index].video = value;
    setVideoArr([...tempArr]);
  };

  const handleDocumentPicker = async index => {
    try {
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      }).then(image => {
        console.log(image, image.path.split('/')[image.path.split('/').length - 1]);
        let tempArr = imagesArr;
        tempArr[index].image = `data:${image.mime};base64,${image.data}`;
        setImagesArr([...tempArr]);
        // setBannerImage(`data:${image.mime};base64,${image.data}`);
      });
      // let file = await DocumentPicker.pickSingle({
      //   presentationStyle: 'fullScreen',
      //   type: DocumentPicker.types.images,
      // });
      // if (file) {
      //   console.log(file, 'file');
      //   let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
      //   if (base64) {
      //     console.log('SETTING BASE ^$', file);
      //     let tempArr = imagesArr
      //     tempArr[index].image = `data:${file.type};base64,${base64}`
      //     setImagesArr([...tempArr])
      //   }
      // }
    } catch (error) {
      handleError(error);
    }
  };

  const handlePickProfileImage = async () => {
    try {
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      }).then(image => {
        // console.log(image, image.path.split("/")[image.path.split("/").length - 1]);
        setProfileImage(`data:${image.mime};base64,${image.data}`);
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handlePickBannerImage = async () => {
    try {
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      }).then(image => {
        // console.log(image, image.path.split("/")[image.path.split("/").length - 1]);
        setBannerImage(`data:${image.mime};base64,${image.data}`);
      });

      // let file = await DocumentPicker.pickSingle({
      //   presentationStyle: 'fullScreen',
      //   type: DocumentPicker.types.images,
      // });
      // if (file) {
      //   console.log(file, 'file');
      //   let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
      //   if (base64) {
      //     console.log('SETTING BASE ^$', file);
      //     let image = `data:${file.type};base64,${base64}`
      //     console.log(image, "image");
      //     setBannerImage(`${image}`)
      //   }
      // }
    } catch (error) {
      handleError(error);
    }
  };

  const handleDocumentPickerVideo = async index => {
    try {
      let file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: DocumentPicker.types.video,
      });
      if (file) {
        console.log(file, 'file');
        let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
        if (base64) {
          console.log('SETTING BASE ^$', file);
          let tempArr = videoArr;
          tempArr[index].video = `data:${file.type};base64,${base64}`;
          tempArr[index].videoObj = file;
          setVideoArr([...tempArr]);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onBuffer = () => { };
  const videoError = () => { };

  return (
    <>


      <ScrollView style={[styles.bgwhite, { paddingTop: 2, paddingBottom: 180 }]}>

        <Header normal={true} rootProps={props} />
        <View style={{ position: 'relative', zIndex: 1 }}>
          <Image source={{ uri: bannerImage && `${bannerImage}`.includes('base64') ? bannerImage : generateImageUrl(bannerImage) }} style={{ height: wp(50), borderRadius: 0 }} resizeMode="stretch" />
          <TouchableOpacity style={[{ position: 'absolute', right: 10, top: 10, height: wp(10), width: wp(10), backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 22, borderWidth: 3, borderColor: '#603200' }]} onPress={() => handlePickBannerImage()}>
            <FontAwesome name='pencil' size={wp(5)} color='#603200' />
          </TouchableOpacity>
          {/*
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center',zIndex:1}}>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: wp(50), position: 'relative', marginTop: -hp(6),zIndex:1}}>
             
            <TouchableOpacity onPress={() => handlePickProfileImage()} style={{position: 'absolute',zIndex:1}}>
                {profileImage && `${profileImage}`.includes('base64') ? (
                  <Image style={styles1.imgfluid}  resizeMode="cover" source={{uri: profileImage}} />
                ) : (
                  <Image style={styles1.imgfluid} resizeMode="contain" source={{uri: generateImageUrl(profileImage)}} />
                )}
                <AntDesign name="edit" size={17} color="#fff" style={{position: 'absolute', bottom: 0, right: 0, textAlign: 'center', borderRadius: 50, backgroundColor: '#b76c3c', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 30}} />
              </TouchableOpacity>
            </View>
          </View>
          */}
          <View style={{ flex: 1, gap: 10, alignSelf: 'center', marginTop: wp(15), zIndex: 1, position: 'absolute' }}>
            <TouchableOpacity style={{ bottom: wp(-14), alignSelf: 'center' }} >
              {profileImage && `${profileImage}`.includes('base64') ? (
                <Image style={styles1.imgfluid} resizeMode="cover" source={{ uri: profileImage }} />
              ) : (
                <Image style={styles1.imgfluid} resizeMode="contain" source={{ uri: generateImageUrl(profileImage) }} />
              )}

              <TouchableOpacity onPress={() => handlePickProfileImage()} style={{ alignSelf: 'flex-end', top: wp(-10), height: wp(9), width: wp(9), backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 22, borderWidth: 3, borderColor: '#603200' }}>
                <FontAwesome name='pencil' size={wp(4)} color='#603200' />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground style={[styles1.cardContainer, {}]} source={require('../../assets/img/main_bg.jpg')}>
          <View style={{ paddingHorizontal: wp(3), backgroundColor: CustomColors.mattBrownFaint }}>
            <Text style={{ color: '#b08229', fontSize: wp(4.5), paddingLeft: 7, marginTop: 10, fontFamily: 'Poppins-Medium', }}>Company Details</Text>


            <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Name of Organization</Text>

            <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
              <TextInput style={styles1.card_main} placeholder={'Organization Name'} onChangeText={e => setcompanyName(e)} value={companyName} />
            </View>


            {/* <View style={[styles1.card_main, {marginTop: 5}]}>
          <Image source={require('../../assets/img/usernameicon.png')} style={{width: wp(6), height: hp(3), marginRight: 5}} />
          <View>
            <View style={{width: wp(80)}}>
              <Text style={styles1.labelname}>Organization Email</Text>
              <TextInput style={styles1.inputborder} onChangeText={e => setcompanyName(e)} value={companyName} />
            </View>
          </View>
        </View> */}



            <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Organization Phone</Text>
            <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
              <TextInput style={styles1.card_main} placeholder={'Organization Phone'} onChangeText={setphone} value={phone} />
            </View>



            <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Birth Date</Text>
            <Pressable onPress={() => setAniversaryDateModal(true)}>
              <View style={[{ marginTop: 5 }]}>
                <TextInput style={styles1.card_main} onChangeText={e => setAniversaryDate(e)} value={moment(aniversaryDate).format('YYYY-MM-DD')} editable={false} placeholder="DD - MM - YYYY" />
              </View>
            </Pressable>


            {userObj?.role != ROLES_CONSTANT.USER && (
              <>
                {/* <View style={[styles1.card_main, { marginTop: 10 }]}>
              <Image source={require('../../assets/img/Calendar.png')} style={{ width: wp(5), height: hp(2.5), marginRight: 5 }} />
              <View>
                <View style={{ width: wp(80) }}>
                  <Text style={styles1.labelname}> Date of birth</Text>
                  <TextInput style={styles1.inputborder} onChangeText={(e) => companyName(e)} value={companyName} editable={true} placeholder="Company Name" />
                </View>
              </View>
            </View> */}

                {/* <View style={[styles1.card_main, {marginTop: 10}]}>
             
              <View style={{marginRight: 5}}>
                <Fontisto name="email" color="#000" size={16} />
              </View>

              <View>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}> Company Email</Text>
                  <TextInput style={styles1.inputborder} value={companyEmail} onChangeText={setcompanyEmail} placeholder="Company Email" />
                </View>
              </View>
            </View> */}


                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}> Address</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={address} onChangeText={setaddress} placeholder="Address" />
                </View>

                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Landline</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={companyPhone} onChangeText={setcompanyPhone} placeholder="Company Phone" />
                </View>


                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Brand Names:</Text>

                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={brandNames} onChangeText={setBrandNames} placeholder="Nature Of Business" />
                </View>

                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Role</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={natureOfBusiness} onChangeText={setNatureOfBusiness} placeholder="Nature Of Business" editable={false} />
                </View>


                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Google Maps Link</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={googleMapsLink} onChangeText={setGoogleMapsLink} placeholder="Google Maps `Link" />
                </View>

                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>GST Number</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={gstNumber} placeholder="GST Number" />
                </View>


                <Text style={{ color: '#b08229', fontSize: wp(4.5), paddingLeft: 7, marginTop: 10, fontFamily: 'Poppins-Medium', }}>Personal Details</Text>

                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Name of Authorised person</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} onChangeText={e => setName(e)} value={name} />
                </View>


                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Email</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} onChangeText={setemail} value={email} />
                </View>



                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Mobile No.</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} onChangeText={e => setphone(e)} value={phone} editable={false} />
                </View>


                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Whatsapp No.</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} onChangeText={e => setwhatsapp(e)} value={whatsapp} />
                </View>




                {/* <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Role</Text>
                <TextInput style={styles1.inputborder} value={natureOfBusiness} onChangeText={setNatureOfBusiness} placeholder="Role" />
              </View>
            </View> */}

                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Year of Establishment</Text>
                <View style={[{ marginTop: 5, paddingVertical: 1 }]}>
                  <TextInput style={styles1.card_main} value={yearOfEstablishment} onChangeText={setYearOfEstablishment} placeholder="Year of Establishment" />
                </View>
                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) ,bottom:wp(-3)}]}>State</Text>
                <Pressable
                  style={[styles1.BorderedPressable,{height: wp(14),}]}
                  onPress={() => {
                    setModalVisible(true);
                    setModalFor('State');
                  }}>
                  <Text style={styles.borderedPressableText}>{selectedStateName ? selectedStateName : ' State *'}</Text>
                </Pressable>
                <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5),bottom:wp(-3) }]}>City</Text>
                <Pressable
                  style={[styles1.BorderedPressable,{height: wp(14),}]}
                  onPress={() => {
                    setModalVisible(true);
                    setModalFor('City');
                  }}>
                  <Text style={styles.borderedPressableText}>{selectedCityName ? selectedCityName: 'City *'}</Text>
                </Pressable>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Images</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: wp(2) }}>
                    <Pressable onPress={() => handleAddImage()} style={[styles.btnbg, { paddingVertical: 10, paddingHorizontal: 12, marginRight: 10 }]}>
                      <FontAwesome name='plus' size={wp(5)} color='#FFFFFF' />
                    </Pressable>
                    <Pressable onPress={() => handleRemoveImage()} style={[styles.btnbg, { paddingVertical: 10, paddingHorizontal: 12, marginRight: 10 }]}>
                      <FontAwesome name='minus' size={wp(5)} color='#FFFFFF' />
                    </Pressable>
                  </View>
                </View>

                {imagesArr &&
                  imagesArr.length > 0 &&
                  imagesArr.map((el, index) => {
                    return (
                      <Pressable
                        key={index}
                        style={styles1.card_main}
                        onPress={() => {
                          handleDocumentPicker(index);
                        }}>
                        {el && el.image ? (
                          <>{`${el.image}`.includes('base64') ? <Image style={{ height: 200 }} resizeMode="contain" source={{ uri: el.image }} /> : <Image style={{ height: 200 }} resizeMode="contain" source={{ uri: generateImageUrl(el.image) }} />}</>
                        ) : (
                          <Text style={{}}>Please Upload Image</Text>
                        )}
                      </Pressable>
                    );
                  })}

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                  <Text style={[styles1.nameheading, { color: '#000', fontSize: wp(4), paddingLeft: wp(5) }]}>Video</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: wp(2) }}>
                    <Pressable onPress={() => handleAddVideo()} style={[styles.btnbg, { paddingVertical: 10, paddingHorizontal: 12, marginRight: 10 }]}>
                      <FontAwesome name='plus' size={wp(5)} color='#FFFFFF' />
                    </Pressable>
                    <Pressable onPress={() => handleRemoveVideo()} style={[styles.btnbg, { paddingVertical: 10, paddingHorizontal: 12, marginRight: 10 }]}>
                      <FontAwesome name='minus' size={wp(5)} color='#FFFFFF' />
                    </Pressable>
                  </View>
                </View>

                {videoArr &&
                  videoArr.length > 0 &&
                  videoArr.map((el, index) => {
                    return (
                      <Pressable
                        key={index}
                        style={styles1.card_main}
                        onPress={() => {
                          handleDocumentPickerVideo(index);
                        }}>
                        {el && el?.videoObj?.name ? (
                          <>
                            <Text>{el?.videoObj?.name}</Text>
                            {/* <Video source={{ uri: el.videoObj }}   // Can be a URL or a local file.
                            ref={(ref) => {
                              this.player = ref
                            }}                                      // Store reference
                            onBuffer={onBuffer}                // Callback when remote video is buffering
                            onError={videoError}               // Callback when video cannot be loaded
                            style={styles.backgroundVideo} /> */}

                            {/* <Image style={{ height: 200 }} resizeMode='contain' source={{ uri: el.image }} /> */}
                          </>
                        ) : (
                          <Text style={{}}>Please Upload Video</Text>
                        )}
                      </Pressable>
                    );
                  })}
              </>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={aniversaryDateModal}
              onRequestClose={() => {
                setAniversaryDateModal(!aniversaryDateModal);
              }}>
              <View style={styles1.centeredView}>
                <View style={styles1.modalView}>
                  <Text style={styles1.modalText}>Select Birthday</Text>
                  {aniversaryDate && <DatePicker date={new Date(aniversaryDate)} mode="date" onDateChange={setAniversaryDate} textColor={'#000000'} />}
                  <Pressable style={[styles1.button, styles1.buttonClose]} onPress={() => setAniversaryDateModal(!aniversaryDateModal)}>
                    <Text style={styles1.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles1.centeredView}>
                <View style={styles1.modalView}>
                  {modalFor == 'Country' ? (
                    <>
                      <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold' }}>Country</Text>
                      <FlatList
                        data={countryArr}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <Pressable
                              onPress={() => {
                                setcountryId({ name: item.name, value: item._id });
                                setModalVisible(false);
                              }}
                              style={[styles1.BorderedPressable, { width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5) }]}>
                              <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                            </Pressable>
                          );
                        }}
                      />
                    </>
                  ) : modalFor == 'State' ? (
                    <>
                      <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold' }}>State</Text>
                      <FlatList
                        data={stateArr}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <Pressable
                              onPress={() => {
                                setstateId({ name: item.name, value: item._id });
                                setModalVisible(false);
                                setSelectedStateName(item.name)                                
                                setcityId(null);
                                setSelectedCityName('')
                              }}
                              style={[styles1.BorderedPressable, { width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5) }]}>
                              <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                            </Pressable>
                          );
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70), fontWeight: 'bold' }}>City</Text>
                      <FlatList
                        data={cityArr}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <Pressable
                              onPress={() => {
                                setcityId({ name: item.name, value: item._id });
                                setModalVisible(false);
                                setSelectedCityName(item.name)
                              }}
                              style={[styles1.BorderedPressable, { width: wp(70), backgroundColor: '#F8E0CD', margin: wp(0.5) }]}>
                              <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                            </Pressable>
                          );
                        }}
                      />
                    </>
                  )}
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, { marginTop: 30, marginBottom: hp(5) }]}>
              <Text style={[styles.textbtn, { fontFamily: 'Manrope-Medium' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </>
  );
}

const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  namehd: {
    color: '#5C3E91',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  labelname: {
    fontSize: wp(3),
    paddingLeft: wp(2),
    color: '#000'
  },
  inputborder: {
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
    marginTop: 0,
    color: '#000',
    // borderWidth: 1,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
  },

  textcenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userinfo: {
    marginVertical: 25,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // imgfluid: {
  //   width: wp(36),
  //   height: wp(36),
  //   borderColor: '#B08218',
  //   borderWidth: 2,
  //   borderStyle: 'solid',
  //   borderRadius: 50,
  // },
  BorderedPressable: {
    borderStyle: 'solid',

    paddingVertical: wp(2.5),
    borderRadius: 50,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',
    color: '#000',

    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    backgroundColor: "#FFFFFF",
    elevation: 10,
    overflow: 'hidden'
  },
  backgroundVideo: {
    height: 100,
    width: 100,
  },
  BorderedPressableText: {
    // backgroundColor: "white",
    // borderColor: "#B08218",
    // borderWidth: 1,
    // paddingVertical: 15,
    // paddingLeft: 15,
    // marginTop: 15,
    // borderRadius: 15,
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
  imgfluid1: {
    width: wp(20),
    height: hp(8),
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
  imgfluid: {
    width: wp(30),
    height: wp(30),
    borderColor: '#FFFFFF',
    borderWidth: 5,
    borderStyle: 'solid',
    borderRadius: 100,
    elevation: 5
  },
  cardContainer: {
    paddingTop: wp(8),

    overflow: 'hidden',
  },
  nameheading: {
    fontSize: wp(3),
    paddingLeft: wp(1),
    color: '#000'
  },
  card_main: {
    borderStyle: 'solid',

    paddingVertical: wp(2),
    borderRadius: 50,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',

    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    backgroundColor: "#FFFFFF",
    height: wp(15),
    elevation: 10,
    overflow: 'hidden',
    fontSize: wp(3.5),
    paddingLeft: wp(4),
    color: '#000'

  },
  dropdown: {
    marginTop: 20,
    borderWidth: 0,

    borderColor: '#B08218',

    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    elevation: 3,
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 12,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    backgroundColor: 'white',
    borderColor: '#B08218',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    // width: wp(23.5)
  },
  buttonTxt: {
    fontSize: 11,
    color: '#000',
  },
  BorderedPressable: {
    backgroundColor: 'white',
    borderColor: '#B08218',
    paddingVertical: 15,
    paddingLeft: 15,
    marginTop: 15,
    borderWidth: 0,
    borderRadius: 25,
    elevation: 3,
  },
  BorderedPressableText: {},

  centeredView: {
    height: hp(100),
    width: wp(100),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    maxHeight: hp(70),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp(90),
  },

  bottomfixed: {
    height: hp(55),
    // backgroundColor:'red',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  wrapper: {
    borderWidth: 0.8,
    borderColor: '#B08218',
    borderStyle: 'solid',
    borderRadius: 16,
  },
  paddingtop20: {
    marginTop: 30,
    paddingBottom: 30,
  },
  heading: {
    fontFamily: 'Manrope-Bold',
    color: '#383737',
    fontSize: 26,
    marginVertical: 10,
  },
  textcont: {
    fontFamily: 'Manrope-Regular',
    color: '#383737',
    fontSize: 15,
  },
  mbboot: {
    fontSize: 13,
    marginTop: 15,
    fontFamily: 'Outfit-Medium',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 3,
    color: '#000',
    paddingHorizontal: wp(3),
  },
  logobox: {
    width: wp(95),
    height: hp(18),
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logosize: {
    width: wp(60),
    height: wp(18),
    // display: 'flex',
    // alignSelf: 'center',
    // marginBottom: 250
    // marginTop: 10,
  },
  mb20: {
    marginBottom: 25,
  },
  btnstartd: {
    backgroundColor: '#B08218',
  },
  imglogcentr: {
    // opacity:0.5,

    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  flexend: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: 2,
  },
  heading1: {
    fontFamily: 'Manrope-ExtraBold',
    color: '#383737',
    fontSize: 35,
  },
  paddingbtm: {
    paddingBottom: 60,
  },
});
