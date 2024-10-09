import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomColors from '../../styles/CustomColors';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { updateReadStatus } from '../../services/Notifications.service';
import { getDecodedToken } from '../../services/User.service';

const getRelativeTime = (dateString) => {
  const providedDate = new Date(dateString);
  const istOffset = 5.5 * 60; // IST offset in minutes
  const utcOffset = providedDate.getTimezoneOffset(); // Current timezone offset
  const istDate = new Date(providedDate.getTime() + (istOffset + utcOffset) * 60 * 1000);
  const now = new Date();
  const diffInMs = now - istDate;

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }
  if (diffInDays === 0) {
    return `${diffInHours}h`;
  }
  return `${diffInDays}d`;
};

const ProductUnderReviewNote = ({ item, isSubscriber = false }) => {
  const navigation = useNavigation();

  const handlePress =  () => {
    const userId = item.userId;
    const notificationId = item._id;
    try {
      // Call the function to update read status
       updateReadStatusApiCall(userId, notificationId);
      // Navigate to the Product Details screen
      
    } catch (error) {
      console.error('Failed to update read status:', error);
      // You can add additional error handling here (e.g., showing an alert)
    }
    navigation.navigate('Productdetails', { data: item?.payload?.productDetails?.slug });
  };

  const updateReadStatusApiCall = async (userId, notificationId) => {
    try {
      const decoded=await getDecodedToken();      
      updateReadStatus(notificationId,decoded?.userId); 
    } catch (error) {
      console.error('Error updating read status:', error);
      throw error; // Rethrow the error to handle it in handlePress
    }
  };

  return (
    <Pressable
      style={[customStyle.container, { backgroundColor: item.isRead ? 'white' : '#fff3e9' }]}
      onPress={handlePress}
    >
      <View style={customStyle.rowContainer}>
        <Image source={require('../../../assets/img/logo_1.png')} style={customStyle.leadingIcon} />
        <View style={customStyle.contentContainer}>
          <View style={{ flexDirection: 'row', paddingHorizontal: wp(2), alignItems: 'center' }}>
            <Text style={{ width: '88%' }}>
              <Text>Hi </Text>
              <Text style={customStyle.textBold}>{item?.payload?.userObj?.companyObj?.name}</Text>
              {' '} your product <Text style={customStyle.textBold}>{item?.payload?.productDetails?.name}</Text> is under review. We’ll notify you once the verification is complete. Thanks for your patience!
            </Text>
            
          </View>
          <Text style={[customStyle.dateText, {justifyContent:'flex-end',alignSelf:'flex-end',paddingHorizontal:wp(2) }]}>
          {getRelativeTime(item.lastAccessTime)}
        </Text>
        </View>
      </View>
    </Pressable>
  );
};

const customStyle = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.mattBrownFaint,
    marginBottom: wp(0.5),
    paddingVertical: wp(1),
    elevation: wp(15),
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: wp(1),
    alignItems: 'center',
  },
 leadingIcon: {
    width: wp(8),
    height: wp(8),
    marginHorizontal: wp(1),
    borderRadius: wp(8),
    resizeMode: 'contain',
  },
  contentContainer: {
    marginHorizontal: wp(0.5),
    justifyContent: 'center',
    alignContent: 'center',
  },
  textBold: {
    fontWeight: '600',
  },
  dateText: {
    marginTop: wp(1),
    color: CustomColors.darkGray,
  },
});

export default ProductUnderReviewNote;
