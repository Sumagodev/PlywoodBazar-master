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

import {View, Text, ScrollView, Pressable, Image, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useEffect, useState, useCallback, useContext} from 'react';
import styles from '../../assets/stylecomponents/Style';
import {Switch} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation, useIsFocused, CommonActions} from '@react-navigation/native';
import {isAuthorisedContext} from '../navigation/Stack/Root';
import Header from '../navigation/customheader/Header';
import {checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserNotifications} from '../services/User.service';
import {errorToast} from '../utils/toastutill';
import useRedirectToLoginIfNotLoggedIn from '../utils/RedirectToLoginIfNotLoggedIn';
import ProductViewNote from '../ReusableComponents/NotificationCards/ProductViewNote';
import ProfileViewNote from '../ReusableComponents/NotificationCards/ProfileViewNote';
import ContactsNote from '../ReusableComponents/NotificationCards/ContactsNote';
import ProfileCompletionNote from '../ReusableComponents/NotificationCards/ProfileCompletionNote';
import ProductUnderReviewNote from '../ReusableComponents/NotificationCards/ProductUnderReviewNote';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
import Flash_sale_Note from '../ReusableComponents/NotificationCards/Flash_sale_Note';
import New_arrival_note from '../ReusableComponents/NotificationCards/New_arrival_note';
import Product_Review_Note from '../ReusableComponents/NotificationCards/Product_Review_Note';
import Vendor_Review_Note from '../ReusableComponents/NotificationCards/Vendor_Review_Note';
import DealerShip_Note from '../ReusableComponents/NotificationCards/DealerShip_Note';
import { updateReadStatus } from '../services/Notifications.service';
import Product_approval_status_updated from '../ReusableComponents/NotificationCards/Product_approval_status_updated';



export default function Notification(props) {
  const [Notification, setNotification] = useState([]);
  const [isAuthorized] = useContext(isAuthorisedContext);
  console.log('isAuthorized', isAuthorized);
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const[loadingDialog,setLoadingDialog]=useState(true);
  const focused = useIsFocused();
  useEffect(() => {
    if (isAuthorized) {
      handleGetProducts();
    } else {
    }
  }, [isAuthorized, focused]);

  const HandleCheckValidSubscription = async () => {
    try {
      let decoded = await getDecodedToken();
      if (decoded) {
        if (decoded?.user?.name) {
          //setName(decoded?.user?.name);
        }

        let {data: res} = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
        if (res.data) {
          console.log('XX', res.data, 'XX');
          setCurrentUserHasActiveSubscription(res.data);
          handleGetProducts(); // Fetch data every time the screen is focused
        }
        handleGetProducts(); 
      }
    } catch (err) {
      errorToast(err);
    }
  };
  const handleGetProducts = async (skipValue, limitValue, searchQuery) => {
    try {
      setLoadingDialog(true)
      const decodedToken = await getDecodedToken();

      if (!decodedToken) {
        return;
      }
      let query = `?page=${skipValue}&perPage=${limitValue}&userId=${decodedToken?.user?._id}`;
      console.log(query);
      let {data: res} = await getUserNotifications(query);
      if (res.data) {
        setNotification(res.data);
        setLoadingDialog(false)

      }
    } catch (err) {
      errorToast(err);
      setLoadingDialog(false)

    }
  };
  useFocusEffect(
    useCallback(() => {
      HandleCheckValidSubscription();
    }, []),
  );

  const notificationItem = ({item}) => {
    console.log('notifx', JSON.stringify(item));
    switch (item.type) {
      case 'profile_view':
        return <ProfileViewNote  isSubscriber={currentUserHasActiveSubscription} item={item} organizationName={item.payload.organizationName} content={item.content} name={item.name} date={item.date} />;
      case 'product_view':
        return <ProductViewNote  isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'contact':
        return <ContactsNote isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'profile_completion':
        return <ProfileCompletionNote isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'product_under_review':
        return <ProductUnderReviewNote isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'flash_sale':
        return <Flash_sale_Note isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'new_arrival':
        return <New_arrival_note isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'product_review':
        return <Product_Review_Note isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'vendor_review':
        return <Vendor_Review_Note isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'dealershipOpportunity':
        return <DealerShip_Note isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      case 'product_approval_status_updated':
        return <Product_approval_status_updated isSubscriber={currentUserHasActiveSubscription}  organizationName={item.payload.organizationName} productName={item.payload.productName} price={item.price} date={item.date} item={item} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.bgwhite, {flex: 1}]}>
      <Header normal={true} screenName={'Notification'} rootProps={props} />
      {Notification && Notification?.length > 0 ? (
        <>
          <FlatList data={Notification} contentContainerStyle={{marginTop: hp(1)}} renderItem={notificationItem} />
        </>
      ) : (
        <View style={{height: hp(80), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: wp(5)}}>No Notification Found</Text>
        </View>
      )}
      <LoadingDialog visible={loadingDialog}></LoadingDialog>
    </View>
  );
}

