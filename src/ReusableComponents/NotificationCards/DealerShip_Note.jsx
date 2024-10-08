import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomColors from '../../styles/CustomColors';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { updateReadStatus } from '../../services/Notifications.service';
import { GetDealershipOpportunities } from '../../services/Advertisement.service';
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


const DealerShip_Note = ({ item, isSubscriber = false }) => {
  const navigation = useNavigation();
  const [oppdata, setoppdata] = useState([]);
console.log('item?.payload?.flashSaleDetails?.endDate',JSON.stringify(oppdata));
const [daysDifference, setDaysDifference] = useState(0);
const handleopportunitydata = async () => {
    try {
      let mydata = await GetDealershipOpportunities();
      if (mydata) {
        console.log('yyyyyyyyyyy',JSON.stringify(mydata.data.data.length));
    const data = mydata.data.data.find(itemx => {
       if( itemx._id === item?.payload?.opportunity?._id)
        {
            mydata=itemx;
        }
    });
    console.log('qqqqqqqqqqqqqqqq',mydata);
setoppdata(mydata);



      }else{
        console.log('nox',mydata)
      }
    } catch (err) {
        console.log('nox',err)
      console.log(err);
    }
  };
  // Function to calculate the difference in days
  const convertDateToDays = (isoDateString) => {
    const givenDate = new Date(isoDateString);
    const currentDate = new Date();
    const timeDifference = givenDate.getTime() - currentDate.getTime();
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
  };

  // Using useEffect to update the days difference when the component loads
  useEffect(() => {
    handleopportunitydata()
    if (item?.payload?.flashSaleDetails?.endDate) {
      const days = convertDateToDays(item.payload.flashSaleDetails.endDate);
      setDaysDifference(days);
    }
    
  }, [item]);
  const handlePress = () => {
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

    navigation.navigate('ApplyOppFor', { Data: oppdata });
  };

  const updateReadStatusApiCall = async (userId, notificationId) => {
    try {
      const res = await updateReadStatus(userId, notificationId);
    } catch (error) {
      console.error('Error updating read status:', error);
      throw error; // Rethrow the error to handle it in handlePress
    }
  };

  return (
    <Pressable
      style={[customStyle.container, { backgroundColor: item.isRead ? '#fff3e9' : CustomColors.mattBrownFaint }]}
      onPress={handlePress}
    >
      <View style={customStyle.rowContainer}>
        <Image source={require('../../../assets/img/logo_1.png')} style={customStyle.leadingIcon} />
        <View style={customStyle.contentContainer}>
          <View style={{ flexDirection: 'row', paddingHorizontal: wp(1), alignItems: 'center', flexWrap:'wrap' }}>
            <Text style={{ width: '90%' }}>
            Exclusive Dealership Opportunity Available For{' '}
              <Text style={customStyle.textBold}>{item?.payload?.organizationObj?.brandNames}!</Text>{' '}
              
              thrilled to announce a new dealership/distributor opportunity in <Text style={customStyle.textBold}>{item?.payload?.organizationObj?.address}!</Text>{' '}Join our growing network and become a part of our success story.{''}
           Interested? Fill the given form to{' '}<Text style={customStyle.textBold}>Apply{' '}</Text>and learn more!
              </Text>
            
            <Text style={[customStyle.dateText, { width: '10%', flex: 1, marginHorizontal: wp(1) ,alignItems:'center',justifyContent:'center'}]}>
              {getRelativeTime(item.lastAccessTime)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const customStyle = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.mattBrownFaint,
    marginBottom: wp(0.5),
    paddingVertical: wp(3),
    elevation: wp(15),
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: wp(1),
    alignItems: 'center',
  },
  leadingIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    marginHorizontal: wp(1),
    resizeMode: 'contain',
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

export default DealerShip_Note;
