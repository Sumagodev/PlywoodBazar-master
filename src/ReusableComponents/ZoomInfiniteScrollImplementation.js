import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BlogsItem from './BlogsItem';

const { width: screenWidth } = Dimensions.get('window');

const ZoomInfiniteScrollImplementation = ({ data }) => {
    const renderItem = ({ item }) => (
        <BlogsItem blog={item} />
    );

    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth/2.1}
            loop={true}
            autoplay={true}
            autoplayDelay={1000}
            autoplayInterval={3000}
            layout={'default'}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={1}
        />
    );
};

export default ZoomInfiniteScrollImplementation;