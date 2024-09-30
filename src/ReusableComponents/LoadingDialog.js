import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

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
                    <ActivityIndicator size="large" color="#0000ff" />
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    dialog: {
        width: 250,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoadingDialog;
