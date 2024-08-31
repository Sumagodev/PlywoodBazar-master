import {View, Text, StyleSheet, FlatList, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {createTicket, getTicketsbyUserId} from '../services/UserTicket.service';
import {getDecodedToken} from '../services/User.service';
import Header from '../navigation/customheader/Header';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../../assets/stylecomponents/Style';
import {toastSuccess ,errorToast} from '../utils/toastutill';
export default function AllChats(props) {
  const navigation = useNavigation();
  const [ticketsArr, setTicketsArr] = useState([]);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const focused = useIsFocused();
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState(null);
  const handleGetUserTickets = async (skipValue, limitValue, userIdValue) => {
    try {
      let query = `page=${skipValue}&perPage=${limitValue}&userId=${userIdValue}`;

      let {data: res} = await getTicketsbyUserId(query);
      if (res.data) {
        setTicketsArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetDecodedToken = async () => {
    let temp = await getDecodedToken();
    console.log(temp);
    setUserId(temp.userId);
  };

  useEffect(() => {
    if (focused) {
      handleGetDecodedToken();
    }
  }, [focused]);
  useEffect(() => {
    if (focused && userId != '') {
      handleGetUserTickets(skip, limit, userId);
    }
  }, [focused, limit, skip, userId]);

  const handleTicketCreation = async () => {
    try {
      if (`${message}` === '' || !message) {
        errorToast('Please enter a message');
        return 0;
      }
      let decodedObj = await getDecodedToken();
      let obj = {
        userId: decodedObj?.userId,
        name: message,
      };
      let {data: res} = await createTicket(obj);
      if (res.message) {
        toastSuccess(res.message);
        // navigate(-1)
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const [expandedAccordion, setExpandedAccordion] = useState(1);

  const toggleAccordion = accordionNumber => {
    if (accordionNumber === expandedAccordion) {
      // If the same accordion is clicked, collapse it
      setExpandedAccordion(null);
    } else {
      // Expand the clicked accordion and collapse the others
      setExpandedAccordion(accordionNumber);
    }
  };

  const renderTicket = ({item, index}) => {
    return (
      <>
        <Pressable style={internal_styles.TicketContainer} onPress={() => navigation.navigate('Chat', {data: item._id})}>
          <View style={[internal_styles.flexRow, {marginBottom: 15, justifyContent: 'space-between'}]}>
            <Text style={{}}>{item.name}</Text>
            <Pressable onPress={() => navigation.navigate('Chat', {data: item._id})}>
              <Entypo name="chevron-thin-right" size={15} color="rgba(0,0,0,0.4)" />
            </Pressable>
          </View>
          <Text style={{position: 'absolute', bottom: 5, right: 5, fontSize: 10}}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
        </Pressable>
      </>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{height: hp(100), backgroundColor: '#fff'}}>
      <Header stackHeader={true} screenName={'Your Tickets  '} rootProps={props} />
      <FlatList
        data={ticketsArr}
        ListHeaderComponent={
          <>
            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: wp(6), color: '#b08218', marginTop: hp(3), marginBottom: hp(1), fontFamily: 'Poppins-Medium'}}>FAQ</Text>
              <TouchableOpacity onPress={() => toggleAccordion(1)} style={internalcss.accrodi}>
                <View style={[internalcss.ksdf]}>
                  <Text style={internalcss.accriodtext}> What is plywoodbazar.com </Text>
                  <Entypo name={expandedAccordion === 1 ? 'chevron-small-up' : 'chevron-small-down'} size={24} color="#454545" />
                </View>
                {expandedAccordion === 1 && (
                  <Text style={internalcss.textdad}>Plywood bazar. com is India's largest online B2B market place brought a platform to interact with Manufacturers, Distributors, Dealers, Wholesalers and Retailers of Furniture, Plywood, Hardware & Interior- Exterior Industries. </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleAccordion(2)} style={internalcss.accrodi}>
                <View style={[internalcss.ksdf]}>
                  <Text style={internalcss.accriodtext}>How to Register </Text>
                  <Entypo name={expandedAccordion === 2 ? 'chevron-small-up' : 'chevron-small-down'} size={24} color="#454545" />
                </View>
                {expandedAccordion === 2 && (
                  <>
                    <Text style={{fontSize: wp(3), fontFamily: 'Poppins-Medium'}}>Click Profile Icon right side corner at the top of website</Text>
                    <Text style={internalcss.textdad}>Then Click on Register here option.</Text>
                    <Text style={internalcss.textdad}>Then Select radio button for Who are you? i.e. MANUFACTURER/IMPORTER, DISTRIBUTOR Or DEALER.</Text>
                    <Text style={internalcss.textdad}>Then Fill other information like Name Of Organization , Email , Name Of Authorised Person , Contact No. What’s App No. Address , Upload Profile Photo , Banner photo etc.</Text>
                    <Text style={internalcss.textdad}>Then click on the Register Button.</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleAccordion(3)} style={internalcss.accrodi}>
                <View style={[internalcss.ksdf]}>
                  <Text style={internalcss.accriodtext}>What is the Subscription</Text>
                  <Entypo name={expandedAccordion === 3 ? 'chevron-small-up' : 'chevron-small-down'} size={24} color="#454545" />
                </View>
                {expandedAccordion === 3 && <Text style={internalcss.textdad}>An amount of money that you pay, usually once a year, to receive a membership for connecting to our website as a MANUFACTURER/IMPORTER, DISTRIBUTOR Or DEALER. regularly or to belong to an organization.</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleAccordion(4)} style={internalcss.accrodi}>
                <View style={[internalcss.ksdf]}>
                  <Text style={internalcss.accriodtext}>What is flash sale</Text>
                  <Entypo name={expandedAccordion === 4 ? 'chevron-small-up' : 'chevron-small-down'} size={24} color="#454545" />
                </View>
                {expandedAccordion === 4 && <Text style={internalcss.textdad}>A sale of goods at greatly reduced prices, lasting for only a short period of time. A discount or promotion offered by an ecommerce store for a short period of time.  </Text>}
              </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: wp(6), color: '#b08218', marginTop: hp(3), fontFamily: 'Poppins-Medium'}}>Your Tickets</Text>
            </View>
          </>
        }
        renderItem={renderTicket}
        contentContainerStyle={{paddingBottom: hp(0)}}
      />

      {/* <FlatList data={ticketsArr} keyExtractor={(item, index) => `${index}`} renderItem={renderTicket} contentContainerStyle={{paddingTop: 15, paddingBottom: 80}} ListEmptyComponent={<Text style={internal_styles.emptyText}>No Tickets Found</Text>} /> */}

      <View style={internal_styles.bottom_container}>
        <TextInput placeholder="Please Enter Message..." value={message} onChangeText={e => setMessage(e)} style={internal_styles.textInputStyles} multiline={true} numberOfLines={3}  />
        <TouchableOpacity onPress={() => handleTicketCreation()} style={[styles.btnbg, {width: wp(95), marginHorizontal: 10, marginBottom: 15}]}>
          <Text style={styles.textbtn}>Raise New Ticket</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const internal_styles = StyleSheet.create({
  TicketContainer: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    // marginVertical: 10,
    marginBottom: hp(1),
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    position: 'relative',
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottom_container: {
    position: 'absolute',
    bottom: 20,
    backgroundColor:'#fff'
  },
  textInputStyles: {
    borderWidth: 0.5,
    width: wp(95),
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: '#999',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

const internalcss = StyleSheet.create({
  accrodi: {
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 0.8,
    borderStyle: 'solid',
    paddingBottom: hp(1),
    marginBottom: hp(1.3),
  },
  textdad: {
    fontFamily: 'Roboto-Regular',
    color: '#454545',
    fontSize: 12,
    textAlign: 'justify',
    marginTop: 9,
  },
  accriodtext: {
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
  },
  fluid: {
    width: '100%',
    height: 210,
  },
  ksdf: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accroidonheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
