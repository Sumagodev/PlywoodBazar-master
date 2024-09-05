import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import CustomColors from '../styles/CustomColors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'



const LoadMoreButton = ({onPress}) => {
  return (
    <TouchableOpacity style={{height:wp(13),width:wp(13),backgroundColor:CustomColors.mattBrownDark,borderRadius:wp(10),alignSelf:'center',justifyContent:'center',flex:1}} onPress={onPress}>
    <FontAwesome5Icon style={{ alignSelf:'center'}} name="chevron-down" size={wp(6)} color="white" />
    </TouchableOpacity>
  )
}

export default LoadMoreButton