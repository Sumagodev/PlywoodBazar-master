import {View, Text, Image, TextInput, StyleSheet, Pressable, ScrollView, Modal, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../navigation/customheader/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign'
import {getDecodedToken, getUserById, updateUserById} from '../services/User.service';
import {errorToast, toastSuccess} from '../utils/toastutill';
import {ROLES_CONSTANT} from '../utils/constants';
import DocumentPicker, {isInProgress} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {generateImageUrl} from '../services/url.service';
import Video from 'react-native-video';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';

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
  const [countryId, setcountryId] = useState('');
  const [stateId, setstateId] = useState('');
  const [cityId, setcityId] = useState('');
  const [aniversaryDate, setAniversaryDate] = useState(new Date());
  const [bannerImage, setBannerImage] = useState('');
  const [brandNames, setBrandNames] = useState('');
  const [aniversaryDateModal, setAniversaryDateModal] = useState(false);

  const [profileImage, setProfileImage] = useState('');
  const [signature, setsignature] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const [imagesArr, setImagesArr] = useState([{image: '', imageObj: {}}]);
  const [videoArr, setVideoArr] = useState([{video: '', videoObj: {}}]);

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

  const focused = useIsFocused();

  const getUserObj = async () => {
    try {
      const {data: res} = await getUserById();

        console.log("name organation===========", res, "end ==================="  ) 

      if (res) {
        console.log(res.data);
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
        setImagesArr(res?.data?.imagesArr && res?.data?.imagesArr.length > 0 ? res?.data?.imagesArr : [{image: ''}]);
        setVideoArr(res?.data?.videoArr && res?.data?.videoArr.length > 0 ? res?.data?.videoArr : [{video: ''}]);
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
      if (`${address}setwhatsapp` === '') {
        errorToast('Address is Required');
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
        stateId,
        brandNames,
        cityId,
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

      const {data: res} = await updateUserById(userObj?._id, obj);
      if (res) {
        toastSuccess(res.message);
        navigation.goBack();
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleAddImage = () => {
    // alert("asd")
    // let tempArr = imagesArr
    // tempArr.push({ image: "" })
    if (imagesArr && imagesArr.length < 3) {
      setImagesArr([...imagesArr, {image: ''}]);
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
      tempArr.push({video: ''});
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

  const onBuffer = () => {};
  const videoError = () => {};

  return (
    <>
      <Header stackHeader={true} screenName={'Edit Profile'} rootProps={props} />

      <ScrollView style={[styles.padinghr, styles.bgwhite, {paddingTop: 2, paddingBottom: 180}]}>
        {/* <Pressable style={styles1.userinfo}>
          <Image source={require('../../assets/img/userpic.png')} style={styles1.imgfluid} />
        </Pressable> */}
        {/* <View style={styles1.textcenter}>
          <Text style={styles1.namehd}>Edit image</Text>
        </View> */}

        {/* <Text>asd {profileImage}</Text> */}

        {/* <ImageBackground source={{ uri: ((bannerImage && `${bannerImage}`.includes("base64")) ? bannerImage : generateImageUrl(bannerImage)) }} style={{height: hp(20), borderRadius: 10}} resizeMode="stretch">
          <Pressable style={[{
            position: "absolute",
            right: 10,
            top: 10
          }]} onPress={() => handlePickBannerImage()}>
            <AntDesign name="edit" size={17} color="#848993" style={{
              backgroundColor: "white",
              textAlign: 'center',
              borderRadius: 50,
              backgroundColor: '#fff',
              width: 25,
              height: 25,
              lineHeight: 25,
            }} />
          </Pressable>
          <Pressable style={[styles1.userinfo, { borderRadius: 250 }]} onPress={() => handlePickProfileImage()}>
            {

              profileImage && `${profileImage}`.includes("base64") ?
                <Image style={{ height: 150, width: 150, borderRadius: 150 }} resizeMode='cover' source={{ uri: profileImage }} />
                :
                <Image style={{ height: 150, width: 150, borderRadius: 150 }} resizeMode='contain' source={{ uri: generateImageUrl(profileImage) }} />
            }
            <AntDesign name="edit" size={17} color="#848993" style={styles1.abosoluicon} />
          </Pressable>
          <View style={styles1.textcenter}>
          </View>
        </ImageBackground> */}

        <View style={{position: 'relative'}}>
          <Image source={{uri: bannerImage && `${bannerImage}`.includes('base64') ? bannerImage : generateImageUrl(bannerImage)}} style={{height: hp(20), borderRadius: 10}} resizeMode="stretch" />
          <TouchableOpacity style={[{position: 'absolute', right: 10, top: 10}]} onPress={() => handlePickBannerImage()}>
            <AntDesign name="edit" size={17} color="#fff" style={{textAlign: 'center', borderRadius: 50, backgroundColor: '#b76c3c', width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 30}} />
          </TouchableOpacity>

          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: wp(50), position: 'relative', marginTop: -hp(6)}}>
              <TouchableOpacity onPress={() => handlePickProfileImage()} style={{position: 'relative'}}>
                {profileImage && `${profileImage}`.includes('base64') ? (
                  <Image style={{height: 90, width: 90, borderColor: '#b76c3c', borderWidth: 2, borderRadius: 150}} resizeMode="cover" source={{uri: profileImage}} />
                ) : (
                  <Image style={{height: 90, width: 90, borderColor: '#b76c3c', borderWidth: 2, borderRadius: 150}} resizeMode="contain" source={{uri: generateImageUrl(profileImage)}} />
                )}
                <AntDesign name="edit" size={17} color="#fff" style={{position: 'absolute', bottom: 0, right: 0, textAlign: 'center', borderRadius: 50, backgroundColor: '#b76c3c', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 30}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={{color: '#b08229', fontSize: 15, paddingLeft: 7, marginTop: 10, fontFamily: 'Poppins-Medium'}}>Company Details</Text>
        <View style={[styles1.card_main, {marginTop: 5}]}>
          <Image source={require('../../assets/img/usernameicon.png')} style={{width: wp(6), height: hp(3), marginRight: 5}} />
          <View>
            <View style={{width: wp(80)}}>
              <Text style={styles1.labelname}>Name of Organization</Text>
              <TextInput style={styles1.inputborder} onChangeText={e => setcompanyName(e)} value={companyName} />
            </View>
          </View>
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
        <View style={[styles1.card_main, {marginTop: 10}]}>
          <Image source={require('../../assets/img/Unlock.png')} style={{width: wp(6), height: hp(3), marginRight: 5}} />
          <View>
            <View style={{width: wp(80)}}>
              <Text style={styles1.labelname}>Organization Phone</Text>
              <TextInput style={styles1.inputborder}  onChangeText={setphone} value={phone}  />
            </View>
          </View>
        </View>

        
        <View style={[styles1.card_main, {marginTop: 10}]}>
          <Image source={require('../../assets/img/Calendar.png')} style={{width: wp(5), height: hp(2.5), marginRight: 5}} />
          <View>
            <Pressable onPress={() => setAniversaryDateModal(true)}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Birth Date</Text>
                <TextInput style={styles1.inputborder} onChangeText={e => setAniversaryDate(e)} value={moment(aniversaryDate).format('YYYY-MM-DD')} editable={false} placeholder="DD - MM - YYYY" />
              </View>
            </Pressable>
          </View>
        </View>

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


            <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{marginRight: 5}}>
                <FontAwesome name="address-book-o" color="#000" size={16} />
              </View>

              <View>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}> Address</Text>
                  <TextInput style={styles1.inputborder} value={address} onChangeText={setaddress} placeholder="Address" />
                </View>
              </View>
            </View>
            <View style={[styles1.card_main, {marginTop: 10}]}>
              {/* <Image source={require('../../assets/img/Calendar.png')} style={{ width: wp(5), height: hp(2.5), marginRight: 5 }} /> */}
              <View style={{marginRight: 5}}>
                <Feather name="phone-call" color="#000" size={16} />
              </View>
              <View>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}>Landline</Text>
                  <TextInput style={styles1.inputborder} value={companyPhone} onChangeText={setcompanyPhone} placeholder="Company Phone" />
                </View>
              </View>
            </View>

            <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{marginRight: 5}}>
                <FontAwesome5 name="handshake" color="#000" size={16} />
              </View>
              <View>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}>Brand Names:</Text>
                  <TextInput style={styles1.inputborder} value={brandNames} onChangeText={setBrandNames} placeholder="Nature Of Business" />
                </View>
              </View>
            </View>
            <View style={[styles1.card_main, {marginTop: 10, backgroundColor:'#e9ecef'} ]}>
              <View style={{marginRight: 5}}>
                <FontAwesome name="user-o" color="#000" size={18} />
              </View>
              <View>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}>Role</Text>
                  <TextInput style={styles1.inputborder} value={natureOfBusiness} onChangeText={setNatureOfBusiness} placeholder="Nature Of Business" editable={false} />
                </View>
              </View>
            </View>

            <View style={[styles1.card_main, {marginTop: 10}]}>
              {/* <Image source={require('../../assets/img/Calendar.png')} style={{ width: wp(5), height: hp(2.5), marginRight: 5 }} /> */}

              <View style={{marginRight: 5}}>
                <FontAwesome name="map-marker" color="#000" size={16} />
              </View>

              <View>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}>Google Maps Link</Text>
                  <TextInput style={styles1.inputborder} value={googleMapsLink} onChangeText={setGoogleMapsLink} placeholder="Google Maps `Link" />
                </View>
              </View>
            </View>
            <View style={[styles1.card_main, {marginTop: 10,}]}>
                <View style={{width: wp(80)}}>
                  <Text style={styles1.labelname}>GST Number</Text>
                  <TextInput style={styles1.inputborder} value={gstNumber} placeholder="GST Number"  />
              </View>
            </View>

            <Text style={{color: '#b08229', fontSize: 15, paddingLeft: 7, marginTop: 10, fontFamily: 'Poppins-Medium'}}>Personal Details</Text>

            <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Name of Authorised person</Text>
                <TextInput style={styles1.inputborder} onChangeText={e => setName(e)} value={name} />
              </View>
            </View>
      <View style={[styles1.card_main, { marginTop: 10 }]}>
          {/* <Image source={require('../../assets/img/Message.png')} style={{ width: wp(4), height: hp(1.9), marginRight: 5 }} /> */}
          <View>
            <View style={{ width: wp(80) }}>
              <Text style={styles1.labelname}>Email</Text>
              <TextInput style={styles1.inputborder}  onChangeText={setemail} value={email} />
            </View>
          </View>
        </View>

            <View style={[styles1.card_main, {marginTop: 10, backgroundColor:'#e9ecef'}]}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Mobile No.</Text>
                <TextInput style={styles1.inputborder} onChangeText={e => setphone(e)} value={phone} editable={false} />
              </View>
            </View>

            <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Whatsapp No.</Text>
                <TextInput style={styles1.inputborder} onChangeText={e => setwhatsapp(e)} value={whatsapp} />
              </View>
            </View>

         

            {/* <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Role</Text>
                <TextInput style={styles1.inputborder} value={natureOfBusiness} onChangeText={setNatureOfBusiness} placeholder="Role" />
              </View>
            </View> */}

            <View style={[styles1.card_main, {marginTop: 10}]}>
              <View style={{width: wp(80)}}>
                <Text style={styles1.labelname}>Year of Establishment</Text>
                <TextInput style={styles1.inputborder} value={yearOfEstablishment} onChangeText={setYearOfEstablishment} placeholder="Year of Establishment" />
              </View>
            </View>
          

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>Images</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable onPress={() => handleAddImage()} style={[styles.btnbg, {paddingVertical: 7, paddingHorizontal: 15, marginRight: 10}]}>
                  <Text style={{color: 'white', fontSize: 18}}>+</Text>
                </Pressable>
                <Pressable onPress={() => handleRemoveImage()} style={[styles.btnbg, {paddingVertical: 7, paddingHorizontal: 17, marginRight: 10}]}>
                  <Text style={{color: 'white', fontSize: 18}}>-</Text>
                </Pressable>
              </View>
            </View>

            {imagesArr &&
              imagesArr.length > 0 &&
              imagesArr.map((el, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles1.BorderedPressable}
                    onPress={() => {
                      handleDocumentPicker(index);
                    }}>
                    {el && el.image ? (
                      <>{`${el.image}`.includes('base64') ? <Image style={{height: 200}} resizeMode="contain" source={{uri: el.image}} /> : <Image style={{height: 200}} resizeMode="contain" source={{uri: generateImageUrl(el.image)}} />}</>
                    ) : (
                      <Text style={styles.borderedPressableText}>Please Upload Image</Text>
                    )}
                  </Pressable>
                );
              })}

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
              <Text style={{color: 'black', fontSize: 17, marginLeft: 5}}>Video</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable onPress={() => handleAddVideo()} style={[styles.btnbg, {paddingVertical: 7, paddingHorizontal: 15, marginRight: 10}]}>
                  <Text style={{color: 'white', fontSize: 18}}>+</Text>
                </Pressable>
                <Pressable onPress={() => handleRemoveVideo()} style={[styles.btnbg, {paddingVertical: 7, paddingHorizontal: 17, marginRight: 10}]}>
                  <Text style={{color: 'white', fontSize: 18}}>-</Text>
                </Pressable>
              </View>
            </View>

            {videoArr &&
              videoArr.length > 0 &&
              videoArr.map((el, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles1.BorderedPressable}
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
                      <Text style={styles.borderedPressableText}>Please Upload Video</Text>
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

        <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, {marginTop: 30, marginBottom: hp(5)}]}>
          <Text style={[styles.textbtn, {fontFamily: 'Manrope-Medium'}]}>Save</Text>
        </TouchableOpacity>
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
    fontSize: 12,
    color: '#9299A0',
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
    // justifyContent: 'space-between',
    flexDirection: 'row',
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
  imgfluid: {
    width: wp(24),
    height: hp(12),
    borderColor: '#B08218',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 50,
  },
  BorderedPressable: {
    backgroundColor: 'white',
    borderColor: '#B08218',
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    marginTop: 15,
    borderRadius: 15,
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
});
