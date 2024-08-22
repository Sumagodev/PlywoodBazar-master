import React, { useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const CategorySlider = ({ data }) => {
  const scrollViewRef = useRef();

  const scrollToStart = () => {
    scrollViewRef.current.scrollTo({ x: 0, animated: true });
  };

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={scrollToStart} style={styles.icon}>
        <Image source={require('../../assets/img/chevron_left.png')} size={24} color="black" style={styles.imageStyle} />
      </TouchableOpacity>
      
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((item, index) => (
        <Pressable onPress={
            ()=>{

            }
        }>
          <View key={index} style={styles.item}>
            <Image source={item.imagePath} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </Pressable>
        ))}
      </ScrollView>
      
      <TouchableOpacity onPress={scrollToEnd} style={styles.icon}>
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
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 10, 
  },
  image: {
    width: wp(18),
    height: wp(18),
    borderRadius: 50,
    marginBottom: wp(2),
    elevation: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    paddingHorizontal: 10,
    height: wp(5),
    width: wp(5),
  },
  imageStyle: {
    width: wp(5),
    height: wp(5),
  },
});

export default CategorySlider;