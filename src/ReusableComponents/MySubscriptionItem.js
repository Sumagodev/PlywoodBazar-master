import CustomButton from "./CustomButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FadeRibbonText from "./FadeRibbon";

const { StyleSheet, View, Text } = require("react-native")

const MySubscriptionItem = ({ subscriptionItem,onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FadeRibbonText paddingHorizontal={wp(20)} text={subscriptionItem.name} fontSize={wp(5)} fontWeight={800}colorStart='#926139' colorEnd="#e1cebd" />

                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.textKeyStyle}>DESCRIPTION:</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.textValueStyle}>{subscriptionItem.description}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.textKeyStyle}>PRICE:</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.textValueStyle}>₹ {subscriptionItem.price}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.textKeyStyle}>START DATE:</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.textValueStyle}>{subscriptionItem.startDate}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.textKeyStyle}>END DATE:</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.textValueStyle}>{subscriptionItem.endDate}</Text>
                        </View>
                    </View>
                </View>

                <Text style={[styles.textKeyStyle, { textAlign: 'center', marginTop: wp(1) }]}>NO. OF ADVERTISEMENT</Text>
                <Text style={[styles.textValueStyle, { textAlign: 'center' }]}>{subscriptionItem.numberOfAdvertisement} FOR {subscriptionItem.daysOfAdvertisement}</Text>
                <Text style={[styles.textKeyStyle, { textAlign: 'center' }]}>NO. OF SALES</Text>
                <Text style={[styles.textValueStyle, { textAlign: 'center' }]}>{subscriptionItem.numberOfSale} FOR {subscriptionItem.daysOfSale}</Text>

                <View style={{marginVertical: wp(2)}}>
                    {/* <FadeRibbonText fontWeight={100} paddingHorizontal={wp(10)} text={'Purchased on: ' + subscriptionItem.purchaseDate} fontSize={wp(4)} textColor="black" colorStart="#f8e0cd" colorEnd="#FFF" /> */}
                </View>
            </View>
            <View style={styles.buttonStyle}>
                <CustomButton
                    paddingHorizontal={wp(8)}
                    paddingVertical={wp(3)}
                    text='Send Email'
                    onPress={onPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:wp(5),
        width: wp(80),
    },
    mainContainer: {
        paddingTop: wp(3),
        borderRadius: 25,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: wp(2),
        paddingBottom: wp(7),
    },
    buttonStyle: {
        position: 'absolute',
        bottom: wp(-6),
        alignSelf: 'center'
    },
    textKeyStyle: {
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    textValueStyle: {
        fontSize: wp(4),
        fontWeight: 100,
    },
    table: {
        alignSelf: 'center',
        marginVertical: wp(2),
        width: '85%'
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        padding: wp(1),
        justifyContent: 'center',
    },
})

export default MySubscriptionItem;