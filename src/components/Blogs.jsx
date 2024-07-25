import {View, Text, StyleSheet, Pressable, ScrollView, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getBlogApi} from '../services/Blog.service';
import {getBlogVideoApi} from '../services/BlogVideo.service';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import { WebView } from 'react-native-webview';
import {generateImageUrl} from '../services/url.service';
import Header from '../ReusableComponents/Header';
import {useNavigation} from '@react-navigation/native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Blogs() {
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogsArr, setBlogsArr] = useState([]);
  const [blogVideoArr, setBlogVideoArr] = useState([]);

  const navigate = useNavigation();
  const handleGetBlogs = async () => {
    try {
      let {data: res} = await getBlogApi();
      if (res.data) {
        console.log(res.data, 'res.data');
        setBlogsArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetBlogVideo = async () => {
    try {
      let {data: res} = await getBlogVideoApi();
      if (res.data) {
        setBlogVideoArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetBlogs();
    handleGetBlogVideo();
  }, []);

  const renderBlogs = ({item, index}) => {
    return (
      <View style={{borderColor: 'rgba(0,0,0,0.2)', marginRight: 10, borderWidth: 1, borderRadius: 10, marginBottom: 10}}>
        <Image source={{uri: generateImageUrl(item.image)}} style={{height: 150, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10}} resizeMode='stretch' />
        <View style={{paddingHorizontal: 10}}>
          <Text style={{marginTop: 10}}>{item?.name}</Text>
          <Pressable onPress={() => navigate.navigate('BlogDetails', {data: item._id})}>
            <Text style={{color: '#DDC99B', marginTop: 10, marginBottom: 10}}>Read More</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderVideo = ({item, index}) => {
    return (
      <View >
        <View style={{width: wp(95), marginBottom:20}}>
          <YoutubePlayer height={200} play={false} videoId={item.url?.split('embed/')[1]} style={{resizeMode: 'cover', borderRadius: 20}} />

          <Text style={{marginTop: -2, color: '#b08218', fontSize: 12, textAlign: 'center'}}>{item?.name}</Text>
        </View>
        {/* <AutoHeightWebView source={{ uri: item.url }} style={{ height: 250, width: "100%" }} /> */}
      </View>
    );
  };
  return (
    <ScrollView contentContainerStyle={[styles.container, {paddingBottom: 100}]}>
      <Header />
      <View style={styles.flexRow}>
        <Pressable onPress={() => setShowBlogs(true)} style={[styles.btn, showBlogs ? styles.active : styles.inActive]}>
          <Text style={[showBlogs ? styles.active : styles.inActive]}>Blogs</Text>
        </Pressable>
        <Pressable onPress={() => setShowBlogs(false)} style={[styles.btn, showBlogs == false ? styles.active : styles.inActive]}>
          <Text style={[showBlogs == false ? styles.active : styles.inActive]}>Videos</Text>
        </Pressable>
      </View>
      {showBlogs ? <FlatList renderItem={renderBlogs} data={blogsArr}  scrollEnabled={false} keyExtractor={(item, index) => `${index}`} /> : <FlatList renderItem={renderVideo} data={blogVideoArr} scrollEnabled={false} keyExtractor={(item, index) => `${index}`} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
    backgroundColor: 'white',
    minHeight: hp(100),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap:10,
  },
  btn: {
    // width: wp(45),
    flex:1,
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  active: {
    backgroundColor: '#DDC99B',
    color: 'white',
  },
  inActive: {
    backgroundColor: '#ededed',
    color: 'black',
  },
});
