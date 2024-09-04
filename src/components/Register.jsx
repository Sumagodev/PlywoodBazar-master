import { DarkTheme, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,TextInput, ImageBackground } from 'react-native';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { Checkbox } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import styles from '../../assets/stylecomponents/Style';
import { registerUser, setToken } from '../services/User.service';
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../services/location.service';
import { ROLES_CONSTANT } from '../utils/constants';
import { errorToast, toastSuccess } from '../utils/toastutill';
import { getAllCategories } from '../services/Category.service';
import { Appearance } from 'react-native';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import CustomRoundedTextButton from '../ReusableComponents/CustomRoundedTextButton';
import DatePicker from 'react-native-date-picker' 
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo'
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import CustomColors from '../styles/CustomColors';

export default function Register() {
  const [value, setValue] = useState(null);

  const focused = useIsFocused()
  const navigation = useNavigation();
  const [aniversaryDate, setAniversaryDate] = useState(new Date());

  const [aniversaryDateModal, setAniversaryDateModal] = useState(false);


  const [categoryModal, setCategoryModal] = useState(false);
  const [categorydata, setcategorydata] = useState([]); // for dropdown 
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [categoryArr, setcategoryArr] = useState([])
  const [category, setcategory] = useState("")
  const [productName, setProductName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState('Country');
  const [rolesArr, setRolesArr] = useState([
    {
      name: ROLES_CONSTANT.MANUFACTURER,
      checked: true,
    },
    {
      name: ROLES_CONSTANT.DISTRIBUTOR,
      checked: false,
    },
    {
      name: ROLES_CONSTANT.DEALER,
      checked: false,
    },
  ]);





  const handleSetRole = selectedbusitype => {
    let tempRoleArr = rolesArr.map(el => {
      if (el.name === selectedbusitype) {
        el.checked = true;
        
        setRole(el.name);
        settype(el.name);

      } else {
        el.checked = false;
      }
      return el;
    });

    setRolesArr([...tempRoleArr]);
  };

  const [role, setRole] = useState(ROLES_CONSTANT.MANUFACTURER);

  const [gstCertificateName, setGstCertificateName] = useState('');
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [type, settype] = useState(ROLES_CONSTANT.MANUFACTURER);
  const [companyName, setcompanyName] = useState('');
  const [companyEmail, setcompanyEmail] = useState('');
  const [companyPhone, setcompanyPhone] = useState('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState();

  const [gstNumber, setgstNumber] = useState('');
  const [address, setaddress] = useState('');
  const [dob, setdob] = useState('');
  const [noofepmployee, setnoofepmployee] = useState('');
  const [gstCertificate, setgstCertificate] = useState(null);
  const [countryArr, setcountryArr] = useState([]);
  const [stateArr, setstateArr] = useState([]);
  const [cityArr, setcityArr] = useState([]);
  const [countryId, setcountryId] = useState(null);
  const [stateId, setstateId] = useState(null);
  const [cityId, setcityId] = useState(null);
  const [brandNames, setBrandNames] = useState("")
  const [natureOfBusiness, setNatureOfBusiness] = useState();
  const [annualTurnover, setAnnualTurnover] = useState();
  const [legalStatus, setLegalStatus] = useState();
  const [companyCeo, setCompanyCeo] = useState();
  const [googleMapsLink, setGoogleMapsLink] = useState();

  const [isAuthorized, setIsAuthorized] = useContext(isAuthorisedContext);
  
  const handleSubmit = async () => {
    console.log( "chek btn")
    // if (`${name}` === '') {
    //   errorToast('Name is Required');
    //   return;
    // }

    let selectedCategories = [];
   
    if (`${type}` !== 'USER') {
      if (`${companyName}` === "") {
        errorToast("Company Name is Required");
        return 0;
      }
      // if (`${companyPhone}` === "") {
      //   errorToast("Company Phone is Required");
      //   return 0
      // }
      // if (`${gstNumber}` === "") {
      //   errorToast("Gst is Required");
      //   return 0;
      // };
      if (!yearOfEstablishment || `${yearOfEstablishment}` === "") {
        errorToast("Year of Establishment is Required");
        return 0;
      };

      if (`${email}` === '') {
        errorToast('Email is Required');
        return 0;
      }
      if (`${mobile}` === '') {
        errorToast('Mobile is Required');
        return 0;
      }
      if (`${name}` === '') {
        errorToast('Name is Required');
        return 0;
      }


      // console.log(countryId,"countryIdcountryIdcountryIdcountryId",stateId,cityId)


      if (!countryId || !countryId?.value) {
        errorToast("Country is Required");
        return 0;
      };
      if (!stateId || !stateId?.value) {
        errorToast("State is Required");
        return 0;
      };
      if (!cityId || !cityId?.value) {
        errorToast("City is Required");
        return 0;
      };



      console.log(categoryArr,"categoryArr")
      console.log("categoryArrObj", categoryArr[0],"categoryObj")

      // let checked =categoryArr.filter(el => el.checked)

      let tempArr = categoryArr?.map((el) => {
        if(selected.includes(el?._id)){
          el = {...el, checked: true}
        }
        return el
      })



      console.log("tempArr=======", tempArr, "===== tempArr")
      // console.log("tempArr", tempArr[], "tempArr")
       selectedCategories =tempArr.filter(el => el.checked).map(el => ({ categoryId: el._id }));

      // console.log("temcattemcattemcat", temcat,"temcattemcattemcat")
      if (!selectedCategories || selectedCategories?.length == 0) {
        errorToast("Category is Required");
        return 0;
      };
     
      if (`${address}` === "") {
        errorToast("Address is Required");
        return 0;
      };

      if (`${companyCeo}` === "") {
        errorToast("Company Ceo Name is Required");
        return 0;
      };
      // if (`${googleMapsLink}` === "") {
      //   errorToast("Google Maps Link Name is Required");
      //   return 0;
      // };
      
      
    }
   
    if (!termsAccepted) {
      errorToast("Please Accept our terms and condition and privacy policy before registering !!!");
      return
    }

    let obj = {
      name,
      email,
      phone: mobile,
      address,
      whatsapp,
      dob,
      brandNames,
      role: type,
      gstNumber,
      countryId: countryId?.value,
      stateId: stateId?.value,
      cityId: cityId?.value,
      aniversaryDate,
      categoryArr: selectedCategories,
      companyObj: {
        name: companyName,
        email: companyEmail,
        phone: companyPhone,
        address,
        gstNumber,
        noofepmployee,
        natureOfBusiness,
        annualTurnover,
        yearOfEstablishment,
        legalStatus,
        companyCeo,
        googleMapsLink,
      },
      gstCertificate,
    };

    console.log(JSON.stringify(obj, null, 2), ">>>>>>>>>>>>>>>>>>>>>>>>>>>")

    try {
      let { data: res } = await registerUser(obj);
      console.log(JSON.stringify(res,null,2), "register data ")

      if (res) {
        // console.log(JSON.stringify(res.data,null,2), "register data ")
        toastSuccess(res.message);
        await setToken(res.token);
        setIsAuthorized(true);
        
        navigation.navigate('Subscriptions',{register:true});
      }
    } catch (error) {
      console.log(error)
      console.error(error);
      errorToast(error);
    }
  };

  const handleGetCoutries = async () => {
    try {
      let { data: res } = await getCountriesApi();
      if (res.data) {
        setcountryArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStates = async countrysId => {
    try {
      let { data: res } = await getStateByCountryApi(`countryId=${countrysId}`);
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
    if (focused) {
      handleGetCoutries();
      handleNestedCategory();
    }
  }, [focused]);
  useEffect(() => {
    if (countryId) {
      handleGetStates(countryId.value);
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      handleGetCities(stateId.value);
    }
  }, [stateId]);

  const handleDocumentPicker = async () => {
    try {
      let file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: DocumentPicker.types.images,
      });
      if (file) {
        console.log(file, 'file');
        let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
        if (base64) {
          console.log('SETTING BASE ^$', file);
          setGstCertificateName(file);
          setgstCertificate(`data:${file.type};base64,${base64}`);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleNestedCategory = async () => {
    try {
      const { data: res } = await getAllCategories()
      if (res.success && res.data.length) {
        setcategoryArr(res.data.map(el => ({ ...el, checked: false })))
        setcategorydata(res.data.map(el => ({ label:el.name,value:el._id })))
      }

    } catch (error) {
      console.error(error)
      toastError(error)
    }
  }
  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');

      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered');
    } else {
      throw err;
    }
    errorToast(err);
  };


  const handleCheckCategory = (id) => {
    let tempCategoryObjIndex = categoryArr.findIndex(el => el._id == id);


    let tempCategoryArr = categoryArr;


    if (tempCategoryObjIndex != -1) {
      tempCategoryArr[tempCategoryObjIndex].checked = !tempCategoryArr[tempCategoryObjIndex].checked
    }


    setcategoryArr([...tempCategoryArr])

  }





  // const data = [
  //   { label: 'Item 1', value: '1' },
  //   { label: 'Item 2', value: '2' },
  //   { label: 'Item 3', value: '3' },
  //   { label: 'Item 4', value: '4' },
  //   { label: 'Item 5', value: '5' },
  //   { label: 'Item 6', value: '6' },
  //   { label: 'Item 7', value: '7' },
  //   { label: 'Item 8', value: '8' },
  // ];
  const [selected, setSelected] = useState([]);
  const [selectedbusitype, setSelectedbusitype] = useState();
  console.log('renderdataaaaaa',selectedbusitype);
  
  const renderItem = item => {
    return (
      <View style={styles1.item}>
        <Text style={styles1.selectedTextStyle}>{item.label}</Text>
        {/* <AntDesign style={styles1.icon} color="black" name="Safety" size={20} /> */}
      </View>
    );
  };
  const renderItem1 = item => {
    return (
      <View style={styles1.item}>
        <Text style={styles1.selectedTextStyle}>{item.name}</Text>
        {/* <AntDesign style={styles1.icon} color="black" name="Safety" size={20} /> */}
      </View>
    );
  };





  const renderCategory = ({ item, index }) => {
    return (
      <>
        <Pressable style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => handleCheckCategory(item._id)}>
          <Checkbox.Android
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleCheckCategory(item._id)
            }}
            color="#B08218"
            borderColor="red"
          />
          <Text>{item.name}</Text>
        </Pressable>
      </>
    )
  }


  return (
    <View style={{ backgroundColor: 'white'}}>
      <View style={{alignSelf:'center'}}>
        <Image source={require('../../assets/img/logo.png')} style={styles1.logosize} resizeMode="contain" />
      </View>

      
   
      <ScrollView contentContainerStyle={[styles.bgwhite]}>
            <ImageBackground 
      source={require('../../assets/img/main_bg.jpg')}
      style={{borderRadius:30,flex:1, borderTopLeftRadius: 30, borderTopRightRadius: 30,overflow:'hidden'}}
      >
        <View style={{paddingHorizontal: wp(2.5), borderTopLeftRadius: 30, borderTopRightRadius: 30,paddingBottom:wp(20) }}>
        <View style={[{flex:1, alignSelf: 'center', alignItems:'center' }]}>
          <View>
            <Text style={styles1.heading}>Organisation Details</Text>
          </View>
        </View>
<Dropdown
  style={styles1.dropdown}
  placeholderStyle={styles1.placeholderStyle}
  selectedTextStyle={styles1.selectedTextStyle}
  inputSearchStyle={styles1.inputSearchStyle}
  data={rolesArr}
  maxHeight={300}
  labelField="name"
  valueField="name"  // Ensure this matches your data structure
  placeholder="Business Type *"
  search
  searchPlaceholder="Search..."
  value={selectedbusitype} // Make sure this is the correct format (string or object)
  onChange={item => {
    console.log(item,'uuuuu');
    
    setSelectedbusitype(item.name); // Use `item.value` to match the `valueField`
  }}
/>





          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setcompanyName(e)}
            value={companyName}
           placeholder='Business Name*'
        placeholderTextColor="#000" 
        selectionColor={CustomColors.mattBrownDark}
          />

 <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setYearOfEstablishment(e)}
            value={yearOfEstablishment}
    selectionColor={CustomColors.mattBrownDark}
                           placeholder='Year of Establishment *'
        placeholderTextColor="#000" 
          />
          
                <MultiSelect
          style={styles1.dropdown}
          placeholderStyle={styles1.placeholderStyle}
          selectedTextStyle={styles1.selectedTextStyle}
          inputSearchStyle={styles1.inputSearchStyle}
          // iconStyle={styles1.iconStyle}
          data={categorydata}
          labelField="label"
          valueField="value"
          placeholder="Category *"
          value={selected}
          search
          searchPlaceholder="Search..."
          
          onChange={item => {
            console.log(item, " CAT ITEM");
            // console.log(item.map((el) => ({...el, checked})))
            setSelected(item);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color="black"
          //     name="Safety"
          //     size={20}
          //   />
          // )}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles1.selectedStyle}>
                <Text style={styles1.textSelectedStyle}>{item.label}</Text>
                <AntDesign color="black" name="delete" size={12} />
              </View>
            </TouchableOpacity>
          )}
        />
             {/* <TextInput
            style={styles1.mbboot}
            mode="outlined"
         
            label="Name Of the Organization *"
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          /> */}





          {/* <TextInput
            style={styles1.mbboot}
            mode="outlined"
            keyboardType="numeric"
            onChangeText={e => setcompanyPhone(e)}
            value={companyPhone}
            maxLength={10}
            label="Organization Phone / Landline"
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          />*/}

          {/* <TextInput
            style={styles1.mbboot}
            mode="outlined"
            keyboardType="email-address"
            onChangeText={e => setcompanyEmail(e)}
            value={companyEmail}
            label="Organization Email"
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          /> */}


         


{/* <Text style={{ marginBottom: 15, }}></Text> */}



    





          {/* <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setNatureOfBusiness(e)}
            value={natureOfBusiness}
            label="Nature of Business"
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          /> */}


         
          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setBrandNames(e)}
            value={brandNames}
 placeholder='Dealing With Brand Names*'
        placeholderTextColor="#000" 
        selectionColor={CustomColors.mattBrownDark}
          />

          <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setgstNumber(e)}
            value={gstNumber}
          placeholder='GST NO.*'
        placeholderTextColor="#000" 
        selectionColor={CustomColors.mattBrownDark}
          />


<TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setaddress(e)}
                value={address}
              selectionColor={CustomColors.mattBrownDark}
                         placeholder='Address *'
        placeholderTextColor="#000" 
              />

       <Pressable
                style={styles1.BorderedPressable}
                onPress={() => {
                  setModalVisible(true);
                  setModalFor('Country');
                }}>
                <Text style={styles.borderedPressableText}>{countryId && countryId.value ? countryId.name : 'Country *'}</Text>
              </Pressable>
              <Pressable
                style={styles1.BorderedPressable}
                onPress={() => {
                  setModalVisible(true);
                  setModalFor('State');
                }}>
                <Text style={styles.borderedPressableText}>{stateId && stateId.name ? stateId.name : ' State *'}</Text>
              </Pressable>
              <Pressable
                style={styles1.BorderedPressable}
                onPress={() => {
                  setModalVisible(true);
                  setModalFor('City');
                }}>
                <Text style={styles.borderedPressableText}>{cityId && cityId.value ? cityId.name : 'City *'}</Text>
              </Pressable>





          {/* <TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setdob(e)}
            value={dob}
            label="Birthday"
            outlineStyle={{
              borderWidth: 0.8,
              borderRadius: 16,
              borderColor: '#B08218',
              marginBottom: 15,
              height: 50,
            }}
            theme={{
              colors: {
                text: '#f5f5f5',
                accent: '#ffffff',
                primary: '#666666',
                placeholder: '#f5f5f5',
                background: '#fff',
                borderWidth: '1',
                fontSize: 8,
              },
            }}
            underlineColor="#E7E7E8"
            underlineColorAndroid="#E7E7E8"
          /> */}

        <Text style={{ fontSize: 17,  marginTop:15, fontWeight: "600", textAlign:'center' }}>Contact Person Details</Text>
          {role !== ROLES_CONSTANT.USER && (
            <>
              {/* <Text style={{ marginTop: hp(4), color: "black", fontSize: 18, paddingLeft: 5 }}>Company Details</Text> */}
              <TextInput
                style={styles1.mbboot}
           placeholderTextColor={'#000'}
                onChangeText={e => setname(e)}
                value={name}
               placeholder='Name'
      selectionColor={CustomColors.mattBrownDark}
              />

<TextInput
            style={styles1.mbboot}
            mode="outlined"
            onChangeText={e => setemail(e)}
            value={email}
             label="Email Id *"
            keyboardType="email-address"
                         placeholder='Email Id *'
        placeholderTextColor="#000" 
        selectionColor={CustomColors.mattBrownDark}
          />
              {/* <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setcompanyEmail(e)}
                value={companyEmail}
                label="Company Email"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#f5f5f5',
                    accent: '#ffffff',
                    primary: '#666666',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                    fontSize: 8,
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              /> */}
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                maxLength={10}
                onChangeText={e => setmobile(e)}
                value={mobile}
                keyboardType="number-pad"
               selectionColor={CustomColors.mattBrownDark}
                             placeholder='Mobile No. *'
        placeholderTextColor="#000" 
              />
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setwhatsapp(e)}
                value={whatsapp}
                maxLength={10}
                keyboardType="numeric"
   selectionColor={CustomColors.mattBrownDark}
                             placeholder='Whatsapp No.'
        placeholderTextColor="#000" 
              />

              {/* <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setnoofepmployee(e)}
                value={noofepmployee}
                label="Number of employees"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#f5f5f5',
                    accent: '#ffffff',
                    primary: '#666666',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                    fontSize: 8,
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              /> */}
            
              {/* //////new Fields */}


              {/* <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setAnnualTurnover(e)}
                value={annualTurnover}
                label="Annual Turnover"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#f5f5f5',
                    accent: '#ffffff',
                    primary: '#666666',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                    fontSize: 8,
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              /> */}


              <Pressable onPress={() => setAniversaryDateModal(true)}>

                <TextInput
                  style={styles1.mbboot}
                  mode="outlined"
                  editable={false}
                  onChangeText={e => setAniversaryDate(e)}
                  value={moment(aniversaryDate).format("YYYY-MM-DD")}
                  label="Birthday"
                  outlineStyle={{
                    borderWidth: 0,
                    borderRadius: 25,
                    borderColor: '#B08218',
           elevation:3
                  }}
                  theme={{
                    colors: {
                      text: '#f5f5f5',
                      accent: '#ffffff',
                      primary: '#666666',
                      placeholder: '#f5f5f5',
                    
                      borderWidth: 0,
                      fontSize: 8,
                    },
                  }}
             
                />
              </Pressable>

              {/* <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setLegalStatus(e)}
                value={legalStatus}
                label="Legal Status"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#f5f5f5',
                    accent: '#ffffff',
                    primary: '#666666',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                    fontSize: 8,
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              /> */}

              {/* <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setCompanyCeo(e)}
                value={companyCeo}
                label="Company Ceo"
                outlineStyle={{
                  borderWidth: 0.8,
                  borderRadius: 16,
                  borderColor: '#B08218',
                  marginBottom: 15,
                  height: 50,
                }}
                theme={{
                  colors: {
                    text: '#f5f5f5',
                    accent: '#ffffff',
                    primary: '#666666',
                    placeholder: '#f5f5f5',
                    background: '#fff',
                    borderWidth: '1',
                    fontSize: 8,
                  },
                }}
                underlineColor="#E7E7E8"
                underlineColorAndroid="#E7E7E8"
              /> */}
              <TextInput
                style={styles1.mbboot}
                mode="outlined"
                onChangeText={e => setGoogleMapsLink(e)}
                value={googleMapsLink}
            
                            placeholder='Google Maps Link'
        placeholderTextColor="#000" 
        selectionColor={CustomColors.mattBrownDark}
              />
              {/* //////new Fields */}

       




              {/* <Pressable
                style={styles1.BorderedPressable}
                onPress={() => {
                  handleDocumentPicker();
                }}>
                <Text style={styles.borderedPressableText}>{gstCertificate && gstCertificate.name ? gstCertificate?.name : 'Please Upload GST Certificate'}</Text>
              </Pressable> */}
            </>
          )}


         


          
          



          {/* <FlatList
            data={categoryArr}
            scrollEnabled={false}
            nestedScrollEnabled={false}
            renderItem={renderCategory}
            keyExtractor={(item, index) => `${index}`}
          /> */}
{/* 
      <Dropdown
        style={styles1.dropdown}
        placeholderStyle={styles1.placeholderStyle}
        selectedTextStyle={styles1.selectedTextStyle}
        inputSearchStyle={styles1.inputSearchStyle}
        data={categorydata}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Categories"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        
      />

<View style={styles1.dropdown}>
  <Text> Select Category</Text>
  <Entypo name='chevron-small-down' color='#000' size={16} />
</View> */}

{/* <View style={styles1.container}> */}
      
      {/* </View> */}




         


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
                    <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70),fontWeight:'bold' }}>Country</Text>
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
                            style={[styles1.BorderedPressable, { width: wp(70),backgroundColor:'#F8E0CD' ,margin:wp(0.5)}]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                ) : modalFor == 'State' ? (
                  <>
                    <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70),fontWeight:'bold' }}>State</Text>
                    <FlatList
                      data={stateArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setstateId({ name: item.name, value: item._id });
                              setModalVisible(false);
                              setcityId(null );
                            }}
                            style={[styles1.BorderedPressable, { width: wp(70) ,backgroundColor:'#F8E0CD' , margin:wp(0.5)}]}>
                            <Text style={styles1.BorderedPressableText}>{item.name}</Text>
                          </Pressable>
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Text style={{ fontSize: 25, marginBottom: 20, width: wp(70),fontWeight:'bold' }}>City</Text>
                    <FlatList
                      data={cityArr}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable
                            onPress={() => {
                              setcityId({ name: item.name, value: item._id });
                              setModalVisible(false);
                            }}
                            style={[styles1.BorderedPressable, { width: wp(70),backgroundColor:'#F8E0CD' , margin:wp(0.5)}]}>
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

          <View style={[{ marginVertical: 20 ,alignItems: "center",}]}>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 10 ,justifyContent:'center'}}>
              <Checkbox.Android
                status={termsAccepted ? 'checked' : 'unchecked'}
                onPress={() => {
                  setTermsAccepted(!termsAccepted)
                }}
                color="#B08218"
                borderColor="red"
              />

              <Text> Please Accept our </Text>
              <Pressable
               onPress={() => navigation.navigate("TermsAndConditions")}>
                <Text style={{color:'red', fontFamily:'Poppins-Medium',fontSize:wp(4), marginTop:5}}> terms and condition {" "}</Text>
              </Pressable>
              <Text>
                and{" "}
              </Text>
              <Pressable
                style={{ marginBottom: 5 }}
                onPress={() => navigation.navigate("Privacy")}>
                <Text style={{color:'red', fontFamily:'Poppins-Medium', marginTop:5}}>{" "}privacy policy</Text>
              </Pressable>
              <Text style={{ marginBottom: 5 ,marginLeft:15}}>
                before registering
              </Text>
            </View>
  
            <View style={{ alignSelf: "center"}}><CustomButtonNew text={"Submit"} paddingHorizontal={wp(8)} buttonColor={'#573C26'} onPress={() => handleSubmit()} /></View>
   
             <Pressable onPress={() => navigation.navigate('Mobilenumber')} style={[{ alignItems: 'center', justifyContent: 'center', width: wp(93), marginTop: 10 ,flexDirection:'row'}]}>
              <Text style={styles1.btnTxt}>Already a user ?</Text>
              <Text style={[styles1.btnTxt, { color: '#C28C28', marginLeft: 10, fontSize: 15 , fontFamily:'Poppins-Medium',}]}>Login</Text>
            </Pressable>

            <TouchableOpacity onPress={() => navigation.navigate('LegalAbouts')} style={{alignSelf:'center'}}>
              <Text  style={[styles1.btnTxt, { color: '#C28C28', marginLeft: 10, fontSize: 15 , fontFamily:'Poppins-Medium',}]}>Legal & About</Text>
            </TouchableOpacity>
       
           
          </View>
        </View>


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
              <DatePicker
              
              dividerColor={'red'}
              date={aniversaryDate} mode="date" onDateChange={setAniversaryDate} textColor={'#000000'} />
              <Pressable
                style={[styles1.button, styles1.buttonClose]}
                onPress={() => setAniversaryDateModal(!aniversaryDateModal)}>
                <Text style={styles1.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>




        <Modal
          animationType="slide"
          transparent={true}
          visible={categoryModal}
          onRequestClose={() => {
            setCategoryModal(!categoryModal);
          }}>0
          <View style={styles1.centeredView}>
            <View style={styles1.modalView}>
              <Text style={styles1.modalText}>Category</Text>
              <DatePicker date={aniversaryDate} mode="date" onDateChange={setAniversaryDate} />
              <Pressable
                style={[styles1.button, styles1.buttonClose]}
              // onPress={() => setCategoryModal(!categoryModal)}
              >
                <Text style={styles1.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
</ImageBackground>
      </ScrollView >
         
    </View>
  );
}
const styles1 = StyleSheet.create({

  // container: { padding: 16 },
  dropdown: {
    marginTop:20,
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
    color:'#000',
     fontWeight:'bold'
  },
  selectedTextStyle: {
    fontSize: 14,
 fontWeight:'bold'

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
    backgroundColor: "rgba(0,0,0,0.8)"
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
    color:'#000'
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
  BorderedPressableText: {

  },

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
fontWeight:'bold',
backgroundColor:'#FFFFFF',
borderRadius:25,
elevation:3,
color:'#000',
paddingHorizontal:wp(3)


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
// import { DarkTheme, useIsFocused, useNavigation } from '@react-navigation/native';
// import React, { useContext, useEffect, useState } from 'react';
// import { FlatList, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import DocumentPicker, { isInProgress } from 'react-native-document-picker';
// import { Checkbox, TextInput } from 'react-native-paper';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import RNFetchBlob from 'rn-fetch-blob';
// import styles from '../../assets/stylecomponents/Style';
// import { registerUser, setToken } from '../services/User.service';
// import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../services/location.service';
// import { ROLES_CONSTANT } from '../utils/constants';
// import { errorToast, toastSuccess } from '../utils/toastutill';
// import { getAllCategories } from '../services/Category.service';
// import { Appearance } from 'react-native';
// import { isAuthorisedContext } from '../navigation/Stack/Root';

// import DatePicker from 'react-native-date-picker' 
// import moment from 'moment';
// import { Dropdown } from 'react-native-element-dropdown';
// import Entypo from 'react-native-vector-icons/Entypo'
// import { MultiSelect } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// export default function Register() {
//   const [value, setValue] = useState(null);

//   const focused = useIsFocused()
//   const navigation = useNavigation();
//   const [aniversaryDate, setAniversaryDate] = useState(new Date());

//   const [aniversaryDateModal, setAniversaryDateModal] = useState(false);


//   const [categoryModal, setCategoryModal] = useState(false);
//   const [categorydata, setcategorydata] = useState([]); // for dropdown 
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [categoryArr, setcategoryArr] = useState([])
//   const [category, setcategory] = useState("")
//   const [productName, setProductName] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalFor, setModalFor] = useState('Country');
//   const [rolesArr, setRolesArr] = useState([
//     {
//       name: ROLES_CONSTANT.MANUFACTURER,
//       checked: true,
//     },
//     {
//       name: ROLES_CONSTANT.DISTRIBUTOR,
//       checked: false,
//     },
//     {
//       name: ROLES_CONSTANT.DEALER,
//       checked: false,
//     },
//   ]);




//   const handleSetRole = name => {
//     let tempRoleArr = rolesArr.map(el => {
//       if (el.name === name) {
//         el.checked = true;
        
//         setRole(el.name);
//         settype(el.name);

//       } else {
//         el.checked = false;
//       }
//       return el;
//     });

//     setRolesArr([...tempRoleArr]);
//   };

//   const [role, setRole] = useState(ROLES_CONSTANT.MANUFACTURER);

//   const [gstCertificateName, setGstCertificateName] = useState('');
//   const [name, setname] = useState('');
//   const [mobile, setmobile] = useState('');
//   const [email, setemail] = useState('');
//   const [whatsapp, setwhatsapp] = useState('');
//   const [type, settype] = useState(ROLES_CONSTANT.MANUFACTURER);
//   const [companyName, setcompanyName] = useState('');
//   const [companyEmail, setcompanyEmail] = useState('');
//   const [companyPhone, setcompanyPhone] = useState('');
//   const [yearOfEstablishment, setYearOfEstablishment] = useState();

//   const [gstNumber, setgstNumber] = useState('');
//   const [address, setaddress] = useState('');
//   const [dob, setdob] = useState('');
//   const [noofepmployee, setnoofepmployee] = useState('');
//   const [gstCertificate, setgstCertificate] = useState(null);
//   const [countryArr, setcountryArr] = useState([]);
//   const [stateArr, setstateArr] = useState([]);
//   const [cityArr, setcityArr] = useState([]);
//   const [countryId, setcountryId] = useState(null);
//   const [stateId, setstateId] = useState(null);
//   const [cityId, setcityId] = useState(null);
//   const [brandNames, setBrandNames] = useState("")
//   const [natureOfBusiness, setNatureOfBusiness] = useState();
//   const [annualTurnover, setAnnualTurnover] = useState();
//   const [legalStatus, setLegalStatus] = useState();
//   const [companyCeo, setCompanyCeo] = useState();
//   const [googleMapsLink, setGoogleMapsLink] = useState();

//   const [isAuthorized, setIsAuthorized] = useContext(isAuthorisedContext);
  
//   const handleSubmit = async () => {
//     console.log( "chek btn")
//     // if (`${name}` === '') {
//     //   errorToast('Name is Required');
//     //   return;
//     // }

//     let selectedCategories = [];
   
//     if (`${type}` !== 'USER') {
//       if (`${companyName}` === "") {
//         errorToast("Company Name is Required");
//         return 0;
//       }
//       // if (`${companyPhone}` === "") {
//       //   errorToast("Company Phone is Required");
//       //   return 0
//       // }
//       // if (`${gstNumber}` === "") {
//       //   errorToast("Gst is Required");
//       //   return 0;
//       // };
//       if (!yearOfEstablishment || `${yearOfEstablishment}` === "") {
//         errorToast("Year of Establishment is Required");
//         return 0;
//       };

//       if (`${email}` === '') {
//         errorToast('Email is Required');
//         return 0;
//       }
//       if (`${mobile}` === '') {
//         errorToast('Mobile is Required');
//         return 0;
//       }


//       // console.log(countryId,"countryIdcountryIdcountryIdcountryId",stateId,cityId)


//       if (!countryId || !countryId?.value) {
//         errorToast("Country is Required");
//         return 0;
//       };
//       if (!stateId || !stateId?.value) {
//         errorToast("State is Required");
//         return 0;
//       };
//       if (!cityId || !cityId?.value) {
//         errorToast("City is Required");
//         return 0;
//       };



//       console.log(categoryArr,"categoryArr")
//       console.log("categoryArrObj", categoryArr[0],"categoryObj")

//       // let checked =categoryArr.filter(el => el.checked)

//       let tempArr = categoryArr?.map((el) => {
//         if(selected.includes(el?._id)){
//           el = {...el, checked: true}
//         }
//         return el
//       })



//       console.log("tempArr=======", tempArr, "===== tempArr")
//       // console.log("tempArr", tempArr[], "tempArr")
//        selectedCategories =tempArr.filter(el => el.checked).map(el => ({ categoryId: el._id }));

//       // console.log("temcattemcattemcat", temcat,"temcattemcattemcat")
//       if (!selectedCategories || selectedCategories?.length == 0) {
//         errorToast("Category is Required");
//         return 0;
//       };
     
//       if (`${address}` === "") {
//         errorToast("Address is Required");
//         return 0;
//       };

//       if (`${companyCeo}` === "") {
//         errorToast("Company Ceo Name is Required");
//         return 0;
//       };
//       // if (`${googleMapsLink}` === "") {
//       //   errorToast("Google Maps Link Name is Required");
//       //   return 0;
//       // };
      
      
//     }
   
//     if (!termsAccepted) {
//       errorToast("Please Accept our terms and condition and privacy policy before registering !!!");
//       return
//     }

//     let obj = {
//       name,
//       email,
//       phone: mobile,
//       address,
//       whatsapp,
//       dob,
//       brandNames,
//       role: type,
//       gstNumber,
//       countryId: countryId?.value,
//       stateId: stateId?.value,
//       cityId: cityId?.value,
//       aniversaryDate,
//       categoryArr: selectedCategories,
//       companyObj: {
//         name: companyName,
//         email: companyEmail,
//         phone: companyPhone,
//         address,
//         gstNumber,
//         noofepmployee,
//         natureOfBusiness,
//         annualTurnover,
//         yearOfEstablishment,
//         legalStatus,
//         companyCeo,
//         googleMapsLink,
//       },
//       gstCertificate,
//     };

//     console.log(JSON.stringify(obj, null, 2), ">>>>>>>>>>>>>>>>>>>>>>>>>>>")

//     try {
//       let { data: res } = await registerUser(obj);
//       console.log(JSON.stringify(res,null,2), "register data ")

//       if (res) {
//         // console.log(JSON.stringify(res.data,null,2), "register data ")
//         toastSuccess(res.message);
//         await setToken(res.token);
//         setIsAuthorized(true);
        
//         navigation.navigate('Subscriptions',{register:true});
//       }
//     } catch (error) {
//       console.log(error)
//       console.error(error);
//       errorToast(error);
//     }
//   };

//   const handleGetCoutries = async () => {
//     try {
//       let { data: res } = await getCountriesApi();
//       if (res.data) {
//         setcountryArr(res.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleGetStates = async countrysId => {
//     try {
//       let { data: res } = await getStateByCountryApi(`countryId=${countrysId}`);
//       if (res.data) {
//         console.log(res.data, 'asd');
//         setstateArr(res.data);
//       } else {
//         setstateArr([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleGetCities = async stateId => {
//     try {
//       let { data: res } = await getCityByStateApi(`stateId=${stateId}`);
//       if (res.data) {
//         setcityArr(res.data);
//       } else {
//         setcityArr([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (focused) {
//       handleGetCoutries();
//       handleNestedCategory();
//     }
//   }, [focused]);
//   useEffect(() => {
//     if (countryId) {
//       handleGetStates(countryId.value);
//     }
//   }, [countryId]);

//   useEffect(() => {
//     if (stateId) {
//       handleGetCities(stateId.value);
//     }
//   }, [stateId]);

//   const handleDocumentPicker = async () => {
//     try {
//       let file = await DocumentPicker.pickSingle({
//         presentationStyle: 'fullScreen',
//         type: DocumentPicker.types.images,
//       });
//       if (file) {
//         console.log(file, 'file');
//         let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
//         if (base64) {
//           console.log('SETTING BASE ^$', file);
//           setGstCertificateName(file);
//           setgstCertificate(`data:${file.type};base64,${base64}`);
//         }
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   const handleNestedCategory = async () => {
//     try {
//       const { data: res } = await getAllCategories()
//       if (res.success && res.data.length) {
//         setcategoryArr(res.data.map(el => ({ ...el, checked: false })))
//         setcategorydata(res.data.map(el => ({ label:el.name,value:el._id })))
//       }

//     } catch (error) {
//       console.error(error)
//       toastError(error)
//     }
//   }
//   const handleError = err => {
//     if (DocumentPicker.isCancel(err)) {
//       console.warn('cancelled');

//       // User cancelled the picker, exit any dialogs or menus and move on
//     } else if (isInProgress(err)) {
//       console.warn('multiple pickers were opened, only the last will be considered');
//     } else {
//       throw err;
//     }
//     errorToast(err);
//   };


//   const handleCheckCategory = (id) => {
//     let tempCategoryObjIndex = categoryArr.findIndex(el => el._id == id);


//     let tempCategoryArr = categoryArr;


//     if (tempCategoryObjIndex != -1) {
//       tempCategoryArr[tempCategoryObjIndex].checked = !tempCategoryArr[tempCategoryObjIndex].checked
//     }


//     setcategoryArr([...tempCategoryArr])

//   }





//   // const data = [
//   //   { label: 'Item 1', value: '1' },
//   //   { label: 'Item 2', value: '2' },
//   //   { label: 'Item 3', value: '3' },
//   //   { label: 'Item 4', value: '4' },
//   //   { label: 'Item 5', value: '5' },
//   //   { label: 'Item 6', value: '6' },
//   //   { label: 'Item 7', value: '7' },
//   //   { label: 'Item 8', value: '8' },
//   // ];
//   const [selected, setSelected] = useState([]);
//   const renderItem = item => {
//     return (
//       <View style={styles1.item}>
//         <Text style={styles1.selectedTextStyle}>{item.label}</Text>
//         {/* <AntDesign style={styles1.icon} color="black" name="Safety" size={20} /> */}
//       </View>
//     );
//   };





//   const renderCategory = ({ item, index }) => {
//     return (
//       <>
//         <Pressable style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => handleCheckCategory(item._id)}>
//           <Checkbox.Android
//             status={item.checked ? 'checked' : 'unchecked'}
//             onPress={() => {
//               handleCheckCategory(item._id)
//             }}
//             color="#B08218"
//             borderColor="red"
//           />
//           <Text>{item.name}</Text>
//         </Pressable>
//       </>
//     )
//   }


//   return (
//     <>
//       <View style={{ backgroundColor: 'white', paddingLeft:10 }}>
//         <Image source={require('../../assets/img/logo.png')} style={styles1.logosize} resizeMode="contain" />
//       </View>
//       <ScrollView contentContainerStyle={[styles.bgwhite]}>
//         <View style={{ backgroundColor: '#fae8c8', paddingHorizontal: wp(2.5), borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
//         <View style={[{ width: wp(90), display: 'flex', alignSelf: 'center' }]}>
//           <View>
//             <Text style={styles1.heading}>Register with us</Text>
//           </View>
//         </View>

//           <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
//             {rolesArr &&
//               rolesArr.length > 0 &&
//               rolesArr.map((el, index) => {
//                 return (
//                   <Pressable key={index} onPress={() => handleSetRole(el.name)} style={[styles1.button, el.checked && { backgroundColor: '#B08218' }]}>
//                     <Text style={[styles1.buttonTxt, el.checked && { color: '#fff' }]}>{el.name}</Text>
//                   </Pressable>
//                 );
//               })}
//           </View>

//           <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setcompanyName(e)}
//             value={companyName}
//             label="Name Of the Organization *"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           />


          
//              {/* <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
         
//             label="Name Of the Organization *"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           /> */}





//           <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             keyboardType="numeric"
//             onChangeText={e => setcompanyPhone(e)}
//             value={companyPhone}
//             maxLength={10}
//             label="Organization Phone / Landline"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           />

//           {/* <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             keyboardType="email-address"
//             onChangeText={e => setcompanyEmail(e)}
//             value={companyEmail}
//             label="Organization Email"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           /> */}


//           <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setgstNumber(e)}
//             value={gstNumber}
//             label="GST NO."
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
              
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           />



// {/* <Text style={{ marginBottom: 15, }}></Text> */}



//           <MultiSelect
//           style={styles1.dropdown}
//           placeholderStyle={styles1.placeholderStyle}
//           selectedTextStyle={styles1.selectedTextStyle}
//           inputSearchStyle={styles1.inputSearchStyle}
//           // iconStyle={styles1.iconStyle}
//           data={categorydata}
//           labelField="label"
//           valueField="value"
//           placeholder="Please Select Categories *"
//           value={selected}
//           search
//           searchPlaceholder="Search..."
          
//           onChange={item => {
//             console.log(item, " CAT ITEM");
//             // console.log(item.map((el) => ({...el, checked})))
//             setSelected(item);
//           }}
//           // renderLeftIcon={() => (
//           //   <AntDesign
//           //     style={styles.icon}
//           //     color="black"
//           //     name="Safety"
//           //     size={20}
//           //   />
//           // )}
//           renderItem={renderItem}
//           renderSelectedItem={(item, unSelect) => (
//             <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
//               <View style={styles1.selectedStyle}>
//                 <Text style={styles1.textSelectedStyle}>{item.label}</Text>
//                 <AntDesign color="black" name="delete" size={12} />
//               </View>
//             </TouchableOpacity>
//           )}
//         />





//           {/* <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setNatureOfBusiness(e)}
//             value={natureOfBusiness}
//             label="Nature of Business"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           /> */}


         
//           <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setBrandNames(e)}
//             value={brandNames}
//             label="Dealing With Brand Names"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           />

//           <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setYearOfEstablishment(e)}
//             value={yearOfEstablishment}
//             label="Year of Establishment *"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           />

// <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setaddress(e)}
//                 value={address}
//                 label="Address *"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               />






//           {/* <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setdob(e)}
//             value={dob}
//             label="Birthday"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           /> */}

//         <Text style={{ fontSize: 17,  marginTop:15, fontWeight: "600",  }}>Contact Person Details</Text>
//           {role !== ROLES_CONSTANT.USER && (
//             <>
//               {/* <Text style={{ marginTop: hp(4), color: "black", fontSize: 18, paddingLeft: 5 }}>Company Details</Text> */}
//               <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setname(e)}
//                 value={name}
//                 label="Name of Authorised person *"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               />

// <TextInput
//             style={styles1.mbboot}
//             mode="outlined"
//             onChangeText={e => setemail(e)}
//             value={email}
//              label=" Your Email Id *"
//             keyboardType="email-address"
//             outlineStyle={{
//               borderWidth: 0.8,
//               borderRadius: 16,
//               borderColor: '#B08218',
//               marginBottom: 15,
//               height: 50,
//             }}
//             theme={{
//               colors: {
//                 text: '#f5f5f5',
//                 accent: '#ffffff',
//                 primary: '#666666',
//                 placeholder: '#f5f5f5',
//                 background: '#fff',
//                 borderWidth: '1',
//                 fontSize: 8,
//               },
//             }}
//             underlineColor="#E7E7E8"
//             underlineColorAndroid="#E7E7E8"
//           />
//               {/* <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setcompanyEmail(e)}
//                 value={companyEmail}
//                 label="Company Email"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               /> */}
//               <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 maxLength={10}
//                 onChangeText={e => setmobile(e)}
//                 value={mobile}
//                 keyboardType="number-pad"
//                 label="Mobile No. *"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               />
//               <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setwhatsapp(e)}
//                 value={whatsapp}
//                 maxLength={10}
//                 keyboardType="numeric"
//                 label="Whatsapp number"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               />

//               {/* <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setnoofepmployee(e)}
//                 value={noofepmployee}
//                 label="Number of employees"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               /> */}
            
//               {/* //////new Fields */}


//               {/* <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setAnnualTurnover(e)}
//                 value={annualTurnover}
//                 label="Annual Turnover"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               /> */}


//               <Pressable onPress={() => setAniversaryDateModal(true)}>

//                 <TextInput
//                   style={styles1.mbboot}
//                   mode="outlined"
//                   editable={false}
//                   onChangeText={e => setAniversaryDate(e)}
//                   value={moment(aniversaryDate).format("YYYY-MM-DD")}
//                   label="Birthday"
//                   outlineStyle={{
//                     borderWidth: 0.8,
//                     borderRadius: 16,
//                     borderColor: '#B08218',
//                     marginBottom: 15,
//                     height: 50,
//                   }}
//                   theme={{
//                     colors: {
//                       text: '#f5f5f5',
//                       accent: '#ffffff',
//                       primary: '#666666',
//                       placeholder: '#f5f5f5',
//                       background: '#fff',
//                       borderWidth: '1',
//                       fontSize: 8,
//                     },
//                   }}
//                   underlineColor="#E7E7E8"
//                   underlineColorAndroid="#E7E7E8"
//                 />
//               </Pressable>

//               {/* <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setLegalStatus(e)}
//                 value={legalStatus}
//                 label="Legal Status"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               /> */}

//               {/* <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setCompanyCeo(e)}
//                 value={companyCeo}
//                 label="Company Ceo"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               /> */}
//               <TextInput
//                 style={styles1.mbboot}
//                 mode="outlined"
//                 onChangeText={e => setGoogleMapsLink(e)}
//                 value={googleMapsLink}
//                 label="Google Maps Link"
//                 outlineStyle={{
//                   borderWidth: 0.8,
//                   borderRadius: 16,
//                   borderColor: '#B08218',
//                   marginBottom: 15,
//                   height: 50,
//                 }}
//                 theme={{
//                   colors: {
//                     text: '#f5f5f5',
//                     accent: '#ffffff',
//                     primary: '#666666',
//                     placeholder: '#f5f5f5',
//                     background: '#fff',
//                     borderWidth: '1',
//                     fontSize: 8,
//                   },
//                 }}
//                 underlineColor="#E7E7E8"
//                 underlineColorAndroid="#E7E7E8"
//               />

//               {/* //////new Fields */}

//               <Pressable
//                 style={styles1.BorderedPressable}
//                 onPress={() => {
//                   setModalVisible(true);
//                   setModalFor('Country');
//                 }}>
//                 <Text style={styles.borderedPressableText}>{countryId && countryId.value ? countryId.name : 'Please Select Country *'}</Text>
//               </Pressable>
//               <Pressable
//                 style={styles1.BorderedPressable}
//                 onPress={() => {
//                   setModalVisible(true);
//                   setModalFor('State');
//                 }}>
//                 <Text style={styles.borderedPressableText}>{stateId && stateId.name ? stateId.name : 'Please Select State *'}</Text>
//               </Pressable>
//               <Pressable
//                 style={styles1.BorderedPressable}
//                 onPress={() => {
//                   setModalVisible(true);
//                   setModalFor('City');
//                 }}>
//                 <Text style={styles.borderedPressableText}>{cityId && cityId.value ? cityId.name : 'Please Select City *'}</Text>
//               </Pressable>





//               {/* <Pressable
//                 style={styles1.BorderedPressable}
//                 onPress={() => {
//                   handleDocumentPicker();
//                 }}>
//                 <Text style={styles.borderedPressableText}>{gstCertificate && gstCertificate.name ? gstCertificate?.name : 'Please Upload GST Certificate'}</Text>
//               </Pressable> */}
//             </>
//           )}


         


          
          



//           {/* <FlatList
//             data={categoryArr}
//             scrollEnabled={false}
//             nestedScrollEnabled={false}
//             renderItem={renderCategory}
//             keyExtractor={(item, index) => `${index}`}
//           /> */}
// {/* 
//       <Dropdown
//         style={styles1.dropdown}
//         placeholderStyle={styles1.placeholderStyle}
//         selectedTextStyle={styles1.selectedTextStyle}
//         inputSearchStyle={styles1.inputSearchStyle}
//         data={categorydata}
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder="Select Categories"
//         searchPlaceholder="Search..."
//         value={value}
//         onChange={item => {
//           setValue(item.value);
//         }}
        
//       />

// <View style={styles1.dropdown}>
//   <Text> Select Category</Text>
//   <Entypo name='chevron-small-down' color='#000' size={16} />
// </View> */}

// {/* <View style={styles1.container}> */}
      
//       {/* </View> */}




         


//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               setModalVisible(!modalVisible);
//             }}>
//             <View style={styles1.centeredView}>
//               <View style={styles1.modalView}>
//                 {modalFor == 'Country' ? (
//                   <>
//                     <Text style={{ fontSize: 20, marginBottom: 20, width: wp(70) }}>Please select a country</Text>
//                     <FlatList
//                       data={countryArr}
//                       keyExtractor={(item, index) => index}
//                       renderItem={({ item, index }) => {
//                         return (
//                           <Pressable
//                             onPress={() => {
//                               setcountryId({ name: item.name, value: item._id });
//                               setModalVisible(false);
//                             }}
//                             style={[styles1.BorderedPressable, { width: wp(70) }]}>
//                             <Text style={styles1.BorderedPressableText}>{item.name}</Text>
//                           </Pressable>
//                         );
//                       }}
//                     />
//                   </>
//                 ) : modalFor == 'State' ? (
//                   <>
//                     <Text style={{ fontSize: 20, marginBottom: 20, width: wp(70) }}>Please select a state</Text>
//                     <FlatList
//                       data={stateArr}
//                       keyExtractor={(item, index) => index}
//                       renderItem={({ item, index }) => {
//                         return (
//                           <Pressable
//                             onPress={() => {
//                               setstateId({ name: item.name, value: item._id });
//                               setModalVisible(false);
//                             }}
//                             style={[styles1.BorderedPressable, { width: wp(70) }]}>
//                             <Text style={styles1.BorderedPressableText}>{item.name}</Text>
//                           </Pressable>
//                         );
//                       }}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <Text style={{ fontSize: 20, marginBottom: 20, width: wp(70) }}>Please select a city</Text>
//                     <FlatList
//                       data={cityArr}
//                       keyExtractor={(item, index) => index}
//                       renderItem={({ item, index }) => {
//                         return (
//                           <Pressable
//                             onPress={() => {
//                               setcityId({ name: item.name, value: item._id });
//                               setModalVisible(false);
//                             }}
//                             style={[styles1.BorderedPressable, { width: wp(70) }]}>
//                             <Text style={styles1.BorderedPressableText}>{item.name}</Text>
//                           </Pressable>
//                         );
//                       }}
//                     />
//                   </>
//                 )}
//               </View>
//             </View>
//           </Modal>

//           <View style={[{ marginVertical: 20 }]}>
//             <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
//               <Checkbox.Android
//                 status={termsAccepted ? 'checked' : 'unchecked'}
//                 onPress={() => {
//                   setTermsAccepted(!termsAccepted)
//                 }}
//                 color="#B08218"
//                 borderColor="red"
//               />

//               <Text> Please Accept our </Text>
//               <Pressable
//                onPress={() => navigation.navigate("TermsAndConditions")}>
//                 <Text style={{color:'#b08218', fontFamily:'Poppins-Medium', marginTop:5}}> terms and condition {" "}</Text>
//               </Pressable>
//               <Text>
//                 and
//               </Text>
//               <Pressable
//                 style={{ marginLeft: 40, marginBottom: 5 }}
//                 onPress={() => navigation.navigate("Privacy")}>
//                 <Text style={{color:'#b08218', fontFamily:'Poppins-Medium', marginTop:5}}>privacy policy{" "}</Text>
//               </Pressable>
//               <Text style={{ marginBottom: 5 }}>
//                 before registering
//               </Text>
//             </View>
//             <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnbg, { width: wp(90) }]}>
//               <Text style={styles.textbtn}>Register</Text>
//             </TouchableOpacity>
//             <Pressable onPress={() => navigation.navigate('Mobilenumber')} style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: wp(93), marginTop: 20 }]}>
//               <Text style={styles1.btnTxt}>Already a user ?</Text>
//               <Text style={[styles1.btnTxt, { color: '#C28C28', marginLeft: 10, fontSize: 15 , fontFamily:'Poppins-Medium',}]}>Login</Text>
//             </Pressable>

//             <TouchableOpacity onPress={() => navigation.navigate('LegalAbouts')} style={{alignSelf:'center'}}>
//               <Text  style={[styles1.btnTxt, { color: '#C28C28', marginLeft: 10, fontSize: 15 , fontFamily:'Poppins-Medium',}]}>Legal & About</Text>
//             </TouchableOpacity>
//           </View>
//         </View>


//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={aniversaryDateModal}
//           onRequestClose={() => {
//             setAniversaryDateModal(!aniversaryDateModal);
//           }}>
//           <View style={styles1.centeredView}>
//             <View style={styles1.modalView}>
//               <Text style={styles1.modalText}>Select Birthday</Text>
//               <DatePicker
              
//               dividerColor={'red'}
//               date={aniversaryDate} mode="date" onDateChange={setAniversaryDate} textColor={'#000000'} />
//               <Pressable
//                 style={[styles1.button, styles1.buttonClose]}
//                 onPress={() => setAniversaryDateModal(!aniversaryDateModal)}>
//                 <Text style={styles1.textStyle}>Close</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>




//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={categoryModal}
//           onRequestClose={() => {
//             setCategoryModal(!categoryModal);
//           }}>
//           <View style={styles1.centeredView}>
//             <View style={styles1.modalView}>
//               <Text style={styles1.modalText}>Category</Text>
//               <DatePicker date={aniversaryDate} mode="date" onDateChange={setAniversaryDate} />
//               <Pressable
//                 style={[styles1.button, styles1.buttonClose]}
//               // onPress={() => setCategoryModal(!categoryModal)}
//               >
//                 <Text style={styles1.textStyle}>Close</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>

//       </ScrollView >
//     </>
//   );
// }
// const styles1 = StyleSheet.create({

//   // container: { padding: 16 },
//   dropdown: {
//     marginTop:20,
//     borderWidth: 0.8,
    
//     borderColor: '#B08218',

//     height: 50,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 12,
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 1,
//     // },
//     // shadowOpacity: 0.2,
//     // shadowRadius: 1.41,

//     // elevation: 2,
//   },
//   placeholderStyle: {
//     fontSize: 13,
//     color:'#504f51',
//   },
//   selectedTextStyle: {
//     fontSize: 14,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   item: {
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   selectedStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 14,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     marginTop: 8,
//     marginRight: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,

//     elevation: 2,
//   },
//   textSelectedStyle: {
//     marginRight: 5,
//     fontSize: 12,
//   },





































//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: "rgba(0,0,0,0.8)"
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
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
//     backgroundColor: 'white',
//     borderColor: '#B08218',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 25,
//     // width: wp(23.5)
//   },
//   buttonTxt: {
//     fontSize: 11,
//     color:'#000'
//   },
//   BorderedPressable: {
//     backgroundColor: 'white',
//     borderColor: '#B08218',
//     borderWidth: 1,
//     paddingVertical: 15,
//     paddingLeft: 15,
//     marginTop: 15,
//     borderRadius: 15,
//   },
//   BorderedPressableText: {
//   },

//   centeredView: {
//     height: hp(100),
//     width: wp(100),
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     maxHeight: hp(70),
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: wp(90),
//   },

//   bottomfixed: {
//     height: hp(55),
//     // backgroundColor:'red',
//     display: 'flex',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   wrapper: {
//     borderWidth: 0.8,
//     borderColor: '#B08218',
//     borderStyle: 'solid',
//     borderRadius: 16,
//   },
//   paddingtop20: {
//     marginTop: 30,
//     paddingBottom: 30,
//   },
//   heading: {
//     fontFamily: 'Manrope-Bold',
//     color: '#383737',
//     fontSize: 26,
//     marginVertical: 10,
//   },
//   textcont: {
//     fontFamily: 'Manrope-Regular',
//     color: '#383737',
//     fontSize: 15,
//   },
//   mbboot: {
//     fontSize: 13,
//     marginTop: 15,
//     fontFamily: 'Outfit-Medium',
//   },
//   logobox: {
//     width: wp(95),
//     height: hp(18),
//     zIndex: 1,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logosize: {
//     width: wp(60),
//     height: wp(18),
//     // display: 'flex',
//     // alignSelf: 'center',
//     // marginBottom: 250
//     // marginTop: 10,
//   },
//   mb20: {
//     marginBottom: 25,
//   },
//   btnstartd: {
//     backgroundColor: '#B08218',
//   },
//   imglogcentr: {
//     // opacity:0.5,

//     position: 'absolute',
//     bottom: 0,
//     zIndex: 1,
//   },
//   flexend: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     flex: 1,
//     zIndex: 2,
//   },
//   heading1: {
//     fontFamily: 'Manrope-ExtraBold',
//     color: '#383737',
//     fontSize: 35,
//   },
//   paddingbtm: {
//     paddingBottom: 60,
//   },
// });