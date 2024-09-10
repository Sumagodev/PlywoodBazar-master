import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Text, Image, Pressable ,TouchableOpacity} from 'react-native';
import CustomButton from './CustomButton';
import { generateImageUrl } from '../services/url.service';
import { useNavigation } from '@react-navigation/native';
const BlogsItem = ({ item }) => {
    const navigate=useNavigation();
    return (
        <View >
            <TouchableOpacity style={styles.container} onPress={()=>{navigate.navigate('BlogDetails', {data: item._id})}}>
                <Image source={{uri: generateImageUrl(item.image)}} style={styles.imageStyle}/>
                <Text style={styles.titleStyle} numberOfLines={2} ellipsizeMode="tail">{item?.name}</Text>
                {/* <Text style={styles.descriptionStyle}>{item.description}</Text> */}
                <View style={styles.btnStyle}>
                <CustomButton
                    onPress={() => {navigate.navigate('BlogDetails', {data: item._id})}} 
                    text="Read more" 
                    textSize={wp(2.5)}
                    fontWeight='bold'
                    buttonBgColor='#624832'
                />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: wp(45),
        height: wp(50),
        borderRadius: 15,
        marginHorizontal:wp(1),
        elevation: 4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    imageStyle:{
        width: "95%",
        height: "50%",
        marginTop: wp(1),
        alignSelf: 'center',
        borderRadius: 12,
    },
    titleStyle:{
        paddingStart: wp(2),
        color: '#624832',
        fontWeight: 'bold',
        fontSize: wp(4),
    },
    descriptionStyle:{
        paddingStart: wp(2),
        marginBottom: wp(2),
        fontSize: wp(3),
    },
    btnStyle:{
        position: 'absolute',
        bottom: wp(1),
        margin: wp(1)
    }
});

export default BlogsItem;


// import React,{useState,useEffect,useContext} from 'react';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
// import CustomButton from './CustomButton';
// import { generateImageUrl } from '../services/url.service';
// import { useNavigation } from '@react-navigation/native';
// import { checkForValidSubscriptionAndReturnBoolean, getDecodedToken, getUserById, getUserUserById } from '../services/User.service';
// import { isAuthorisedContext } from '../navigation/Stack/Root';
// import { errorToast, toastSuccess } from '../utils/toastutill';
// const BlogsItem = ({ item }) => {
//     const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
//     const [isAuthorized] = useContext(isAuthorisedContext);

//     useEffect(() => {
//         HandleCheckValidSubscription();
//       }, [isAuthorized])
    
//       const HandleCheckValidSubscription = async () => {
//         try {
//           let decoded = await getDecodedToken();
//           if (decoded) {
//             if (decoded?.user?.name) {
//               setName(decoded?.user?.name);
//             }
    
//             let { data: res } = await checkForValidSubscriptionAndReturnBoolean(decoded?.userId);
//             if (res.data) {
//               console.log(
//                 'setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
//                 res.data,
//                 'setCurrentUserHasActiveSubscription,setCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscriptionsetCurrentUserHasActiveSubscription',
//               );
//               setCurrentUserHasActiveSubscription(res.data);
//             }
//           }
//         } catch (err) {
//           errorToast(err);
//         }
//       };
//     const GotoImage = () => {
//         if (isAuthorized) {
//           if (!currentUserHasActiveSubscription) {
//             errorToast('You do not have a valid subscription to perform this action');
//             navigate.navigate('Subscriptions', { register: false })
//             return 0;
//           }
       
//           navigate.navigate('BlogDetails', {data: item._id})
    
//         }
//         else {
//           navigate.navigate('Login')
//         }
//       }
//     const navigate=useNavigation();
//     return (
//         <Pressable onPress={()=>{}}>
//             <View style={styles.container} >
//                 <Image source={{uri: generateImageUrl(item.image)}} style={styles.imageStyle}/>
//                 <Text style={styles.titleStyle} numberOfLines={2} ellipsizeMode="tail">{item?.name}</Text>
//                 {/* <Text style={styles.descriptionStyle}>{item.description}</Text> */}
//                 <View style={styles.btnStyle}>
//                 <CustomButton
//                     onPress={() => {GotoImage()}} 
//                     text="Read more" 
//                     textSize={wp(2.5)}
//                     fontWeight='bold'
//                     buttonBgColor='#624832'
//                 />
//                 </View>
//             </View>
//         </Pressable>
//     );
// };

// const styles = StyleSheet.create({
//     container:{
//         width: wp(45),
//         height: wp(50),
//         borderRadius: 15,
//         marginHorizontal:wp(1),
//         elevation: 5,
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         backgroundColor: '#FFFFFF',
//         overflow: 'hidden',
//     },
//     imageStyle:{
//         width: "95%",
//         height: "50%",
//         marginTop: wp(1),
//         alignSelf: 'center',
//         borderRadius: 12,
//     },
//     titleStyle:{
//         paddingStart: wp(2),
//         color: '#624832',
//         fontWeight: 'bold',
//         fontSize: wp(4),
//     },
//     descriptionStyle:{
//         paddingStart: wp(2),
//         marginBottom: wp(2),
//         fontSize: wp(3),
//     },
//     btnStyle:{
//         position: 'absolute',
//         bottom: wp(1),
//         margin: wp(1)
//     }
// });

// export default BlogsItem;