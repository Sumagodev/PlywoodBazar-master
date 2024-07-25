import {Image, FlatList,  View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../assets/stylecomponents/Style'
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Header from '../navigation/customheader/Header';


export default function Reviews(props) {
  const navigate = useNavigation()
const [review, setReview] = useState([]);
 
const reabderreview = ({item, index}) =>{
  return(
    <Pressable onPress={()=> navigate.navigate('Userprofile')}>
        <View style={[styles1.flexrow, {marginTop:20,}]}>
          <View style={{marginRight:10}}>
            <Image source={item.userimg} style={{width:wp(14), height:hp(7)}}  />
          </View>
          <View>
            <Text style={styles1.nameuser}>{item.name}</Text>
          <View style={styles1.flexrowq}>
              <Text style={{color: '#000', fontSize: 12, fontFamily: 'Manrope-Bold'}}>
                4.9<Text style={{color: '#333333', fontSize: 12, fontFamily: 'Manrope-Regular'}}>/5</Text>
              </Text>
              <AntDesign name="star" color="#F5B158" size={16} />
              <AntDesign name="star" color="#F5B158" size={16} />
              <AntDesign name="star" color="#F5B158" size={16} />
              <AntDesign name="star" color="#F5B158" size={16} />
              <Text style={{color: '#333333', fontSize: 12, fontFamily: 'Manrope-Regular'}}>{item.ratingnum}</Text>
            </View>
            </View>
        </View>
          <Text style={styles1.reviwestext}>{item.ratingtext}</Text>
        </Pressable>
  )

}


  return (

    <>
    <Header stackHeader={true} screenName={'Reviews'} rootProps={props} />
    <View style={[styles.padinghr, styles.bgwhite, styles.flex1]}>
      <Text style={[styles.textcenter, styles1.ratingreview]}>4.0</Text>
        <View style={{alignItems:'center', marginBottom:30,}}>
          <View style={styles1.flexrowq}>
            <AntDesign name="star" color="#F5B158" size={19} />
            <AntDesign name="star" color="#F5B158" size={19} />
            <AntDesign name="star" color="#F5B158" size={19} />
            <AntDesign name="star" color="#F5B158" size={19} />
            <AntDesign name="star" color="#CCDADC" size={19} />
        </View>
        <Text style={styles1.baserevi }>based on 23 reviews</Text>
        </View>
        <View style={styles1.flexrow}>
           <View style={{width:wp(30)}}>
              <Text style={styles1.textprosser}>Excellent</Text>
           </View>
           <View style={{width:wp(60)}}>
              <ProgressBar progress={0.9} color='#4AA54A' style={{backgroundColor:'#ccdadc', height:6, borderTopRightRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10,  borderTopLeftRadius:10,}} />
          </View>
        </View>
        <View style={styles1.flexrow}>
           <View style={{width:wp(30)}}>
              <Text style={styles1.textprosser}>Good</Text>
           </View>
           <View style={{width:wp(60)}}>
              <ProgressBar progress={0.7} color='#A5D631' style={{backgroundColor:'#ccdadc', height:6, borderTopRightRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10,  borderTopLeftRadius:10,}} />
          </View>
        </View>
        <View style={styles1.flexrow}>
           <View style={{width:wp(30)}}>
              <Text style={styles1.textprosser}>Average </Text>
           </View>
           <View style={{width:wp(60)}}>
              <ProgressBar progress={0.6} color='#FCF5AF' style={{backgroundColor:'#ccdadc', height:6, borderTopRightRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10,  borderTopLeftRadius:10,}} />
          </View>
        </View>
        <View style={styles1.flexrow}>
           <View style={{width:wp(30)}}>
              <Text style={styles1.textprosser}>Below Avarage </Text>
           </View>
           <View style={{width:wp(60)}}>
              <ProgressBar progress={0.5} color='#F9BA54' style={{backgroundColor:'#ccdadc', height:6, borderTopRightRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10,  borderTopLeftRadius:10,}} />
          </View>
        </View>
        <View style={styles1.flexrow}>
           <View style={{width:wp(30)}}>
              <Text style={styles1.textprosser}>Poor </Text>
           </View>
           <View style={{width:wp(60)}}>
              <ProgressBar progress={0.3} color='#F36B4B'  style={{backgroundColor:'#ccdadc', height:6, borderTopRightRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10,  borderTopLeftRadius:10,}} />
          </View>
        </View>
          <FlatList 
              data={review}
              keyExtractor={(item, index) => `${index}`}
              renderItem={reabderreview}
              scrollEnabled
              style={{maxHeight:hp(93), width:wp(95) }}
            />

        <Text style={styles1.sellall}>See All</Text>
        <TouchableOpacity style={styles1.bgbtn} onPress={() => navigate.navigate('Requirement')}>
          <Text style={[styles1.headingmain]}>Write a Review</Text>
        </TouchableOpacity>
        
    </View>
    </>
  )
}
const styles1 = StyleSheet.create({
  bgbtn:{
    backgroundColor:'#B08218',
    borderRadius:16,
    
  },
  headingmain:{
    textAlign:'center',
    color:'#fff',
    padding:10,
    fontSize:18,
    fontFamily:'Manrope-Regular',
  },
  sellall:{
    textAlign:'center',
    fontSize:20,
    color:'#000',
    marginBottom:10,
  },
  reviwestext:{
    fontFamily:'Manrope-Regular',
    color:'#666666',
    fontSize:12,
    
  },
  nameuser:{
    color: '#444444',
    fontFamily:'Manrope-Medium',
    fontSize:14,
  },
  textprosser:{
    color: '#666666',
    fontFamily:'Manrope-Medium',
    fontSize:13,
  },
  flexrow:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginBottom:5,

  },
    ratingreview:{
        fontSize:20,
        color:'#000',
        marginBottom:10,
    },
    flexrowq: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginVertical: 5,
      },
      baserevi:{
        fontFamily:'Manrope-Medium',
        fontSize:15,
        color:'#555555'

      },
      
})