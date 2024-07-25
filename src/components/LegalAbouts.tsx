import { View,Image,  Text, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../navigation/customheader/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
export default function LegalAbouts(props) {
  const navigate = useNavigation()
  return (
    <>
    <Header stackHeader={true} screenName={'Legal & Abouts'} rootProps={props} />
    <ScrollView style={{backgroundColor:'#fff', flex:1, paddingHorizontal:10, paddingTop:10,  }}>
    
      <View style={{alignSelf:'center'}}>
            <Image source={require('../../assets/img/logoheader.png')}  style={{width:wp(80), height:hp(10)}} resizeMode='contain' />

      </View>
        <Text style={{fontSize:wp(3.5), color:'#797979', textAlign:'justify', fontFamily:'Poppins-Regular'}} >Plywood bazar. com is India's largest online B2B market place brought a platform to interact with Manufacturers, Distributors, Dealers, Wholesalers and Retailers of Furniture, Plywood, Hardware & Interior Exterior Industries.
        </Text> 
        <View style={{paddingVertical:hp(2)}}>
          <TouchableOpacity onPress={()=> navigate.navigate('Privacy')} style={{borderTopColor:'#ccc', borderTopWidth:1, paddingVertical:5, borderBottomColor:'#ccc', borderBottomWidth:1, borderStyle:'solid', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
            
            <Text style={{color:'#b08218', fontFamily:'Poppins-Medium'}}>Privacy Policy</Text>
            <Entypo name='chevron-small-right' size={30} color='#888' />
         
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigate.navigate('TermsAndConditions')} style={{paddingVertical:5, borderBottomColor:'#ccc', borderBottomWidth:1, borderStyle:'solid', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
              <Text style={{color:'#b08218', fontFamily:'Poppins-Medium'}}>Terms and Conditions</Text>
              <Entypo name='chevron-small-right' size={30} color='#888' />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigate.navigate('Aboutus')} style={{paddingVertical:5, borderBottomColor:'#ccc', borderBottomWidth:1, borderStyle:'solid', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
              <Text style={{color:'#b08218', fontFamily:'Poppins-Medium'}}>About us</Text>
              <Entypo name='chevron-small-right' size={30} color='#888' />
            </TouchableOpacity>


          </View>



        <View style={{alignSelf:'center'}}>
          <Text style={{marginTop:hp(2), fontSize:wp(6), marginBottom:5, color:'#b08218', fontFamily:'Poppins-Medium' }}>Company Motto</Text>
         </View>
          <Text style={{fontSize:wp(3.5), color:'#797979', textAlign:'justify', fontFamily:'Poppins-Regular'}}>Plywood Bazar.com is a startup that is working to improve this unorganized furniture , interior and exterior industry by co-ordinate in between them. Providing large potential market exposure for business expansion.</Text>
         

<View style={{paddingBottom:20, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Image source={require('../../assets/img/plywood_img1.jpeg')}  style={{width:wp(30), height:wp(30)}} />
        <Text style={{fontSize:wp(3.5), color:'#797979', textAlign:'justify', fontFamily:'Poppins-Medium'}}>Sandip Chothave</Text>
        <Text style={{fontSize:wp(3.5), color:'#797979', textAlign:'justify', fontFamily:'Poppins-Medium'}}>Founder & CEO Plywood Bazar.com
</Text>
</View>

    </ScrollView>


    
    </>
  )
}