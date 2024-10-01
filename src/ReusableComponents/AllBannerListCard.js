import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity, ScrollView, Dimensions, Modal } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from "../styles/CustomColors";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import CustomButtonNew from "./CustomButtonNew";
import { formatDate } from "../utils/formatDate";

// const citiess = [
//     'New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Toronto',
//     'Berlin', 'Madrid', 'Rome', 'Mumbai', 'Shanghai', 'Los Angeles',
//     'Moscow', 'Dubai', 'Seoul', 'Singapore', 'Hong Kong', 'Bangkok',
// ];
const { width, height } = Dimensions.get('window');
const AllBannerListCard = ({ onEditPress, product, onDeletePress, editable }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cities, setcities] = useState([])
    const [Categories, setCategories] = useState([])
    const [type, setType] = useState(null);
    console.log('citiess', Categories);

    console.log('upppp', modalVisible);


    return (

        <View style={styles.container} >
            <View style={{
                backgroundColor: 'black', width: '100%', height: wp(40), borderRadius: wp(5),
            }}>
                <Image style={styles.imageStyle} source={product.imagePath} />
            </View>
            <View style={{ width: '90%', alignItems: 'center', height: '100%', marginVertical: wp(2), marginHorizontal: wp(3) }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={[styles.headStyle, { fontSize: wp(4.5), color: '#cc8d19', width: '100%' }]} numberOfLines={1} ellipsizeMode="tail">{product.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%',justifyContent:'center', alignItems:"center" }}>
                    <Text style={[styles.headStyle, { width: '25%' }]}>Type:</Text>
                    <Text style={{ fontWeight: "400", width: '70%' }}>{product.Type}</Text>
                </View>
                {product.ProductName? <View style={{ flexDirection: 'row', width: '100%',justifyContent:'center', alignItems:"center"}}>
                <Text style={[styles.headStyle, { width: '25%' }]}>Product:</Text>
                <Text style={{ fontWeight: "400", width: '70%', paddingRight: wp(4) }} numberOfLines={1} ellipsizeMode="tail">{product.ProductName}</Text>
            </View>:null}
               
                <View style={{ flexDirection: 'row', width: '100%',justifyContent:'center', alignItems:"center"}}>
                    <Text style={[styles.headStyle, { width: '25%' }]}>Created At:</Text>
                    <Text style={{ fontWeight: "400", width: '70%', paddingRight: wp(4) }} numberOfLines={1} ellipsizeMode="tail">{formatDate(product.createdAt)}</Text>
                </View>
               {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={[styles.headStyle, { width: '25%' }]}>State:</Text>
                    <Text style={{ fontWeight: "400", width: '70%' }} numberOfLines={1} ellipsizeMode="tail">{product.state}</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignSelf: 'center' }} onPress={() => { setModalVisible(true), setCategories(product.Categories), setType('Categories') }}>
                    <Text style={[styles.headStyle, { width: '40%', color: '#cc8d19', fontSize: wp(4) }]} >View Categories</Text>
                    <View style={{ alignContent: 'center', justifyContent: 'center', }}>
                        <FontAwesomeIcon name="eye" size={wp(5.4)} color='#000' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', width: '100%', }} onPress={() => { setModalVisible(true), setcities(product.Cities), setType('Cities') }}>
                    <Text style={[styles.headStyle, { width: '40%', color: '#cc8d19', fontSize: wp(4) }]}>View Cities</Text>

                    <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', }}>
                        <FontAwesomeIcon name="eye" size={wp(5.4)} color='#000' />
                    </View>
                </TouchableOpacity>
                */}
                {
                    editable ? <View style={{ flexDirection: 'row',  alignItems: "center", position:'absolute',justifyContent:'flex-end',alignSelf:'flex-end',right:wp(-3),top:wp(1)}}>
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
                            <Text style={styles.modalTitle}>
                                {type === 'Cities' ? 'Cities' : 'Categories'}
                            </Text>

                            {/* ScrollView for rendering cities or categories */}
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                {/* Conditional rendering based on the type */}
                                {type === 'Cities' ? (
                                    cities.length > 0 ? (
                                        cities.map((city, index) => (
                                            city ? ( // Check if the city object exists
                                                <TouchableOpacity key={index} style={styles.cityItem}>
                                                    <Text style={styles.cityText}>{city.name}</Text>
                                                </TouchableOpacity>
                                            ) : null // Handle null or undefined city cases
                                        ))
                                    ) : (
                                        <Text style={[styles.modalTitle, { fontWeight: '400', fontSize: 18 }]}>No city available</Text>
                                    )
                                ) : (
                                    Categories?.length > 0 ? (
                                        Categories.map((category, index) => (
                                            category ? ( // Check if the category object exists
                                                <TouchableOpacity key={index} style={styles.cityItem}>
                                                    <Text style={styles.cityText}>{category.name}</Text>
                                                </TouchableOpacity>
                                            ) : null // Handle null or undefined category cases
                                        ))
                                    ) : (
                                        <Text style={[styles.modalTitle, { fontWeight: '400', fontSize: 18 }]}>No categories available</Text>
                                    )
                                )}
                            </ScrollView>

                            {/* Button to close Modal */}
                            <CustomButtonNew
                                text={'Close'}
                                paddingHorizontal={wp(10)}
                                onPress={() => { setModalVisible(false), setType(null) }}
                                alignSelf={'center'}
                            />
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
        height: wp(70),
        elevation: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: wp(5),
        // flexDirection: 'row',
        overflow: 'hidden'
    },
    imageStyle: {

        width: '100%',
        height: '100%',
        borderTopRightRadius: wp(5),
        borderTopLeftRadius: wp(5),
        resizeMode: "contain"

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

export default AllBannerListCard