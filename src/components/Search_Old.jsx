import { View, Text, StyleSheet, Pressable, FlatList,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Header from '../navigation/customheader/Header';
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { searchProduct } from '../services/Product.service';
import { getDecodedToken, searchVendorFromDb } from '../services/User.service';
import { errorToast } from '../utils/toastutill';

export default function Search(props) {
    const navigation = useNavigation()
    const focused = useIsFocused();

    const [productArr, setProductArr] = useState([]);
    const [searchVendor, setSearchVendor] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchFromDb = async (value) => {
        try {
            const decodedToken = await getDecodedToken();
            let role = "";
            if(decodedToken){
                role  = decodedToken.role
            }
                setSearchQuery(value)
            if (value != "" && value?.length > 1) {
                const { data: res } = await searchVendorFromDb(`search=${value}&role=${role}`);
                if (res && res.data?.length > 0) {
                    setProductArr(res.data);
                } else {
                    setProductArr([]);

                }
            }
        } catch (error) {
            errorToast(error);
        }
    };


    const handleRedirect = (obj) => {
        navigation.navigate("Supplier", { data: obj })
    }


    useEffect(() => {
     if(focused){
        setProductArr([])
        setSearchQuery("")
     }
    }, [focused])
    

    const renderSearchItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => handleRedirect(item)} style={{ paddingVertical: 10, borderBottomColor: "rgba(0,0,0,0.2)", borderBottomWidth: 1 }}>
                <Text style={{color:'#000'}}>{item?.companyObj?.name ? item?.companyObj?.name : item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            {/* <Header normal={"normal"} /> */}

            <Header stackHeader={true} screenName={'Search product'} rootProps={props} />



            <View style={styles.container}>

                <View style={[styles.flexRow, { marginTop: 25 }]}>

                    {/* <Pressable style={styles.flexRow} onPress={() => { setSearchVendor(false); setProductArr([]); setSearchQuery("") }}>
                        <View style={[styles.radioOuter, searchVendor == false ? { borderColor: "#E7B84E", backgroundColor: "#E7B84E" } : { borderColor: "rgba(0,0,0,0.2)", backgroundColor: "white" }]}>
                            <View style={styles.radioInner}></View>
                        </View>
                        <Text>Search By Product</Text>
                    </Pressable> */}
                </View>

                <View style={styles.SearchContainer}>
                    <TextInput placeholder='Search Product & Shop'  value={searchQuery} onChangeText={(value) => handleSearchFromDb(value)} style={{ flex: 1 , height:hp(6), color:'#000', fontSize:wp(5)}} />
                    <AntDesign name="search1" size={20} />
                </View>

             
             {
                productArr.length > 0 && searchQuery !== "" ?  <FlatList
                contentContainerStyle={styles.listContainer}
                data={productArr}
                keyExtractor={(item, index) => index}
                renderItem={renderSearchItem}
            />

            :
             searchQuery !== "" && 
            <View style={{alignSelf:'center',height:hp(30), backgroundColor:'#fff', display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                <Text style={{fontSize:wp(5), fontFamily:'Poppins-Regular'}}>No Product Found</Text>
            </View>
             }
               


            </View>
        </>
    )
}
const styles = StyleSheet.create({

    imgsmall: {
        width: wp(6),
        height: hp(3),
      },


    container: {
        paddingHorizontal: wp(5),
        backgroundColor: "white",
        display: "flex",
        flex: 1
    },


    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    radioOuter: {
        position: "relative",
        marginRight: 5,
        borderWidth: 2,
        height: 26,
        width: 26,
        borderRadius: 20,

    },
    radioInner: {
        position: "absolute",
        top: 6,
        left: 6,
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 1,
    },
    listContainer: {
        backgroundColor: "white",
        marginVertical: 20,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10
    },
    SearchContainer: {
        width: wp(90),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: hp(0.1)
    },
})