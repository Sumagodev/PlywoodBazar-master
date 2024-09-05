import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getBlogBySlugApi } from '../services/Blog.service';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';

import { generateImageUrl } from '../services/url.service';
// import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'

export default function BlogDetails(props) {
    const [blogDetails, setBlogDetails] = useState({});




    const handleGetBlogDetail = async () => {
        try {
            let { data: res } = await getBlogBySlugApi(props?.route?.params?.data)
            if (res.data) {
                setBlogDetails(res.data)
            }
        }
        catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        console.log(props?.route?.params?.data, "props?.route?.parama?.data")
        if (props?.route?.params?.data) {
            handleGetBlogDetail()
        }
    }, [props?.route?.params?.data])


    return (
        <>
        {/* <Header stackHeader={true} rootProps={props} sscreenName={'l'}  /> */}
        
        
          <Header normal={true} rootProps={props} screenName={'Blog Details'} />
        


        <View style={styles.container}>
            <Image style={{ width: wp(95), height:hp(25), borderRadius: 10 }} source={{ uri: generateImageUrl(blogDetails.image) }} resizeMode='stretch' />
            <Text style={{ fontSize: wp(4.6), lineHeight:20, marginTop: 15, marginBottom:10, fontFamily: "Poppins-Medium" }}>{blogDetails.name}</Text>

            <AutoHeightWebView 
            // automaticallyAdjustContentInsets={false} showsVerticalScrollIndicator={false} 
            source={{ html: `<meta name="viewport" content="width=device-width, initial-scale=1"></meta>${blogDetails?.description}` }} 
            style={{ minHeight: hp(25), maxHeight: hp(50), width:wp(95) }} customStyle={`html {
                font-size:14px;
                width:95%;
                margin-top:10px;
                }`}
            />


            {/* <WebView
                ref={(ref) => setWebViewRef(ref)}
                source={{}}
                originWhitelist={['*']}
                onLoad={() => webViewRef.injectJavaScript(Quill.init())}
                onMessage={onWebViewMessage}
            /> */}





        </View>
            </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: "white",
        minHeight: hp(100)
    },
})