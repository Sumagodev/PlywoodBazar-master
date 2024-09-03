import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';
import { getReviewForProduct } from '../services/ProductReview.service';
import ReviewsItem from '../ReusableComponents/ReviewsItem';

export default function ReviewsPage(props) {
  const [productReviewArr, setProductReviewArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetProductReview = async id => {
    try {
      let { data: res } = await getReviewForProduct(`userId=${id}`);
      if (res.message) {
        setProductReviewArr(res.data);
      }
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  const renderReviewItem = ({ item }) => (
    <ReviewsItem reviewItem={item}></ReviewsItem>
  );

  useEffect(() => {
    handleGetProductReview(props.route.params.data);
    console.log(props.route.params.data);
  }, []);

  return (
    <>
      <Header normal={true} screenName={'Topups'} rootProps={props} />
      <ImageBackground source={require('../../assets/img/main_bg.jpg')} style={{ flex: 1, overflow: 'hidden' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles1.heading}>All Reviews</Text>
          {loading ? (
            <View style={styles1.loadingContainer}>
              <Text>Loading...</Text>
            </View>
          ) : productReviewArr.length > 0 ? (
            <FlatList
              data={productReviewArr}
              renderItem={renderReviewItem}
              keyExtractor={(item,index) =>`${index}`}
              contentContainerStyle={{ paddingBottom: 50, alignSelf: 'center' }}
            />
          ) : (
            <View style={styles1.emptyContainer}>
              <Text>No Reviews</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </>
  );
}

const styles1 = StyleSheet.create({
  heading: {
    fontSize: wp(6),
    marginVertical: wp(2),
    fontWeight: '800',
    alignSelf: 'center',
  },
  loadingContainer: {
    height: hp(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    height: hp(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_main: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    width: wp(90),
    marginHorizontal: 20,
  },
  nameheading: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
