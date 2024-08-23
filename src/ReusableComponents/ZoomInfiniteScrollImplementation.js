import React, { useRef, useEffect } from 'react';
import { View, FlatList, Animated, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BlogsItem from './BlogsItem';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const ZoomInfiniteScrollImplementation = ({ data, infinite = true, delay = 3000 }) => {
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    let scrollIndex = 0;

    useEffect(() => {
        if (infinite && data.length > 1) {
            const intervalId = setInterval(() => {
                scrollIndex += 1;
                if (scrollIndex >= data.length) {
                    scrollIndex = 0;
                }
                flatListRef.current.scrollToIndex({ animated: true, index: scrollIndex });
            }, delay);
            return () => clearInterval(intervalId);
        }
    }, [infinite, delay, data.length]);

    return (
        <View style={{ width: wp(100), margin: wp(2) }}>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{marginVertical: wp(2), marginHorizontal: wp(5)}}>
                        <BlogsItem blog={item}  onButtonPress={()=>{ console.log(item) }}   onCardPress={()=>{}}/>
                    </View>
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />
        </View>
    );
};

export default ZoomInfiniteScrollImplementation;