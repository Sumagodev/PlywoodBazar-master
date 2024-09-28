import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import React from 'react';
import Header from '../navigation/customheader/Header';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from 'rn-range-slider/styles';
export default function Privacy(props: any) {
  return (
    <>
      <Header normal={true} screenName={'Privacy'} rootProps={props} />
      <ImageBackground source={require('../../assets/img/main_bg.jpg')} style={{flex: 1, overflow: 'hidden'}}>
        <ScrollView style={[{paddingHorizontal: wp(2)}]}>
          <Text style={[internalcss.heading, {fontSize: wp(6), color: '#000'}]}> Privacy Policy</Text>
          <View style={{marginTop: 15}}>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>About Privacy</Text>
              <Text style={internalcss.content}>
                This Privacy Policy governs the manner in which Plywoodbazar.com by Dipparv Ventures LLP collects, uses, maintains, and discloses information from users of our B2B website. This Privacy Policy applies to the Website and all products and services offered by Plywoodbazar.com by Dipparv
                Ventures LLP.
              </Text>
              <Text style={internalcss.content}>Built the Plywoodbazar.com Website/App by Dipparv Ventures LLP. This service is provided by Dipparv Ventures LLP at no cost and is intended for use as is.</Text>

              <Text style={internalcss.content}>
                If you choose to use our Service, you agree to the collection and use of information in relation to this policy. The Personal Information we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this
                Privacy Policy</Text>
              <Text style={internalcss.content}>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at PlywoodBazar.com, unless otherwise defined in this Privacy Policy.</Text>
              <Text style={internalcss.content}>This page informs visitors about our policies regarding the collection, use, and disclosure of Personal Information for those who use our Service.</Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>1. Information We Collect</Text>
              <Text style={internalcss.content}>
                We may collect personal and non-personal identification information from Users in various ways, including, but not limited to, when Users visit our Website, register on the Website, place an order, subscribe to our newsletter, and in connection with other activities, services,
                features, or resources we make available on our Website. The information we may collect includes:
              </Text>
              <Text style={internalcss.content}>Contact information (such as name, email address, mailing address, and phone number)</Text>
              <Text style={internalcss.content}>Company information (such as company name, job title, and industry)</Text>
              <Text style={internalcss.content}>Financial information (such as credit card details, bank account details, and billing information)</Text>
              <Text style={internalcss.content}>Log files, including IP addresses, browser type, internet service provider, referring/exit pages, operating system, date/time stamp, and click stream data.</Text>
              <Text style={internalcss.content}>Any other information voluntarily submitted by the User</Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>2. How We Use Collected Information</Text>
              <Text style={internalcss.content}>We may collect and use Users' personal information for the following purposes:</Text>
              <Text style={internalcss.content}>To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.</Text>
              <Text style={internalcss.content}>To personalize user experience: We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Website.</Text>
              <Text style={internalcss.content}>
                To process payments: We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.
              </Text>
              <Text style={internalcss.content}>
                To send periodic emails: We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If the User decides to otp-in to our mailing list, they will receive emails that
                may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>3. How We Protect Your Information</Text>

              <Text style={internalcss.content}>
                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Website.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>4. Sharing Your Personal Information</Text>
              <Text style={internalcss.content}>
                We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and
                advertisers.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>5. Third-Party Websites</Text>

              <Text style={internalcss.content}>Users may find advertising or other content on our Website that links to the sites and services of our partners, suppliers, advertisers.</Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>6. Information Collection and Use</Text>

              <Text style={internalcss.content}>
                For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Phone number, Personal information , Gmail. The information that we request will be retained by us and used as described
                in this privacy policy.
              </Text>
              <Text style={internalcss.content}>The app does use third party services that may collect information used to identify you.</Text>
              <Text style={internalcss.content}>Link to privacy policy of third party service providers used by the app Google Play Services.</Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>7. Log Data</Text>

              <Text style={internalcss.content}>
                We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device
                name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>8. Cookies</Text>

              <Text style={internalcss.content}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your devices internal memory.</Text>
              <Text style={internalcss.content}>
                This Service does not use these cookies explicitly. However, the app may use third party code and libraries that use cookies to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your
                device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>9. Service Providers</Text>
              <Text style={internalcss.content}>We may employ third-party companies and individuals due to the following</Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>10. Security</Text>
              <Text style={internalcss.content}>
                We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot
                guarantee its absolute security.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>11. Links to Other Sites</Text>

              <Text style={internalcss.content}>
                This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and
                assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>12. Children’s Privacy</Text>
              <Text style={internalcss.content}>
                These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If
                you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>13. Changes to This Privacy Policy</Text>
              <Text style={internalcss.content}>
                We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
              </Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>14. Contact Us</Text>
              <Text style={internalcss.content}>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at admin@plywoodbazar.com</Text>
            </View>
            <View style={internalcss.textwrap}>
              <Text style={internalcss.heading}>15. Contact Information</Text>
              <Text style={internalcss.content}>
                Where the Plywood Bazar.com mobile application are obtained from other sources than Apple App Store or Google Play, You may share the names, numbers, Google IDs and email addresses contained in Your address book (Contact Information) with Plywood Bazar.com by enabling the Plywood
                Bazar.com Invite Contacts Functionality. Where the Plywood Bazar.com Apps are obtained from Apple App Store or Google Play,
              </Text>

              <Text style={internalcss.content}>We do not share any user Contact Information. Plywood Bazar.com may collect, store and use the list of identifiers associated with said services linked to the Contact Information in order to enhance the results shared with other Users.</Text>
              <Text style={internalcss.content}>Please note that no other contact information other than the phone numbers and there to attached names, Google IDs and email addresses will be collected and used from Your address book. Other numbers or information that may be contained in Your address book will be filtered away by
                our safety algorithms and will therefore not be collected by Plywood Bazar.com. Please also note that You can always choose not to share Contact Information with Plywood Bazar.com.
              </Text>
            </View>
            {/* <Text style={internalcss.content}></Text> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
const internalcss = StyleSheet.create({
  heading: {
    fontSize: wp(5),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    color: '#603200',
    fontWeight: 'bold',
    textAlign: 'justify', // Justifies text in the heading
  },
  content: {
    fontSize: wp(3.2),
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'justify', // Justifies text in the content
  },
  bgwhite: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10,
  },
  textwrap: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: wp(5),
    padding: wp(3),
    marginVertical: wp(3),
  },
});
