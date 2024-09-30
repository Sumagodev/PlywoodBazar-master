import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import CustomColors from '../styles/CustomColors';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Image } from '@rneui/base';

const LoadingDialog = ({ visible, message }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <Image source={require('../../assets/img/logo_1.png')} style={styles.logo}></Image>
                    <ActivityIndicator size="small" color={CustomColors.mattBrownDark}  style={{marginTop:widthPercentageToDP(5)}}/>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

LoadingDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    message: PropTypes.string,
};

LoadingDialog.defaultProps = {
    message: 'Loading...',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    },
    dialog: {
        paddingHorizontal: widthPercentageToDP(10),
        paddingVertical:widthPercentageToDP(5),
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: widthPercentageToDP(2),
        textAlign: 'center',
    },
    logo:{
        resizeMode:'center',
        width:widthPercentageToDP(15),
        height:widthPercentageToDP(15)
    }
});

export default LoadingDialog;
