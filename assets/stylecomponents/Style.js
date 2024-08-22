import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    bgwhite:{
        backgroundColor:'#fff',
    },
    flex1:{
        flex:1,
    },    
    positionrelative:{
        position:'relative',
        
    },
    padinghr:{
        paddingHorizontal:wp(2),
    },
    btnbg:{
        backgroundColor:'#B08218',
        borderRadius:5,
        
    },
    textbtn:{
        textAlign:'center',
        color:'#fff',
        padding:10,
        fontFamily:'Manrope-Bold',
        fontSize:18,
    },
    textcenter:{
        textAlign:'center',
        fontFamily:'Manrope-Bold',
    }

})

export default styles;