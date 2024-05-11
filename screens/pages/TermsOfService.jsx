import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';

export default function TermsOfService() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Gebruikersvoorwaarden</Text>
        <Text style={styles.date}>Last updated on 23 April 2022</Text>
        <Text style={styles.introduction}>
          Welcome to Mint ("we" or "us"). This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you use our website and related services.
        </Text>

        <Text style={styles.heading}>1. Information We Collect</Text>

        <Text style={styles.subHeading}>1.1 Personal Information</Text>
        <Text style={styles.paragraph}>
          We may collect personal information, such as your name, email address, and other contact details when you voluntarily provide it to us, such as when you register for an account, subscribe to newsletters, or contact us through the website.
        </Text>

        <Text style={styles.subHeading}>1.2 Usage Information</Text>
        <Text style={styles.paragraph}>
          We may collect information about your use of the website, including your IP address, browser type, device information, and pages visited. This information helps us analyze trends, administer the site, and improve user experience.
        </Text>

        <Text style={styles.heading}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the collected information for various purposes, including:
          {'\n'}• Providing and maintaining the website
          {'\n'}• Communicating with you about your account and our services
          {'\n'}• Sending newsletters, promotional materials, and other information you request
          {'\n'}• Analyzing website usage and improving our services
        </Text>

        <Text style={styles.heading}>3. Sharing Your Information</Text>
        <Text style={styles.paragraph}>
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share information with trusted third-party service providers who assist us in operating our website or conducting our business.
        </Text>

        <Text style={styles.heading}>4. Cookies and Similar Technologies</Text>
        <Text style={styles.paragraph}>
          We use cookies and similar technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling them may affect your ability to use certain features of the site.
        </Text>

        <Text style={styles.heading}>5. Your Choices</Text>
        <Text style={styles.paragraph}>
          You can manage your communication preferences by unsubscribing from newsletters or adjusting your account settings. You may also contact us to update or delete your personal information.
        </Text>

        <Text style={styles.heading}>6. Security</Text>
        <Text style={styles.paragraph}>
          We take reasonable measures to protect the security of your personal information. However, no method of transmission over the internet or electronic storage is completely secure. Therefore, we cannot guarantee absolute security.
        </Text>

        <Text style={styles.heading}>7. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our website is not directed to individuals under the age of 18. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to remove such information.
        </Text>

        <Text style={styles.heading}>8. Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of the website after such modifications will constitute your acknowledgment of the modified Privacy Policy.
        </Text>

        <Text style={styles.heading}>9. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy, please contact us at office@mint.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  introduction: {
    fontSize: 16,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  }
});
