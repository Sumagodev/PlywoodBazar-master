import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {Text} from 'react-native-paper';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomButton from './CustomButton';
import CustomColors from '../styles/CustomColors';
export default TopProfileHomeCard = ({title, image, description}) => (
  <View style={styles1.card1}>
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', flexWrap: 'wrap'}}>
      <View
        style={{
          shadowOpacity: 1,
          width: wp(25),
          left: wp(-15),
          alignSelf: 'center',
          borderRadius: 60,
          elevation: wp(5),
        }}>
        <Image source={{uri: image}} style={styles1.cardImage1} />
      </View>
      <View style={{width: wp(40), left: wp(-12)}}>
        <Text style={styles1.cardTitle1} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>

       <View style={{height:wp(5)}}>
        <Rating ></Rating>
        </View>
        <View style={{flexDirection: 'row', margin: wp(3), alignItems: 'flex-start', right: wp(5)}}>
          <View style={styles1.callwrap}>
            <View style={styles1.iconwrap}>
              <Image
                source={require('../../assets/img/phone.png')} // Replace with your image path
                style={{resizeMode: 'cover', height: hp(4), width: wp(7)}}
              />
            </View>
            <View style={{    paddingLeft: wp(1),paddingRight:wp(3)}}>
              <Text style={{ fontWeight: '900',}}>Connect</Text>
            </View>
          </View>
          <View style={styles1.callwrap1}>
            <View style={styles1.iconwrap1}>
              
            </View>
            <View style={{    }}>
              <Text style={{ fontWeight: '900',color:'white',paddingLeft: wp(4),paddingRight:wp(4)}}>Visit</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const styles1 = StyleSheet.create({
  card1: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: wp(5),
    width: wp(75),
    marginLeft: wp(14),
    height: hp(15),
  },
  cardImage1: {
    width: wp(25),
    height: hp(12),
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white',
  },
  cardTitle1: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginVertical: 5,
  },
  cardDescription1: {
    fontSize: 14,
    color: '#555',
  },
  callwrap: {
    // width: wp(26),
    // height: hp(5),
    backgroundColor: '#F5E5D8',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: wp(1.2),
    flexDirection: 'row',
  },
  callwrap1: {
    // width: wp(26),
    // height: hp(5),
    backgroundColor: CustomColors.mattBrownDark,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: wp(1.2),
    flexDirection: 'row',
  },
  iconwrap: {
    height: wp(9), 
    width: wp(9), 
    borderRadius: 20, 
    backgroundColor: '#39AB68', alignItems: 'center', justifyContent: 'center'},
iconwrap1: {
  height: wp(9), 
  borderRadius: 20, 
  alignItems: 'center', justifyContent: 'center'},
});
