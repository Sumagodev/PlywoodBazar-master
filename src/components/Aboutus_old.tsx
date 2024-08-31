import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';
export default function Aboutus(props: any) {
    return (
        <>
            <Header stackHeader={true} screenName={'About Us'} rootProps={props} />
            <ScrollView style={[internalcss.bgwhite,]}>

            <View style={{marginTop:15}}>

                <Text style={internalcss.heading}>About Us</Text>
                <Text style={internalcss.content}>Plywoodbazar. com is India's largest online B2B market place brought a platform to interact with Manufacturers, Distributors ,Dealers, Wholesalers and Retailers of Furniture, Plywood, Hardware & Interior- Exterior Industries.

                </Text>

                <Text style={internalcss.heading}>Company Mission</Text>
                <Text style={internalcss.content}>Plywood Bazar.com is a startup that is working to improve this unorganized furniture , interior and exterior industry by co-ordinate in between them. Providing large potential market exposure for business expansion.

                </Text>
                <Text style={internalcss.heading}>Company Vision</Text>


                <Text style={internalcss.content}>Plywood Bazar.com is a startup that is working to improve this unorganized furniture , interior and exterior industry by co-ordinate in between them. Providing large potential market exposure for business expansion.
                </Text>
                <Text style={internalcss.content}>In this final chapter of our B2B website saga, we celebrate the power of collaboration and the pursuit of excellence. We believe that true success is not achieved in isolation but through the collective efforts of a united ecosystem.
                </Text>
                <Text style={internalcss.content}>In this chapter, we invite our partners to join us in a journey towards achieving excellence. Together, we set high standards, challenge mediocrity, andstrive for continuous improvement. We foster a culture of excellence that permeates every aspect of our businesses, from product development and service delivery to customer satisfaction and beyond.
                </Text>
                <Text style={internalcss.content}>
                    In this chapter, we also emphasize the importance of collaboration and synergy. We believe that the collective intelligence and diverse perspectives of our partners are the key drivers of innovation and success. By fostering a collaborative environment, we encourage the exchange of ideas, cross pollination of expertise, and the co- creation of solutions that surpass individual capabilities.

                </Text>
                <Text style={internalcss.content}>As we strive for excellence, we also recognize the significance of recognizing and celebrating achievements. We acknowledge the hard work, dedication, and milestones reached by our partners, and we take pride in their accomplishments. Through recognition programs, awards, and shared success stories, we inspire and motivate each other to reach new heights.
                </Text>
                <Text style={internalcss.content}>in this final chapter of our saga, we invite you to join us in the pursuit of excellence. Together, let's push the boundaries, exceed expectations, andcreate a legacy of remarkable achievements. Through our collective commitment to excellence and our unwavering support for one another, we will forge a future where success knows no bounds.
                </Text>
                <Text style={internalcss.content}></Text>


            </View>


            </ScrollView>
        </>

    )
}
const internalcss = StyleSheet.create({
    heading: {
        fontSize: wp(5),
        fontFamily: 'Poppins-Medium'
    },
    content: {
        fontSize: wp(3.2),
        fontFamily: 'Poppins-Regular',
        color: '#797979',
        marginBottom: 5
    },
    bgwhite: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10
    },

})