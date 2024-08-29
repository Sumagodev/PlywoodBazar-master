import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CustomColors from '../styles/CustomColors';
import UpcomingEventItem from './UpcomingEventItem';
import PopularActivityItem from './PopularActivityItem';

export default function EventsOrActivitiesPage(props: any) {
    return (
        <LinearGradient style={styles.rootContainer}
            colors={['white', CustomColors.mattBrownFaint, CustomColors.mattBrownFaint]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <Image style={styles.logoStyle} source={require('./assets/img/logo.png')} />
            <Text style={styles.headingTextStyle}>Activities</Text>
            <Text style={styles.subHeadingTextStyle}>Upcoming Event</Text>
            <View style={{paddingVertical: wp(1), justifyContent: 'center',}}>
                <FlatList
                    data={upcomingEventItemsList}
                    renderItem={({ item }) => (
                        <UpcomingEventItem eventItem={item} />
                    )}
                    horizontal
                />
            </View>
            <Text style={[styles.subHeadingTextStyle, { marginVertical: wp(4), textAlign: 'center' }]}>Popular Activity</Text>
            <FlatList
                data={popularActivityItemsList}
                renderItem={({ item }) => (
                    <PopularActivityItem popularActivityItem={item} />
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        height: '100%',
        width: '100%',
        padding: wp(3),
    },
    logoStyle: {
        paddingVertical: wp(4),
        width: '100%',
        height: wp(15),
    },
    headingTextStyle: {
        marginTop: wp(8),
        fontSize: wp(8),
        fontWeight: 'bold',
        marginBottom: wp(6),
        textAlign: 'center',
    },
    subHeadingTextStyle: {
        fontSize: wp(5),
        fontWeight: 'bold',
        marginBottom: wp(2),
    },
})

const upcomingEventItemsList = [
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        date: '23-02-2024',
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    }
]

const popularActivityItemsList = [
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    },
    {
        imagePath: require('./assets/img/category.png'),
        title: 'Lorem Ipsum',
        description: "Lorem Ipsum has been the industry's standard dummy,Lorem Ipsum has been the industry's standard dummy",
    }
]