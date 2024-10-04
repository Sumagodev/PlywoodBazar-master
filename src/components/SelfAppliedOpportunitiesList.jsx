import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../../assets/stylecomponents/Style';
import Header from '../navigation/customheader/Header';
import { deleteById, getAllProducts } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { getDecodedToken } from '../services/User.service';
import { errorToast, toastSuccess } from '../utils/toastutill';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR, WHITE_COLOR } from '../utils/constants';
import ProductItemVertical from '../ReusableComponents/ProductItemVertical';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import { DeleteOpp, GetDealershiplist, GetDealershipOpportunities, MyappliedList } from '../services/Advertisement.service';
import DealershipData from '../ReusableComponents/DealershipData';

export default function SelfAppliedOpportunitiesList(props) {
    const focused = useIsFocused()
    const navigation = useNavigation();

    const [subscriptionArr, setSubscriptionArr] = useState([]);

    console.log('subscriptionArr', subscriptionArr);

    useEffect(() => {
        // handleopportunitydata();
        getSubscriptions()
    }, []);
    const getSubscriptions = async () => {
        try {
            let decodedObj = await getDecodedToken();
            const { data: res } = await MyappliedList(decodedObj?.userId);
            if (res) {
                console.log(JSON.stringify(res.data,), 'raviiii');
                setSubscriptionArr(res.data);
            }
        } catch (error) {
            errorToast(error);
        }
    };

    // const handleopportunitydata = async () => {
    //     let decodedToken = await getDecodedToken();
    //     console.log('decodedToken', decodedToken.userId);

    //     try {


    //         let { data: res } = await GetDealershiplist(decodedToken?.userId);

    //         console.log('userIdd', res);

    //         if (res.data) {
    //             setSubscriptionArr(res.data);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const Editdata = (item) => {
        navigation.navigate("EditdealershipOpp", { data: item })
    }
    const handleDeleteProduct = (id) => {
        try {
            Alert.alert('Alert', 'Do you really want to delete this product.', [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        let { data: res } = await DeleteOpp(id);
                        if (res) {
                            toastSuccess(res.message);
                            getSubscriptions()
                        }
                    }
                },
            ]);
        } catch (error) {
            errorToast(error)
        }
    }



    const renderMyProductItem = ({ item, index }) => {

        console.log('00000000', item);
        console.log('generateImageUrl(item?.image)', generateImageUrl(item?.image));

        const productItem = {
            name: item?.Organisation_name,
            imagePath: item?.image && item?.image !== '' ?{ uri: generateImageUrl(item?.image) }:require('../../assets/img/logo_1.png'),
            state: item?.state?.name,
            Type: item?.Type,
            brand: item?.Brand,
            ProductName: item?.Product,
            Cities: item?.cities,
            Categories: item?.categories,

        }
        return (
            <DealershipData onDeletePress={() => { handleDeleteProduct(item?._id) }} product={productItem} onEditPress={() => Editdata(item)} editable={false}  ></DealershipData>
            // <ProductItemVertical onDeletePress={() => handleDeleteProduct(item?._id)} product={productItem} onEditPress={() => navigation.navigate("EditProduct", { data: item?._id })} ></ProductItemVertical>
        );
    };



    return (
        <View style={styles1.mainContainer}>
            <Header normal={true} rootProps={props} />
            <View style={reviewStyle.container}>
                <Text style={reviewStyle.title}>My Applied Opportunities List</Text>
            </View>

            {
                subscriptionArr ? <FlatList data={subscriptionArr} numColumns={1} renderItem={renderMyProductItem} keyExtractor={(item, index) => index} contentContainerStyle={{ paddingBottom: hp(10) }} />
                    :
                    <View style={{ height: hp(80), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: '#000', marginVertical: 20 }}>No Data Available </Text>

                    </View>

            }

            {/* <TouchableOpacity onPress={() => navigation.navigate('AddProducts')} style={[styles.btnbg, {width: wp(90), marginHorizontal: 20, marginBottom: 15}]}>
        <Text style={styles.textbtn}>Add New Product</Text>
      </TouchableOpacity> */}
        </View>
    );
}
const styles1 = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFF4EC',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },

    flexbetween: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    imgsmall: {
        width: wp(6),
        height: hp(3),
    },
    categry: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Manrope-Medium',
    },
    imgfluid: {
        width: wp(6),
        height: hp(3),
        marginRight: 10,
    },
    card_main: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
        overflow: 'hidden',
        borderRadius: 5,
        // width: wp(90),
        marginHorizontal: 10,
    },
    nameheading: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
    },
    manageContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: wp(95),
    },
});
const reviewStyle = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: wp(5),
        width: wp(85),
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: wp(6),
        fontWeight: 'bold',

    },
    addBtn: {
        borderRadius: 50, borderColor: '#BC9B80',
        borderWidth: wp(1),
        position: 'absolute',
        right: 0
    },
});