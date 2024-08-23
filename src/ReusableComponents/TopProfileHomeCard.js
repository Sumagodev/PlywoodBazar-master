import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Text } from 'react-native-paper';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';




export default  TopProfileHomeCard = ({ title, image, description }) => (
    <View style={styles1.card1}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", flexWrap: 'wrap' }}>

        <View style={{ width: wp(8), right: wp(17) }}>
          <Image source={{ uri: image }} style={styles1.cardImage1} />
        </View>
        <View style={{ width: wp(45) }}>
          <Text style={styles1.cardTitle1} numberOfLines={1} ellipsizeMode="tail">{title}</Text>

         <Image
            source={require('../../assets/img/rating.png')} // Replace with your image path
            style={{ height: 15, width: wp(30), resizeMode: 'contain' }}
          />
          <View style={{ flexDirection: 'row', margin: wp(3), alignItems: 'flex-start',right:wp(5)}}>
            <View style={styles1.callwrap}>
            <View style={styles1.iconwrap}> 
            <Image
            source={require('../../assets/img/phone.png')} // Replace with your image path
            style={{ resizeMode:'cover',height:hp(4),width:wp(7) ,}}
          />
          </View>
              <Text style={{right:wp(3),fontWeight:'500'}}>Connect</Text>
            </View>
            <View style={styles1.callwrap}>
            <View style={styles1.iconwrap}>
            <Image
            source={require('../../assets/img/phone.png')} // Replace with your image path
            style={{ resizeMode:'cover',height:hp(4),width:wp(7) ,}}
          />
            </View>
            <Text style={{right:wp(2),fontWeight:'500'}}>Visit</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );


  const styles1=StyleSheet.create({
    
      card1: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        margin: wp(5),
        padding: 10,
        width: wp(75),
        marginLeft: wp(14),
        height: hp(15)
      },
      cardImage1: {
        width: wp(25),
        height: hp(12),
        borderRadius: 60,
        // position: 'absolute',
        // left: wp(50),
        // alignSelf:'flex-start'
        borderWidth:2,
        borderColor:'#FFFFFF',
        zIndex:1
    
    
    
    
      },
      cardTitle1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    
      },
      cardDescription1: {
        fontSize: 14,
        color: '#555',
      },
      callwrap: {
        width: wp(24),
        height: hp(5),
        backgroundColor: "#F5E5D8",
        padding: wp(2), borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: wp(1.2),
        flexDirection:'row'
    
      },
      iconwrap:{height:hp(4.5),width:wp(9),borderRadius:20,backgroundColor:'#39AB68', right:wp(4),alignItems:'center',justifyContent:"center"}
  })