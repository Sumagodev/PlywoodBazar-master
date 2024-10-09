import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomColors from '../../styles/CustomColors';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; // You'll need to install moment.js for this
import { getDecodedToken } from '../../services/User.service';
const getRelativeTime = (dateString) => {
  const providedDate = new Date(dateString);

  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60; // IST offset in minutes
  const utcOffset = providedDate.getTimezoneOffset(); // Current timezone offset
  const istDate = new Date(providedDate.getTime() + (istOffset + utcOffset) * 60 * 1000);

  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now - istDate;

  // Calculate total differences in minutes, hours, and days
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Total minutes difference
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Total hours difference
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Total days difference

  // If the difference is less than 1 hour, show it in minutes (e.g., "45M")
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // If the difference is less than 24 hours, show it in hours (e.g., "5H")
  if (diffInDays === 0) {
    return `${diffInHours}h`;
  }

  // If the difference is more than a day, show days (e.g., "1D", "2D")
  return `${diffInDays}d`;
};

const ProfileCompletionNote = ({ item, productName, organizationName, date, isSubscriber=false }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    const modifiedItem = {
      ...item,
      _id: item.payload.accessedBy,
    };
    let userId=item.userId;
    let notificationId=item._id;
     updateReadStatusApiCall(userId,notificationId);
    () => navigate.navigate('Userprofile1');
    
  };
  const updateReadStatusApiCall =  async (userId,notificationId) => {

    const decoded=await getDecodedToken();      
    updateReadStatus(notificationId,decoded?.userId); 
  console.log(res.data,'resx');

 }

  // Conditionally rendering different views based on isSubscriber
  if (isSubscriber) {
    return (
<View style={[customStyle.container, { backgroundColor: item.isRead ? '#fff3e9' : CustomColors.mattBrownFaint}]}>
<View style={customStyle.rowContainer}>
          <Image source={require('../../../assets/img/logo_1.png')} style={customStyle.leadingIcon} />
          <View style={customStyle.contentContainer}>
            
          <View style={{ flexDirection: 'row', paddingHorizontal: wp(2), alignItems: 'center' }}>
        {/* Content section taking 90% of the width */}
        <Text style={{ width:'88%' }}>
        <Text>Thanks for joining us! To get started and make the most of our features, please complete your profile setup.</Text>
          
        </Text>
        
        {/* Last access time taking 10% of the width */}
        <Text style={[customStyle.dateText, { width: '5%', flex:1,marginHorizontal: wp(1) }]}>
          {getRelativeTime(item.lastAccessTime)}
        </Text>
      </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
<Pressable style={[customStyle.container, { backgroundColor: item.isRead ? '#fff3e9' : CustomColors.mattBrownFaint}]}  onPress={handlePress}>
<View style={customStyle.rowContainer}>
    <Image source={require('../../../assets/img/logo_1.png')} style={customStyle.leadingIcon} />
    <View style={customStyle.contentContainer}>
      <View style={{ flexDirection: 'row', paddingHorizontal: wp(2), alignItems: 'center' }}>
        {/* Content section taking 90% of the width */}
        <Text style={{ width:'88%' }}>
          <Text>Thanks for joining us! To get started and make the most of our features, please complete your profile setup.</Text>
        </Text>
        
        {/* Last access time taking 10% of the width */}
        <Text style={[customStyle.dateText, { width: '5%', flex:1,marginHorizontal: wp(1) }]}>
          {getRelativeTime(item.lastAccessTime)}
        </Text>
      </View>
    </View>
  </View>
</Pressable>
    );
  }
};

const customStyle = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.mattBrownFaint,
    marginBottom: wp(0.5),
    paddingVertical: wp(3),
    elevation:wp(15)
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: wp(1),
  },
  leadingIcon: {
    width: wp(10),
    height: wp(10),
    marginHorizontal:wp(1),
    borderRadius: wp(10),
    resizeMode: 'contain',
    resizeMode: 'contain',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  contentContainer: {
    marginHorizontal: wp(3),
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


export default ProfileCompletionNote;