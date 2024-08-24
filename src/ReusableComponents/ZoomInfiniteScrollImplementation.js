import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BlogsItem from './BlogsItem';

const ZoomInfiniteScrollImplementation = ({ data }) => {
    const renderItem = ({ item }) => (
        <BlogsItem blog={item} />
    );

    return (
        <Carousel
            data={data}            
            renderItem={renderItem}
            sliderWidth={wp(100)}
            itemWidth={wp(45)}
            loop={true}
            autoplay={true}
            autoplayDelay={1000}
            autoplayInterval={3000}
            layout={'default'}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={1}
        />
    );
};

export default ZoomInfiniteScrollImplementation;