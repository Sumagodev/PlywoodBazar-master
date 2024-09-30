// import React from 'react';
// import { View, ScrollView, FlatList, Text } from 'react-native';
// import ProfileViewNote from '../ReusableComponents/NotificationCards/ProfileViewNote';
// import ProductViewNote from '../ReusableComponents/NotificationCards/ProductViewNote';
// import ContactsNote from '../ReusableComponents/NotificationCards/ContactsNote';

// // Sample data array with dynamic types
// const data = [
//   { id: '1', type: 'profile', content: 'Profile notification', name: 'John Doe', date: '2024-09-26' },
//   { id: '2', type: 'product', content: 'Product notification', productName: 'Laptop', price: '$1200', date: '2024-09-25' },
//   { id: '3', type: 'contacts', content: 'Contacts notification', contactName: 'Jane Smith', date: '2024-09-24' },
//   { id: '4', type: 'profile', content: 'Another profile notification', name: 'Alex Johnson', date: '2024-09-23' },
//   { id: '5', type: 'profile', content: 'Yet another profile notification', name: 'Chris Evans', date: '2024-09-22' },
//   { id: '6', type: 'contacts', content: 'Another contacts notification', contactName: 'Emma Watson', date: '2024-09-21' },
// ];


// const Notification = () => {

//   const notificationItem = ({ item }) => {
//     // Dynamic rendering based on item type
    
//     switch (item.type) {
//       case 'profile':
//         return <ProfileViewNote content={item.content} name={item.name} date={item.date} />;
//       case 'product':
//         return <ProductViewNote content={item.content} productName={item.productName} price={item.price} date={item.date} />;
//       case 'contacts':
//         return <ContactsNote content={item.content} contactName={item.contactName} date={item.date} />;
//       default:
//         return <Text>Unknown notification type</Text>;
//     }
//   };
  

//   return (

//       <View style={{backgroundColor:"#ffffff"}}>
//         <FlatList
//           data={data}
//           renderItem={notificationItem}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
 
//   );
// };

// export default Notification;

import {View, Text, ScrollView, Pressable, Image, StyleSheet, FlatList,Alert} from 'react-native';
import React, {useEffect, useState,useCallback,useContext} from 'react';
import styles from '../../assets/stylecomponents/Style';
import {Switch} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation,useIsFocused,CommonActions} from '@react-navigation/native';
import {isAuthorisedContext} from '../navigation/Stack/Root';
import Header from '../navigation/customheader/Header';
import { getDecodedToken, getUserNotifications } from '../services/User.service';
import { errorToast } from '../utils/toastutill';
import useRedirectToLoginIfNotLoggedIn from '../utils/RedirectToLoginIfNotLoggedIn';

export default function Notification(props) {

  const [Notification, setNotification] = useState([]);
  const navigation = useNavigation(props);
  const [isAuthorized] = useContext(isAuthorisedContext);
  console.log('isAuthorized',isAuthorized);
  
  const focused = useIsFocused();
  useEffect(() => {
    if (isAuthorized ) {
      // User is authorized, proceed as normal
    } else {
      
    }
  }, [isAuthorized, focused]);
  
  const handleGetProducts = async (skipValue, limitValue, searchQuery) => {
    try {

      const decodedToken = await getDecodedToken();

      if(!decodedToken){
        return 
      }


        let query = `?page=${skipValue}&perPage=${limitValue}&userId=${decodedToken?.user?._id}`

        console.log(query)

        let { data: res } = await getUserNotifications(query)
        console.log("start notifaction", res.data , "end notifaction===========================",res.data.length)
        if (res.data) {
            // setTotalElements(res.totalElements)
            setNotification(res.data)
        }
    }
    catch (err) {
        errorToast(err)
    }
}

// useEffect(() => {
//   handleGetProducts()
// }, [])

useFocusEffect(
  useCallback(() => {
    handleGetProducts(); // Fetch data every time the screen is focused
  }, [])
);

  return (
    <View style={[styles.padinghr, styles.bgwhite, {flex:1,}]}>
      <Header stackHeader={true} screenName={'Notification'} rootProps={props} />



        {
          Notification && Notification?.length >  0  ?
    <>
          <View style={{flexDirection: 'row', width: wp(100), alignSelf: 'center',justifyContent:'space-between', paddingVertical:10,paddingHorizontal:10, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
          {/* <View style={{width:wp(15)}}>
            <Text>S.no</Text>
          </View> */}
          <View style={{width:wp(30)}}>
            <Text>Title</Text>
          </View>
          <View style={{width:wp(30)}}>
            <Text>Content</Text>
          </View>
          <View style={{width:wp(16)}}>
            <Text>Date</Text>
          </View>
        </View>


      <FlatList
      data={Notification}
      contentContainerStyle={{marginTop:hp(1)}}
      renderItem={({item,index})=>{
        return(
          <View style={{flexDirection: 'row', width: wp(95), alignSelf: 'center', marginBottom:hp(0.5), justifyContent:'space-between'}}>
        {/* <View style={{width:wp(15)}}>
          <Text>{index + 1} </Text>
        </View> */}
        <View style={{width:wp(30)}}>
          <Text>{item.title}</Text>
        </View>
        <View style={{width:wp(30)}}>
          <Text>{item.content}</Text>
        </View>
        <View style={{width:wp(16)}}>
          <Text> {item.createdAt}</Text>
        </View>
      </View>
        )
      }}
      
      />
      </>
      :
      <View style={{height:hp(80), display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:wp(5), }}>
        No Notification Found
        </Text>
      </View>
    }
    </View>
  );
}
const styles1 = StyleSheet.create({
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    // justifyContent: 'space-between',
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
  imgfluid: {
    width: wp(6),
    height: hp(3),
    marginRight: 10,
  },
  card_main: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameheading: {
    color: '#000000',
    fontFamily: 'Manrope-Medium',
  },
});
