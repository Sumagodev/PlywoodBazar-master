import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Text } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Rating } from 'react-native-ratings';
import CustomColors from '../styles/CustomColors';

const TopProfileHomeCard = ({ title, image, rating, Product, onPress, onCallPress ,item}) => {
  console.log('og',item);
  
  const [imageFailed, setImageFailed] = useState(false); // State to track image failure

  return (
    <View style={styles1.card1}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', overflow: 'hidden', width: '87%', right: wp(-11) }}>
        <View>
          <Text style={styles1.cardTitle1} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
            <Rating size={1} imageSize={wp(4)} readonly startingValue={rating} />
            <Text style={{ fontWeight: '900', fontSize: wp(2.5), marginLeft: wp(1.5) }}>Products {Product}</Text>
          </View>
          <View style={{ flexDirection: 'row', margin: wp(3), alignItems: 'flex-start', right: wp(5) }}>
            <TouchableOpacity style={styles1.callwrap} onPress={onCallPress}>
              <View style={styles1.iconwrap}>
                <Image
                  source={require('../../assets/img/phone.png')} // Replace with your image path
                  style={{ resizeMode: 'cover', height: wp(7), width: wp(7) }}
                />
              </View>
              <View style={{ paddingLeft: wp(1), paddingRight: wp(3) }}>
                <Text style={{ fontWeight: '900' }}>Connect</Text>
              </View>
            </TouchableOpacity>
            <View style={styles1.callwrap1}>
              <TouchableOpacity onPress={onPress}>
                <Text style={{ fontWeight: '900', color: 'white', paddingLeft: wp(4), paddingRight: wp(4),paddingVertical:wp(1.8) }}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          shadowOpacity: 1,
          width: wp(25),
          left: -wp(14),
          alignSelf: 'center',
          borderRadius: 60,
          elevation: wp(5),
        }}
      >
        <Image
          source={imageFailed ? require('../../assets/img/logo_1.png') : image} // Fallback to default image
          resizeMode='contain'
          style={styles1.cardImage1}
          onError={() => setImageFailed(true)} // Set imageFailed to true on error
        />
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  card1: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: wp(5),
    paddingVertical: wp(1.5),
    width: wp(68),
    marginLeft: wp(14),
  },
  cardImage1: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(25),
    borderWidth: wp(1),
    borderColor: 'white',
  },
  cardTitle1: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginVertical: 5,
    overflow: 'hidden'
  },
  callwrap: {
    backgroundColor: '#white',
    borderRadius: wp(9),
    alignItems: 'center',
    marginHorizontal: wp(1.2),
    flexDirection: 'row',
  },
  callwrap1: {
    backgroundColor: CustomColors.colorNewButton,
    borderRadius: wp(9),
    alignItems: 'center',
    marginHorizontal: wp(1.2),
    flexDirection: 'row',
  },
  iconwrap: {
    height: wp(9),
    width: wp(9),
    borderRadius: wp(9),
    backgroundColor: '#39AB68',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default TopProfileHomeCard;
