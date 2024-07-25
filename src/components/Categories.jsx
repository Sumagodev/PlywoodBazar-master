import { FlatList, Image, Pressable, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from '../../assets/stylecomponents/Style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Header from '../navigation/customheader/Header';
export default function Categories(props) {
  const navigation = useNavigation();
  const [activeclass, setactiveclass] = useState('Plywood & MDF');

  const [topsuppler, settopsuppler] = useState([
    {
      heightlightproduct: require('../../assets/img/product1.png'),
      categoryname: 'Plywood & MDF',
    },
    {
      heightlightproduct: require('../../assets/img/product2.png'),
      categoryname: 'Laminates/Veneers',
    },
    {
      heightlightproduct: require('../../assets/img/product3.png'),
      categoryname: 'Adhesive',
    },
    {
      heightlightproduct: require('../../assets/img/product4.png'),
      categoryname: 'Hardware/Furniture Fixtures',
    },
    {
      heightlightproduct: require('../../assets/img/product5.png'),
      categoryname: 'Hardware/Furniture Fixtures',
    },
    {
      heightlightproduct: require('../../assets/img/product6.png'),
      categoryname: 'Hardware/Furniture Fixtures',
    },
  ]);
  const rendertopsuppler = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => setactiveclass(item.categoryname)}
        style={[
          item.categoryname == activeclass
            ? styles1.activeproduct
            : styles1.boxproduct,
        ]}>
        <Image
          source={item.heightlightproduct}
          style={styles1.imgfluid}
          resizeMode="contain"
        />
        <Text
          style={[
            item.categoryname == activeclass
              ? styles1.activetext
              : styles1.producthead,
          ]}>
          {item.categoryname}
        </Text>
      </Pressable>
    );
  };


  const [categoryname1, setcategoryname1] = useState([
    {
      categoryname1: 'Brand',
    },
    {
      categoryname1: 'Commercial Plywood',
    },
    {
      categoryname1: 'Block Boards',
    },
    {
      categoryname1: 'Waterproof Plywood',
    },
    {
      categoryname1: 'Waterproof Plywood',
    },
    {
      categoryname1: 'Shuttering Plywood',
    },
    {
      categoryname1: 'Flush Doors',
    },
    {
      categoryname1: 'WPC Sheets',
    },
    {
      categoryname1: 'Interior Grade MDF',
    },
    {
      categoryname1: 'Exterior Grade MDF',
    },
    {
      categoryname1: 'Birch Plywood',
    },
    {
      categoryname1: 'Fire Resistant Plywood',
    },
    {
      categoryname1: 'E.0 Plywood. Finger Joint Panels',
    },
    {
      categoryname1: 'Particle Board',
    },
  ]);
  const rendercategoryname1 = ({ item, index }) => {
    return (
      <Text style={styles1.card_main}>{item.categoryname1}</Text>
    );
  };







  const ListHeader = () => {
    //View to set in Header
    return (
      <>


        <Header stackHeader={true} screenName={'Categories'} rootProps={props} />
        {/* <View style={styles1.flexbetween}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/backbtn.png')}
            style={styles1.imgsmall}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles1.categry}>Categories</Text>
        <Image
          source={require('../../assets/img/notification.png')}
          style={styles1.imgsmall}
        />
      </View> */}
      </>
    );
  };

  const ListFooter = () => {
    //View to set in Header
    return (
      <>



        <FlatList
          style={styles.mttop10}
          contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }}
          data={topsuppler}
          horizontal
          renderItem={rendertopsuppler}
          keyExtractor={(item, index) => `${index}`}
        />

        <Text style={styles1.headingmain}>Plywood & MDF</Text>
        <FlatList
          data={categoryname1}
          keyExtractor={(item, index) => `${index}`}
          renderItem={rendercategoryname1}
          scrollEnabled
          style={{ maxHeight: hp(93), width: '100%' }}
          contentContainerStyle={{ paddingVertical: 5, marginBottom: 30, }}
        />


      </>
    );
  };

  return (
    <View style={[styles.padinghr, styles.bgwhite, styles.flex1]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        //Header to show above listview
        ListHeaderComponent={ListHeader}
        //Footer to show below listview
        ListFooterComponent={ListFooter}
      // renderItem={ItemView}
      // ListEmptyComponent={EmptyListMessage}
      contentContainerStyle={{paddingBottom:hp(10)}}
      />
    </View>
  );
}
const styles1 = StyleSheet.create({
  imgfluid: {
    width: wp(20),
    height: hp(8),
    display: 'flex',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',
  },
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
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
  boxproduct: {
    backgroundColor: '#F4F4F4',
    borderRadius: 24,
    padding: 12,
    marginRight: 15,
    height: hp(18),
    width: wp(40),
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  producthead: {
    textAlign: 'center',
    color: '#888888',
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    marginTop: 10,
  },
  activeproduct: {
    backgroundColor: '#FFF9E6',
    // backgroundColor:'#F4F4F4',
    borderRadius: 24,
    padding: 12,
    marginRight: 15,
    height: hp(18),
    width: wp(40),
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activetext: {
    color: '#BD9000',
    textAlign: 'center',
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    marginTop: 10,
  },
  headingmain: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#000',
    marginBottom: 10,
  },
  card_main: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 10,
    fontFamily: 'Manrope-Medium',
    color: '#000'
  }
});
