import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const CategorySlider = ({ data }) => {
  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  
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
        {data.map((item, index) => (
        <Pressable key={index} onPress={() => console.log(index)}>
          <View style={styles.item}>
            <View style={styles.elevatedStyle}>
              <Image source={item.imagePath} style={styles.image} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </Pressable>
        ))}
      </ScrollView>
      
      <TouchableOpacity onPress={() => scrollOneItem(1)} style={styles.icon}>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    paddingHorizontal: 1,
    width: wp(10),
  },
  imageStyle: {
    width: wp(10),
    height: wp(10),
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: wp(18) / 2,
  },
  image: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(18) / 2,
    marginBottom: wp(2),
    elevation: 10,
    backgroundColor: '#fff',
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