import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomColors from '../../styles/CustomColors';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { updateReadStatus } from '../../services/Notifications.service';
import { GetDealershipOpportunities } from '../../services/Advertisement.service';
import { getDecodedToken } from '../../services/User.service';
import { errorToast } from '../../utils/toastutill';
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


const Product_approval_status_updated = ({ item, isSubscriber = false }) => {
    const navigation = useNavigation();
    const [oppdata, setoppdata] = useState([]);
    const [isOppotunityAvailable, setOpAvailable] = useState(false);
    console.log('item?.payload?.flashSaleDetails?.endDate', JSON.stringify(item));
    const [daysDifference, setDaysDifference] = useState(0);
    const [locations, setLocations] = useState('');
    const handleopportunitydata = async () => {
        try {
            let mydata = await GetDealershipOpportunities();
            if (mydata) {
                console.log('yyyyyyyyyyy', JSON.stringify(mydata.data.data.length));
                const data = mydata.data.data.find(itemx => {
                    if (itemx._id === item?.payload?.opportunity?._id) {
                        mydata = itemx;
                        setoppdata(mydata);
                        setOpAvailable(true)

                    } else {
                        return
                    }
                });
            } else {
                console.log('nox', mydata)
            }
        } catch (err) {
            console.log('nox', err)
            console.log(err);
        }
    };
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
            if (item?.payload?.cities?.length > 1) {
                setLocations(item?.payload?.cities[0]?.name)
            } else {
                setLocations(item?.payload?.stateObj?.name)
            }
        }

    }, [item]);
    const handlePress = () => {
        const notificationId = item._id;
        console.log('notificationId', notificationId);

        try {
            // Call the function to update read status
            updateReadStatusApiCall(notificationId);
            // Navigate to the Product Details screen

        } catch (error) {
            console.error('Failed to update read status:', error);
            // You can add additional error handling here (e.g., showing an alert)
        }

        if (item) {
            navigation.navigate('Productdetails', { data: item?.payload?.productDetails?.slug });
        } else {
            errorToast('Oops.. Opportunity is not available for now')
        }
    };

    const updateReadStatusApiCall = async (notificationId) => {
        try {
            const decoded = await getDecodedToken();
            updateReadStatus(notificationId, decoded?.userId);
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
                    {/* Main container */}
                    <View style={{ flexDirection: 'row', paddingHorizontal: wp(1), flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Main content text with auto-adjusting size */}
                        <Text style={{ flexShrink: 1, width: '90%', marginTop: wp(2) }} numberOfLines={10} adjustsFontSizeToFit={true}>

                            Hi{' '}<Text style={customStyle.textBold}>{item?.payload?.userObj?.name} ,</Text>{'\n'}
                            your product approval status has been updated to{' '}
                            <Text style={customStyle.textBold}>{item?.payload?.approvedStatus}.</Text>
                        </Text>

                        {/* Relative time positioned at the top-right corner */}

                    </View>
                    <Text style={[customStyle.dateText, { justifyContent: 'flex-end', alignSelf: 'flex-end', paddingHorizontal: wp(2) }]}>
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
        marginHorizontal: wp(1),
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
        marginTop: wp(0.5),
        color: CustomColors.darkGray,
    },
});

export default Product_approval_status_updated;
