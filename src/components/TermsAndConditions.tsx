import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../navigation/customheader/Header';
export default function TermsAndConditions(props: any) {
        return (
                <>

                        <Header normal={true} rootProps={props} />
                        <ImageBackground source={require('../../assets/img/main_bg.jpg')} style={{ flex: 1, overflow: 'hidden' }}>
                                <ScrollView style={[{ paddingHorizontal: wp(2) }]}>



                                        <View style={{ marginTop: 15 }}>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>Terms & Conditions</Text>
                                                        <Text style={internalcss.content}>By downloading or using the app, these terms will automatically apply to you. You should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to DIPPARV VENTURES LLP.</Text>
                                                        <Text style={internalcss.content}>These Terms and Conditions are entered into by and between the subscribing entity and Plywood Bazar.com by Dipparv Ventures LLP ,collectively referred to as the "Parties." This Agreement governs the use of the B2B website subscription module & advertisement module provided by the Dipparv Ventures LLP in the Brand Name Plywood Bazar.com.
                                                        </Text>
                                                        <Text style={internalcss.content}>1. Subscription Service & advertisement module
                                                        </Text>
                                                        <Text style={internalcss.content}>1.1. The Company agrees to provide access to the B2B website subscription module to the Subscriber for the agreed subscription term.
                                                        </Text>

                                                        <Text style={internalcss.content}>1.2. The Subscriber shall pay the applicable fees for the subscription as specified by the Company.</Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>2. Subscriber Obligations</Text>
                                                        <Text style={internalcss.content}>2.1. The Subscriber shall provide accurate and up-to-date information during the registration process and maintain the confidentiality of login credentials.
                                                        </Text>
                                                        <Text style={internalcss.content}>2.2. The Subscriber shall not share or transfer their subscription rights to any third party without the prior written consent of the Company.
                                                        </Text>
                                                        <Text style={internalcss.content}>2.3. The Subscriber shall comply with all applicable laws and regulations while using the B2B website subscription module.
                                                        </Text>
                                                        <Text style={internalcss.content}>2.4. The Subscriber shall not engage in any unauthorized access, reverse engineering, or hacking activities related to the subscription module.
                                                        </Text>
                                                        <Text style={internalcss.content}>2.5 The subscriber is being verified automatically but the administration of the company will terminate subscription of the subscriber if administration department of Plywoodbazar.com by Dipparv Ventures LLP will have find any illegal or misappropriation condition.
                                                        </Text>
                                                        <Text style={internalcss.content}>2.6 The subscriber can only add products in the categories added by the company. The subscriber will not able to add any banned or illegal category which banned by the law.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>3. Intellectual Property Rights</Text>
                                                        <Text style={internalcss.content}>3.1. We Plywood Bazar.com By Dipparv Ventures LLP retains all intellectual property rights, including but not limited to copyrights, trademarks, and trade secrets, related to the B2B website subscription module.
                                                        </Text>
                                                        <Text style={internalcss.content}>3.2. The Subscriber shall not reproduce, modify, distribute, or create derivative works based on the subscription module without the prior written consent of Plywood Bazar.com By Dipparv Ventures LLP.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>4. Limitation of Liability</Text>
                                                        <Text style={internalcss.content}>4.1. Plywood Bazar.com By Dipparv Ventures LLP shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising out of or in connection with the use of the B2B website subscription module.
                                                        </Text>
                                                        <Text style={internalcss.content}>4.2. The Subscriber agrees to indemnify and hold the Company harmless from any claims, losses, damages, liabilities, or expenses arising out of or in connection with the Subscriber's use of the subscription module.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>5. Termination</Text>
                                                        <Text style={internalcss.content}>5.1. Either party may terminate this Agreement upon written notice.</Text>
                                                        <Text style={internalcss.content}>5.2. The Subscriber shall not be entitled to a refund of any fees paid upon termination of the Agreement.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>6. Confidentiality
                                                        </Text>
                                                        <Text style={internalcss.content}>6.1. The Parties agree to keep all confidential information obtained from each other during the term of this Agreement confidential and not disclose it to any third party without prior written consent.
                                                        </Text>
                                                        <Text style={internalcss.content}>6.2. This obligation of confidentiality shall survive the termination of this Agreement.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>7. Governing Law and Jurisdiction

                                                        </Text>
                                                        <Text style={internalcss.content}>7.1. This Agreement shall be governed by and construed in accordance with the laws of India.
                                                        </Text>
                                                        <Text style={internalcss.content}>7.2. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in Only At Sangamner State - Maharashtra India.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>8. Entire Agreement</Text>
                                                        <Text style={internalcss.content}>8.1. This Agreement constitutes the entire understanding between the Parties concerning the subject matter here of and supersedes all prior agreements, understandings, and representations, whether oral or written.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.2. DIPPARV VENTURES LLP is committed to ensuring that the app & website is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.3. The PLYWOOD BAZAR.COM app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the PLYWOOD BAZAR.COM app & Website won’t work properly or at all.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.4. The Subscriber should be aware that there are certain things that DIPPARV VENTURES LLP will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but DIPPARV VENTURES LLP cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.5. If the subscriber using app & website outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.6. Along the same lines, DIPPARV VENTURES LLP cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, DIPPARV VENTURES LLP cannot accept responsibility.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.7. With respect to DIPPARV VENTURES LLP responsibility for your use of the app & website, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. DIPPARV VENTURES LLP accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app & website.
                                                        </Text>
                                                        <Text style={internalcss.content}>8.8. At some point, we may wish to update the app & website. The app is currently available on Android & ios – the requirements for system (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Plywood Bazar.com By Dipparv Ventures LLP. does not promise that it will always update the app so that it is relevant to you and/or works with the Android and ios version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>9.Guiedline for Reviews
                                                        </Text>
                                                        <Text style={internalcss.content}>By signing or clicking in the box. of the Terms Condition, the Subscriber is confirmed accepting the Reviews on their Profile. Only Paid Subscribers can Review on profile. but In the guidelines of the Review System. Consideration of the following Guideline is binding on Review Giver & Review Accepter these are as under.
                                                        </Text>
                                                        <Text style={internalcss.content}>All Subscriber who Register with us should agree and confirm to accept any Review on their respective Profiles. These terms & conditions Are binding to all subscribers.
                                                        </Text>
                                                        <Text style={internalcss.content}>Content Guidelines for Website Reviews: Acceptable Content:
                                                        </Text>
                                                        <Text style={internalcss.content}>Reviews based on genuine experiences: Reviews should reflect the reviewer's experience with the Subscriber
                                                        </Text>
                                                        <Text style={internalcss.content}>Constructive feedback: Reviews can be critical but should be constructive and offer suggestions for improvement.
                                                        </Text>
                                                        <Text style={internalcss.content}>Focus on functionality and content: Reviews should focus on aspects like usability, design, navigation, quality, and customer service.
                                                        </Text>
                                                        <Text style={internalcss.content}>Respectful language: Reviews should be polite and avoid offensive language, personal attacks, or discriminatory remarks.
                                                        </Text>
                                                        <Text style={internalcss.content}>Accuracy: All information in the review should be truthful and accurate.
                                                        </Text>

                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>Prohibited Topics:</Text>
                                                        <Text style={internalcss.content}>Promotional content: Reviews cannot be used to promote other websites or products.
                                                        </Text>
                                                        <Text style={internalcss.content}>False or misleading information: Reviews should not contain false or misleading claims about the website or its services.
                                                        </Text>
                                                        <Text style={internalcss.content}>Hate speech or discrimination: Reviews cannot contain hate speech, discriminatory language, or personal attacks.
                                                        </Text>
                                                        <Text style={internalcss.content}>Spam or irrelevant content: Reviews should be relevant to the website and not be spam or gibberish.
                                                        </Text>
                                                        <Text style={internalcss.content}>Violations of privacy: Reviews cannot disclose personal information about others without their consent.
                                                        </Text>
                                                        <Text style={internalcss.content}>Illegal activities: Reviews cannot promote or encourage illegal activities.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>Consequences for Violations:
                                                        </Text>
                                                        <Text style={internalcss.content}>Removal of review: Reviews that violate these guidelines will be removed.
                                                        </Text>
                                                        <Text style={internalcss.content}>Account suspension: Users who repeatedly violate these guidelines may have their accounts suspended.
                                                        </Text>
                                                        <Text style={internalcss.content}>Legal action: In severe cases, the website may take legal action against users who violate these guidelines.
                                                        </Text>
                                                        <Text style={internalcss.content}>We are Plywood Bazar.Com by Dipparv Ventures LLP Not Responsible Or Binding For Any Reviews Given By Users to Our Subscriber Profile.
                                                        </Text>
                                                        <Text style={internalcss.content}>We are Plywood Bazar.Com by Dipparv Ventures LLP Reserve the right to modify the terms at your discretion.
                                                        </Text>
                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>Dispute Resolving for Reviews:

                                                        </Text>
                                                        <Text style={internalcss.content}>Transparency: Plywood Bazar.Com communicate to Both The Party[Subscriber] that the dispute-resolving issue will be Communicated to and removed review with agreement and consideration of both the Party. but we are not sure about resolving and responsible for any dispute.
                                                        </Text>
                                                        <Text style={internalcss.content}>Subscribers should communicate to our Admin Department to Resolve the Review Issue by mailing us at admin@plywoodbazar.com
                                                        </Text>

                                                </View>
                                                <View style={internalcss.textwrap}>
                                                        <Text style={internalcss.heading}>10 Responsibilities of Payment transaction for The Sales & Purchase Transaction between Subscriber
                                                        </Text>
                                                        <Text style={internalcss.content}>Plywood Bazar.Com by Dipparv Ventures LLP is not responsible for any money transaction between subscribers.
                                                        </Text>
                                                        <Text style={internalcss.content}>Plywood Bazar.Com by Dipparv Ventures LLP provides Online Consulting just for information on the market & New Products only. and we are not confirming to be responsible for any commitment given by the Subscriber.
                                                        </Text>
                                                        <Text style={internalcss.content}>If any kind of dispute happens between subscribers Plywoodbazar.com by Dipparv Ventures LLP is not responsible. Subscribers can solve their disputes in their Way. Plywood Bazar.Com do not make any Mediation.
                                                        </Text>
                                                        <Text style={internalcss.content}></Text>
                                                </View>
                                        </View>
                                        <View style={internalcss.textwrap}>
                                                <Text style={internalcss.heading}>11. We The Plywood Bazar.Com by Dipparv Ventures LLP do not Confirm any photo or product displayed Nor give Claims or confirmations about Profile Upload By the Subscriber on our app & Website.

                                                </Text>
                                        </View>
                                </ScrollView>
                        </ImageBackground>
                </>
        )
}
const internalcss = StyleSheet.create({
        heading: {
                fontSize: wp(5),
                fontFamily: 'Poppins-Medium',
                alignSelf: 'center',
                color: "#603200",
                fontWeight: 'bold'
        },
        content: {
                fontSize: wp(3.2),
                fontFamily: 'Poppins-Regular',
                color: '#000'
        },
        bgwhite: {
                backgroundColor: '#fff',
                flex: 1,
                paddingHorizontal: 10
        },
        textwrap: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: wp(5), padding: wp(3), marginVertical: wp(3) }

})