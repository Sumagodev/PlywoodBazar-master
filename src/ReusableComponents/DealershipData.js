import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity, ScrollView, Dimensions, Modal } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from "../styles/CustomColors";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import CustomButtonNew from "./CustomButtonNew";
// const citiess = [
//     'New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Toronto',
//     'Berlin', 'Madrid', 'Rome', 'Mumbai', 'Shanghai', 'Los Angeles',
//     'Moscow', 'Dubai', 'Seoul', 'Singapore', 'Hong Kong', 'Bangkok',
// ];
const { width, height } = Dimensions.get('window');
const DealershipData = ({ onEditPress, product, onDeletePress, editable }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cities, setcities] = useState([])
    console.log('citiess', cities);

    console.log('upppp', modalVisible);


    return (

        <View style={styles.container} >
            <View style={{
                backgroundColor: 'black', width: '45%', height: '100%', borderRadius: wp(5),
            }}>
                <Image style={styles.imageStyle} source={product.imagePath} />
            </View>
            <View style={{ width: '55%', alignItems: 'flex-start', height: '100%', marginVertical: wp(2) }}>
                <View style={{ flexDirection: 'row', width: '100%', }}>
                    <Text style={[styles.headStyle, { fontSize: wp(4.5), color: '#cc8d19', width: '100%', textAlign: "left" }]} numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={[styles.headStyle, { width: '30%' }]}>Type:</Text>
                    <Text style={{ fontWeight: "400", width: '70%' }}>{product.Type}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={[styles.headStyle, { width: '30%' }]}>Brand:</Text>
                    <Text style={{ fontWeight: "400", width: '70%' }}>{product.brand}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={[styles.headStyle, { width: '30%' }]}>State:</Text>
                    <Text style={{ fontWeight: "400", width: '70%' }} numberOfLines={2} ellipsizeMode="tail">{product.state}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={[styles.headStyle, { width: '30%' }]}>Product:</Text>
                    <Text style={{ fontWeight: "400", width: '70%' }} numberOfLines={1} ellipsizeMode="tail">{product.ProductName}</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', width: '80%' }} onPress={() => { setModalVisible(true), setcities(product.Cities) }}>
                    <Text style={[styles.headStyle, { width: '70%', color: '#cc8d19', fontSize: wp(4) }]}>View Cities</Text>
                    
                    <View style={{ alignContent: 'center', justifyContent: 'center',right:wp(5) }}>
                        <FontAwesomeIcon name="eye" size={wp(5.4)} color='#000' />
                    </View>


                </TouchableOpacity>
                {
                    editable ? <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: "flex-end", right: wp(2), alignSelf: 'flex-end', alignItems: "flex-end" }}>

                        <TouchableOpacity style={{ marginHorizontal: 10, width: wp(8), height: wp(8), alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#cc8d19', marginVertical: 2 }} onPress={onDeletePress}>
                            <FontAwesomeIcon name="trash-o" size={wp(4)} color='#fff' />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 1, width: wp(8), height: wp(8), alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#cc8d19' }} onPress={onEditPress}>
                            <FontAwesomeIcon name="edit" size={wp(4)} color='#fff' />
                        </TouchableOpacity>
                    </View> : null}
            </View>

            <View style={styles.container1}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}> Cities</Text>

                            {/* ScrollView for rendering cities */}
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                {cities.map((city, index) => (
                                    <TouchableOpacity key={index} style={styles.cityItem}>
                                        <Text style={styles.cityText}>{city.cityName}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Button to close Modal */}
                            <CustomButtonNew text={'close'} paddingHorizontal={wp(10)} onPress={() => setModalVisible(false)} alignSelf={'center'}></CustomButtonNew>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        margin: wp(2),
        width: wp(90),
        height: wp(45),
        elevation: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: wp(5),
        flexDirection: 'row',
        overflow: 'hidden'
    },
    imageStyle: {

        width: '100%',
        height: '55%',
        borderTopRightRadius: wp(5),
        borderTopLeftRadius: wp(5),

    },
    table: {
        marginHorizontal: wp(2),
        width: '100%'
    },
    headStyle: {
        color: '#000',
        textAlign: 'left',
        fontSize: wp(3.6),
        fontWeight: 'bold',
        // marginVertical: wp(.5),
        marginStart: wp(2),
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: wp(0.3),
    },
    nameStyle: {
        color: CustomColors.mattBrownDark,
        fontSize: wp(3.5),
        fontWeight: 'bold',
    },
    keyTextStyle: {
        color: 'black',
        flex: 1,
    },
    valueTextStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp(3.5),
        flex: 1,
        paddingRight: wp(4),
    },
    valueTextStyleLight: {
        color: 'gray',
        fontSize: wp(3.5),
        flex: 1,
        paddingRight: wp(4),
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)', // Semi-transparent background
    },
    modalContainer: {
        width: width * 0.8,
        height: height * 0.6,
        backgroundColor: CustomColors.mattBrownFaint,
        borderRadius: wp(10),
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    scrollViewContent: {
        paddingBottom: wp(0),
    },
    cityItem: {
        backgroundColor: '#ffffff',
        paddingVertical: wp(3),
        paddingHorizontal: wp(4),
        borderRadius: wp(8),
        margin: wp(2),
        elevation: 2,
        width: '90%'
    },
    cityText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: CustomColors.mattBrownDark,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
})

export default DealershipData