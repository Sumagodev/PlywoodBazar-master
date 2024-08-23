import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text,  TouchableOpacity } from 'react-native';
import CustomTextInputField from './CustomTextInputField';

const TellUsYourRequirementForm = ()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>TELL US YOUR REQUIREMENT</Text>
            <View style={styles.textFieldContainer}>
                <View style={{height:wp(1)}} />
                <CustomTextInputField placeholder='Name*' /><View style={{height:wp(1)}} />
                <CustomTextInputField placeholder='Mobile Number*' /><View style={{height:wp(1)}} />
                <CustomTextInputField placeholder='Address*' /><View style={{height:wp(1)}} />
                <CustomTextInputField placeholder='Product/Service*' /><View style={{height:wp(1)}} />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{}}>
                    <Text style={{color: 'white', paddingVertical: wp(4), fontSize: wp(4), fontWeight: 'bold', width: '100%', textAlign:'center'}}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        backgroundColor: '#f4eddb',
        borderRadius: 25,
        width: wp(70),
        height: wp(85),
        alignItems: 'center',
        overflow: 'hidden',
    },
    textStyle: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: wp(4),
        marginTop: wp(8),
        marginBottom: wp(3),
    },
    textFieldContainer: {
        width: '85%',
    },
    btnContainer:{
        position: 'absolute',
        backgroundColor: '#6c4f37',
        bottom: 0,
        width: '100%',
        justifyContent: 'center'
    }
})

export default TellUsYourRequirementForm