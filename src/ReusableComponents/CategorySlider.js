import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { generateImageUrl, url } from '../services/url.service';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const CategorySlider = ({ data }) => {
  const navigate = useNavigation();

  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log('data:item?._id', data);
  const itemWidth = wp(18) + 20; // Item width + horizontal margin

  const scrollOneItem = (direction) => {
    if (scrollViewRef.current) {
      const newScrollPosition = scrollPosition + direction * itemWidth;
      scrollViewRef.current.scrollTo({ x: newScrollPosition, animated: true });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => scrollOneItem(-1)} style={styles.icon}>
        <Image source={require('../../assets/img/chevron_left.png')} size={20} color="black" style={styles.imageStyle} />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={(event) => setScrollPosition(event.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}

      >
        <View style={{ flexDirection: 'row', width: wp(5) }}></View>
        {data.map((item, index) => (
          <Pressable key={index} onPress={() => { navigate.navigate('BottomBar', { screen: 'Vendors', params: { data: item?._id } }) }}>


            <View style={styles.item}>
              <Image source={item?.image && item?.image != "" ? { uri: generateImageUrl(item.image) } : require('../../assets/img/logo_1.png')} style={styles.image} />
              <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail' >{item.name}</Text>
            </View>
          </Pressable>
        ))}
        <View style={{ flexDirection: 'row', width: wp(5) }}></View>
      </ScrollView>

      <TouchableOpacity onPress={() => scrollOneItem(1)} style={styles.iconRight}>
        <Image source={require('../../assets/img/chevron_right.png')} size={24} color="black" style={styles.imageStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  name: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: '#333',
    width: wp(20),
  },
  icon: {
    left: 0,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 1,
    width: wp(10),
    borderRadius: 50,
  },
  iconRight: {
    right: 0,
    position: 'absolute',
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 1,
    borderRadius: 50,
    width: wp(10),
  },
  imageStyle: {
    width: wp(10),
    height: wp(10),
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(22),
    marginLeft: wp(3)
  },
  image: {
    resizeMode: 'cover',
    width: wp(18),
    height: wp(18),
    marginBottom: wp(2),
    elevation: 10,
  },
  elevatedStyle: {
    elevation: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 5,
    width: wp(20),
    height: wp(20),
  }
});

export default CategorySlider;