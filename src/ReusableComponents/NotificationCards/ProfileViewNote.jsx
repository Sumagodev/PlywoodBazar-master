import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomColors from '../../styles/CustomColors';
const ProfileViewNote = ({ content, name, date }) => {
    return (
        <View style={styles.container }>
            <View style={{ height: '100%', width: '25%', backgroundColor: 'yellow', alignItems: "center", justifyContent: 'center' }}>
                <Image source={require('../../../assets/img/cover.png')} style={{ width: "75%", height: '90%', borderRadius: 50 }} />

            </View>
            <View style={{ marginHorizontal: wp(4), width: '75%', }}>
                <Text><Text style={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Text> View your profile.</Text>
                <Text> {date}H</Text>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container:
        { flex: 1, backgroundColor: CustomColors.mattBrownFaint, alignItems: 'center', flexDirection: 'row', height: wp(20), marginBottom: wp(0.5) }


}
)
export default ProfileViewNote