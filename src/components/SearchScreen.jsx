import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import Slider from 'react-native-a11y-slider';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../assets/stylecomponents/Style';
import Icon1 from 'react-native-vector-icons/Entypo';
import { getBrandApi } from '../services/brand.service';
import { getNestedCategories } from '../services/Category.service';
import { getCityApi } from '../services/city.service';
import { getAllProducts, searchHomeProduct } from '../services/Product.service';
import { generateImageUrl } from '../services/url.service';
import { errorToast } from '../utils/toastutill';
import { getStates } from '../services/State.service';
import { checkForValidSubscriptionAndReturnBoolean, getAllUsers, getDecodedToken } from '../services/User.service';
import { ROLES_CONSTANT } from '../utils/constants';
// import Header from '../navigation/customheader/Header';
import TypeWriter from 'react-native-typewriter'
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Header from '../navigation/customheader/Header';
import ShopListItem from '../ReusableComponents/ShopListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadMoreButton from '../ReusableComponents/LoadMoreButton';
import CustomColors from '../styles/CustomColors';
import { isAuthorisedContext } from '../navigation/Stack/Root';
import SearchList from '../ReusableComponents/SearchList';
import debounce from 'lodash.debounce'; 

const SearchScreen = (props) => {
    const { Data } = props.route.params
    console.log('Datadata', Data);

    const [isAuthorized] = useContext(isAuthorisedContext);
    const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);

    const [searchQuery, setSearchQuery] = useState(null);

    const navigation = useNavigation();



    const [qry, setQuery] = useState(Data);
    const focused = useIsFocused();

    const [productsArr, setProductsArr] = useState([]);

    console.log('productsArr', productsArr);


    const [brandArr, setBrandArr] = useState([]);


    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(1);
    const [totalPages, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(false);
    const nextPageIdentifierRef = useRef();
    const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);




    const HandleCheckValidSubscription = async () => {
        try {
            let decoded = await getDecodedToken();
            if (decoded) {
                if (decoded?.user?.name) {
                    //  setName(decoded?.user?.name);
                }

                let { data: res } = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
                if (res.data) {
                    console.log(
                        'setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
                        res.data,
                        'setCurrentUserHasActiveSubscription,setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
                    );
                    setCurrentUserHasActiveSubscription(res.data);
                }
            }
        } catch (err) {
            errorToast(err);
        }
    };
    useEffect(() => {
        HandleCheckValidSubscription();
    }, [isAuthorized])
    // const handleGetProducts = async (source) => {

    //     setIsLoading1(true)
    //     try {
    //         let response = await getAllUsers(query, source);
    //         //let { data: res } = await getAllUsers(query,source);
    //         res = response.data
    //         //console.log('AllDataX=>',response)
    //         if (res.data && res?.data?.length > 0) {
    //             Promise.resolve()
    //                 .then(() => {
    //                     // setProductsArr(res?.data);
    //                     setTotal(res?.total);
    //                     setIsLoading1(false)
    //                     if (page > 1 && res?.data?.length > 0) {
    //                         nextPageIdentifierRef.current = page;
    //                         setProductsArr([...productsArr, ...res?.data])

    //                     } else {
    //                         setProductsArr(res?.data)
    //                         setIsLoading1(false)
    //                     }
    //                     setIsLoading(false);
    //                     setIsLoading1(false)
    //                     page == 1 && setIsFirstPageReceived(true);
    //                 })
    //                 .then(() => {

    //                 });
    //         } else {
    //             Promise.resolve()
    //                 .then(() => {
    //                     setProductsArr([]);
    //                     setIsLoading(false)
    //                     setTotal(0);
    //                 })
    //                 .then(() => {
    //                     setIsLoading(false);

    //                 });
    //         }
    //     } catch (error) {
    //         if (axios.isCancel(error)) {
    //             console.log("Axios Error=>Cancelled ", error);
    //         } else {
    //             setIsLoading(false);
    //             errorToast(error);
    //             setIsLoading1(false)
    //         }
    //     }
    // };
    const fetchNextPage = () => {

        console.log("================================end===============================================", nextPageIdentifierRef)
        // if (nextPageIdentifierRef.current == null) {
        //   // End of data.
        //   return;
        // }

        setPage(page + 1)
        // fetchData();
    };

    const [categoryData, setCategoryData] = useState([]);

    const [selected, setSelected] = useState([]);

    const handleSearch = async (query) => {
        setIsLoading(true)

        query = query.trim();
        if (query && query.length > 1) {
            try {
                setIsLoading(true)
                let { data: res } = await searchHomeProduct(query);
                if (res.data) {
                    setProductsArr(res.data);
                    setIsLoading(false)

                }
            } catch (err) {
                console.log(err);
                setIsLoading(false)
            }
        } else {
            setProductsArr([])
            setIsLoading(false)
        }
    };




    useEffect(() => {
       
            handleSearch(Data)
        
    }, []);




    const renderproduct = ({ item, index }) => {

        // if (!isFirstPageReceived && isloding) {
        //   // Show loader at the end of list when fetching next page data.
        // return  <ShimmerPlaceHolder style={{width:wp(45), height:hp(20),marginBottom:10, borderRadius:10,}}    />
        // }
        console.log('vendorItemm', JSON.stringify(item));
        const someShopData = {


            name: item?.companyObj?.name,
            imagePath: require('../../assets/img/logo_1.png'),
            Role: item?.role,

        };



        // if (!isFirstPageReceived && isLoading) {
        //     // Show loader when fetching first page data.

        //     return <ActivityIndicator size={'small'} color={'red'} width={wp(50)} />;
        // }
        return (
            <>

                {

                    <SearchList vendorItem={someShopData} onItemPress={() => { navigation.navigate('Supplier', { data: item }) }} ></SearchList>
                }
            </>
        );
    };
    const debouncedSearch = useCallback(
        debounce((query) => handleSearch(query), 200),
        []
    );

    const handleInputChange = (text) => {
        setQuery(text)
        debouncedSearch(text);
        setIsLoading(true) // Call debounced search function
        setSearchQuery(true);
        if (!text) {
            setSearchQuery(false);
        }

    };














    return (
        <>

            {/* <Header backbtnshowpage /> */}



            <Header normal={true} screenName={'Shop'} rootProps={props} />
            <View style={[styles.padinghr, styles.bgwhite, { flex: 1 }]}>
                <View style={{ paddingBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop: hp(2), }}>

                        <View style={[stylesSearch.mainContainer]}>
                            <View style={stylesSearch.iconContainer}>
                                <Image style={stylesSearch.iconImageStyle} source={require('../../assets/img/ic_search.png')}></Image>
                            </View>
                            <TextInput
                                style={stylesSearch.input}
                                placeholder={'Search with keywords'}
                               value={qry}
                                onChangeText={(e)=>handleInputChange(e)}
                            />
                        </View>
                    </View>

                </View>


                {
                    productsArr && productsArr?.length > 0 ?
                        <FlatList
                            data={productsArr}
                            keyExtractor={(item, index) => `${index}`}

                            renderItem={renderproduct}
                            //onEndReached={fetchNextPage}
                            onEndReachedThreshold={0.1}
                            scrollEnabled={true}
                            style={{ width: '100%' }}
                            contentContainerStyle={[{ paddingVertical: 5, paddingBottom: 5, paddingTop: 5 }]}
                            ListFooterComponent={<View>
                                {
                                    isLoading1 ?
                                        <ActivityIndicator size={'large'} color={CustomColors.mattBrownDark} width={wp(50)} />
                                        : <LoadMoreButton onPress={() => { fetchNextPage() }} />
                                }
                            </View>

                            }
                        />

                        :
                        (
                            isLoading ? null : (
                                (
                                    <View style={{ height: wp(80), backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>No Vendor Found</Text>
                                    </View>
                                )
                            )
                        )
                }
                {
                    isLoading ?
                        <ActivityIndicator size={'large'} color={CustomColors.mattBrownDark} width={wp(50)} />
                        : null
                }

            </View>

        </>

    );
}
const styles1 = StyleSheet.create({
    pricearea: {
        color: '#000',
        textAlign: 'center',
        // marginVertical:10,
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
    },
    textInput: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    sizesqure: {
        color: '#000',
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 12,
        fontFamily: 'Manrope-Regular',
    },
    producthead: {
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
        marginTop: 5,
    },
    imgresponsives: {
        width: wp(40),
        height: wp(25),
        borderRadius: 10,
    },
    imgfluid: {
        width: wp(45),
        height: hp(20),
        borderRadius: 10,
        // marginBottom:10,
    },
    col8: {
        width: wp(80),
        // backgroundColor:'red',
        borderColor: '#DADADA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    imgphone: {
        width: wp(14),
        height: hp(7),
        position: 'absolute',
        top: -10,
        right: -10,
        borderColor: '#fff',
        borderWidth: 5,
        borderRadius: 100,
        zIndex: 5,
    },
    col2: {
        width: wp(10),
        height: wp(10),
        backgroundColor: '#BF9F65',
        borderRadius: wp(9),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    serachborder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 16,
        marginBottom: 10,
        fontFamily: 'Manrope-Medium',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    nameheading: {
        color: '#000000',
        fontFamily: 'Manrope-Medium',
    },
    boxproduct: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        position: 'relative',
        borderRadius: 10,
        width: wp(45),
        marginRight: 20,
        overflow: 'visible',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.41,
        elevation: 2,
    },
    cityboxproduct: {
        backgroundColor: '#fff',
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 10,
        width: wp(30),
        marginRight: 20,
        overflow: 'visible',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.41,
        elevation: 2,
    },
});

const stylesSearch = StyleSheet.create({

    mainContainer: {
        backgroundColor: CustomColors.searchBackground,
        borderRadius: wp(10),
        flexDirection: 'row',
        width: '100%',
        height: wp(12.5),
        padding: wp(0.5),
        borderColor: '#CDC2A1',
        borderWidth: wp(0.3)
    },
    iconContainer: {
        backgroundColor: CustomColors.mattBrownDark,
        width: wp(9),
        height: wp(9),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: wp(10),
    },
    iconImageStyle: {
        width: wp(7),
        height: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,


    }
});

export default SearchScreen;
