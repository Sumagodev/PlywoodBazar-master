import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { axiosApiInstance } from '../../../App';
import AddFlashSale from '../../components/AddFlashSale';
import AddProducts from '../../components/AddProducts';
import AddPromotions from '../../components/AddPromotion';
import AllChats from '../../components/AllChats';
import AllProducts from '../../components/AllProducts';
import Categories from '../../components/Categories';
import Categories1 from '../../components/Categories1';
import Chat from '../../components/Chat';
import EditProduct from '../../components/EditProducts';
import Editprofile from '../../components/Editprofile';
import Filtercategory from '../../components/Filtercategory';
import GeneralInfo from '../../components/GeneralInfo';
import Home from '../../components/Home';
import Leads from '../../components/Leads';
import Mobilenumber from '../../components/Mobilenumber';
import MyFlashSales from '../../components/MyFlashSales';
import Myorders from '../../components/Myorders';
import MyProducts from '../../components/MyProducts';
import MyPromotions from '../../components/MyPromotions';
import MySubscriptions from '../../components/MySubscriptions';
import Notification from '../../components/Notification';
import Productdetails from '../../components/Productdetails';
import RecentActivity from '../../components/RecentActivity';
import Register from '../../components/Register';
import Requirement from '../../components/Requirement';
import Reviews from '../../components/Reviews';
import Subscriptions from '../../components/Subscriptions';
import Supplier from '../../components/Supplier';
import Support from '../../components/Support';
import Userprofile from '../../components/Userprofile';
import Userprofile1 from '../../components/Userprofile1';
import Verifymobilenumber from '../../components/Verifymobilenumber';
import Writeareview from '../../components/Writeareview';
import Blogs from '../../components/Blogs';
import BlogDetails from '../../components/BlogDetails';
import EditFlashSale from '../../components/EditFlashSale';
import EditPromotions from '../../components/UpdatePromotion';
import Topups from '../../components/Topups';
import PaymentWebView from '../../components/PaymentWebView';
import { PaymentSuccess } from '../../components/PaymentSuccess';
import { BottomTabNavigator } from '../BottomBar/BottomBar';
import TermsAndConditions from '../../components/TermsAndConditions';
import Privacy from '../../components/Privacy';
import Aboutus from '../../components/Aboutus';
import LegalAbouts from '../../components/LegalAbouts';
import Chkdropdown from '../../components/Chkdropdown';
import Login from '../../components/Login';
import VerifyOtp from '../../components/VerifyOtp';
import ReviewsPage from '../../components/ReviewsPage';
import EventsOrActivitiesPage from '../../ReusableComponents/EventsOrActivitiesPage';
import AddDealershipOpportunitiesForm from '../../components/AddDealershipOpportunitiesForm';
import ApplyOppFor from '../../components/ApplyOppFor';
import VendorListByState from '../../components/VendorListByState';
import DealershipOppolisting from '../../components/DealershipOppolisting';
import AppliedOpportunitieslist from '../../components/AppliedOpportunitieslist';
import EditdealershipOpp from '../../components/EditdealershipOpp';
import SelfAppliedOpportunitiesList from '../../components/SelfAppliedOpportunitiesList';
import AddBannerfrom from '../../components/AddBannerfrom';
import AllBannerslisting from '../../components/AllBannerslisting';
import EditBannerform from '../../components/EditBannerform';
import LauncherComponent from '../../components/LauncherComponent';
import VerifyOTPOnLaunch from '../../components/VerifyOTPOnLaunch';
import { Pressable, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Image } from '@rneui/base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import CustomColors from '../../styles/CustomColors';



export const isAuthorisedContext = createContext({});
const Stack = createNativeStackNavigator();
export default function RootStack() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state


  useMemo(() => {
    axiosApiInstance.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('AUTH_TOKEN');
        

        // console.log(token)
        if (token) {
          config.headers['authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );
    axiosApiInstance.interceptors.response.use(
      res => {
        // Add configurations here
        return res;
      },
      err => {
        if (err?.response?.status === 401) {
          // console.log("ONLY IN ERROR")
          // toast.error('401 Unauthorized')
          AsyncStorage.removeItem('AUTH_TOKEN');
          setIsAuthorized(false);
        }
        return Promise.reject(err);
      },
    );
  }, []);

  const checkAuthorized = async () => {
    const otpVerified = await AsyncStorage.getItem('isOtpVerified'); // Check OTP verification status
    const isVerified = otpVerified === 'true'; // Convert to boolean
    setIsOtpVerified(isVerified); // Update state for OTP verification

  

    let token = await AsyncStorage.getItem('AUTH_TOKEN');
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    setLoading(false); // Set loading to false after checking

  };

  useEffect(() => {
    checkAuthorized();
  }, []);
// Render loading screen while checking authorization
if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
      <Image source={require('../../../assets/img/logo_1.png')} resizeMode='center' style={{width:widthPercentageToDP(50),height:widthPercentageToDP(50),marginVertical:widthPercentageToDP(10)}}></Image>
      <ActivityIndicator size="small" color={CustomColors.mattBrownDark} />
      <Pressable style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: widthPercentageToDP(93), marginTop: 20 }]}>
          <Text style={[{ color: '#C28C28', marginLeft: 10, marginTop:widthPercentageToDP(5),fontSize: widthPercentageToDP(7) }]}>Plywoodbazar.com</Text>
        </Pressable>
    </View>
  );
}


  return (
    <>
      <isAuthorisedContext.Provider value={[isAuthorized, setIsAuthorized]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={isOtpVerified ? "BottomBar" : "LauncherComponent"}>
            {/* <Stack.Navigator initialRouteName="Writeareview"> */}
            <Stack.Screen
            name="LauncherComponent"
            component={LauncherComponent}
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
            
          />
             <Stack.Screen
            name="VerifyOTPOnLaunch"
            component={VerifyOTPOnLaunch}
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
            
          />


            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="BottomBar"
              component={BottomTabNavigator}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Verifymobilenumber"
              component={Verifymobilenumber}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Filtercategory"
              component={Filtercategory}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Categories"
              component={Categories}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Categories1"
              component={Categories1}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Productdetails"
              component={Productdetails}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AllProducts"
              component={AllProducts}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Userprofile"
              component={Userprofile}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Reviews"
              component={Reviews}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Userprofile1"
              component={Userprofile1}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Editprofile"
              component={Editprofile}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="EditProduct"
              component={EditProduct}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="EditFlashSale"
              component={EditFlashSale}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="EditPromotions"
              component={EditPromotions}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Requirement"
              component={Requirement}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Myorders"
              component={Myorders}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="GeneralInfo"
              component={GeneralInfo}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Support"
              component={Support}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Notification"
              component={Notification}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Chat"
              component={Chat}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Supplier"
              component={Supplier}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Writeareview"
              component={Writeareview}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Register"
              component={Register}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="MySubscriptions"
              component={MySubscriptions}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Subscriptions"
              component={Subscriptions}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Leads"
              component={Leads}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="MyProducts"
              component={MyProducts}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="RecentActivity"
              component={RecentActivity}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="MyFlashSales"
              component={MyFlashSales}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AddFlashSales"
              component={AddFlashSale}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="MyPromotions"
              component={MyPromotions}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AllChats"
              component={AllChats}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AddAdvertisement"
              component={AddPromotions}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AddProducts"
              component={AddProducts}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Blogs"
              component={Blogs}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Topups"
              component={Topups}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="BlogDetails"
              component={BlogDetails}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="PaymentWebView"
              component={PaymentWebView}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="PaymentSuccess"
              component={PaymentSuccess}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Privacy"
              component={Privacy}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Aboutus"
              component={Aboutus}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="LegalAbouts"
              component={LegalAbouts}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="Chkdropdown"
              component={Chkdropdown}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="VerifyOtp"
              component={VerifyOtp}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="ReviewsPage"
              component={ReviewsPage}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="EventsOrActivitiesPage"
              component={EventsOrActivitiesPage}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AddDealershipOpportunitiesForm"
              component={AddDealershipOpportunitiesForm}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="ApplyOppFor"
              component={ApplyOppFor}
            />

            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="VendorListByState"
              component={VendorListByState}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="DealershipOppolisting"
              component={DealershipOppolisting}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AppliedOpportunitieslist"
              component={AppliedOpportunitieslist}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="EditdealershipOpp"
              component={EditdealershipOpp}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="SelfAppliedOpportunitiesList"
              component={SelfAppliedOpportunitiesList}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AddBannerfrom"
              component={AddBannerfrom}
            />
          
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="AllBannerslisting"
              component={AllBannerslisting}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
              }}
              name="EditBannerform"
              component={EditBannerform}
            />
          



          </Stack.Navigator>
        </NavigationContainer>
      </isAuthorisedContext.Provider>
    </>
  );
}
