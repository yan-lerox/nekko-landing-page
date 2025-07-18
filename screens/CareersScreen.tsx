import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
  Home: undefined;
  Marketplace: undefined;
  About: undefined;
  Careers: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Careers'>;


// Color constants based on the provided palette
const COLORS = {
  primary: '#13ced8',
  dark: '#0d0d0d',
  light: '#f2f2f2',
};

// Job card component
const JobCard = ({ title, location, description, isOpen }) => {
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobCardHeader}>
        <Text style={styles.jobTitle}>{title}</Text>
        <View style={[
          styles.jobStatusBadge,
          isOpen ? styles.jobStatusOpen : styles.jobStatusClosed
        ]}>
          <Text style={[
            styles.jobStatusText,
            isOpen ? styles.jobStatusTextOpen : styles.jobStatusTextClosed
          ]}>
            {isOpen ? 'Open' : 'Filled'}
          </Text>
        </View>
      </View>
      <Text style={styles.jobLocation}>{location}</Text>
      <Text style={styles.jobDescription}>{description}</Text>
      {isOpen ? (
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => Linking.openURL('mailto:careers@nekko-tech.cloud?subject=Application for ' + title)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.filledText}>This position is currently filled</Text>
      )}
    </View>
  );
};

// Benefit item component
const BenefitItem = ({ title, icon }) => {
  return (
    <View style={styles.benefitItem}>
      <Text style={styles.benefitIcon}>{icon}</Text>
      <Text style={styles.benefitTitle}>{title}</Text>
    </View>
  );
};

export default function CareersScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const isDesktop = width > 1024;
  const navigation = useNavigation<NavigationProp>();

  
  // Job listings data
  const jobListings = [
    // Enter additional job listings here when hiring starts
  ];
  
  // Benefits data
  const benefits = [
    { id: 1, title: 'Flexible Working Hours', icon: '⏰' },
    { id: 2, title: 'Remote Work Options', icon: '🏠' },
    { id: 3, title: 'Professional Development', icon: '📚' },
    { id: 4, title: 'Competitive Salary', icon: '💰' },
    { id: 5, title: 'Health Insurance', icon: '🏥' },
    { id: 6, title: 'Team Building Events', icon: '🎮' },
  ];

  // Check if there are any open positions
  const hasOpenPositions = jobListings.some(job => job.isOpen);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Careers at Nekko</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Join Our Team of Innovators
          </Text>
          <Text style={styles.heroSubtitle}>
            Help us build the technology that's transforming Malaysian businesses
          </Text>
        </View>

        {/* Why Join Us Section */}
        <View style={styles.whyJoinSection}>
          <Text style={styles.sectionTitle}>Why Join Nekko Technologies?</Text>
          <View style={styles.divider} />
          <Text style={styles.whyJoinText}>
            At Nekko Technologies, you'll be part of a team that's making advanced technology accessible to businesses across Malaysia. We're a diverse group of engineers, developers, and business specialists united by our passion for innovation and our commitment to our clients' success.
          </Text>
          
          <View style={styles.benefitsGrid}>
            {benefits.map(benefit => (
              <BenefitItem 
                key={benefit.id}
                title={benefit.title}
                icon={benefit.icon}
              />
            ))}
          </View>
        </View>

        {/* Open Positions Section */}
        <View style={styles.positionsSection}>
          <Text style={styles.sectionTitle}>Current Openings</Text>
          <View style={styles.divider} />
          
          {hasOpenPositions ? (
            <View style={styles.jobsGrid}>
              {jobListings.map(job => (
                <JobCard 
                  key={job.id}
                  title={job.title}
                  location={job.location}
                  description={job.description}
                  isOpen={job.isOpen}
                />
              ))}
            </View>
          ) : (
            <View style={styles.noOpeningsContainer}>
              <Text style={styles.noOpeningsText}>
                We're good for now! All positions are currently filled.
              </Text>
              <Text style={styles.stayConnectedText}>
                Follow our social media to stay updated on future opportunities.
              </Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => Linking.openURL('https://facebook.com/nekkotechnologies')}
                >
                  <Text style={styles.socialIconText}>📘</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => Linking.openURL('https://instagram.com/nekkotechnologies')}
                >
                  <Text style={styles.socialIconText}>📸</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => Linking.openURL('https://linkedin.com/company/nekkotechnologies')}
                >
                  <Text style={styles.socialIconText}>🔗</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Spontaneous Application Section */}
        <View style={styles.spontaneousSection}>
          <Text style={styles.spontaneousTitle}>Don't see a position that fits?</Text>
          <Text style={styles.spontaneousText}>
            We're always interested in meeting talented individuals who are passionate about technology and innovation. Send us your CV and tell us how you can contribute to our mission.
          </Text>
          <TouchableOpacity 
            style={styles.spontaneousButton}
            onPress={() => Linking.openURL('mailto:careers@nekko-tech.cloud?subject=Spontaneous Application')}
          >
            <Text style={styles.spontaneousButtonText}>Send Spontaneous Application</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Nekko Technologies. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.dark,
    paddingVertical: 24,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  headerTitle: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  heroSection: {
    backgroundColor: COLORS.dark,
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  heroTitle: {
    color: COLORS.light,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 800,
    fontFamily: 'monospace',
  },
  heroSubtitle: {
    color: 'rgba(242,242,242,0.8)',
    fontSize: 20,
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 30,
    fontFamily: 'monospace',
  },
  sectionTitle: {
    color: COLORS.light,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: COLORS.primary,
    marginBottom: 40,
  },
  // Why Join Us section styles
  whyJoinSection: {
    paddingVertical: 60,
    paddingHorizontal: 32,
    maxWidth: 1000,
    alignSelf: 'center',
  },
  whyJoinText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 40,
    fontFamily: 'monospace',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  benefitItem: {
    backgroundColor: 'rgba(19,206,216,0.05)',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
    width: 180,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  benefitTitle: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  // Positions section styles
  positionsSection: {
    paddingVertical: 60,
    paddingHorizontal: 32,
    backgroundColor: 'rgba(19,206,216,0.05)',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  jobsGrid: {
    gap: 20,
  },
  jobCard: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobTitle: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  jobStatusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  jobStatusOpen: {
    backgroundColor: 'rgba(19,206,216,0.2)',
  },
  jobStatusClosed: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  jobStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  jobStatusTextOpen: {
    color: COLORS.primary,
  },
  jobStatusTextClosed: {
    color: 'rgba(255,255,255,0.6)',
  },
  jobLocation: {
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  jobDescription: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  applyButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  filledText: {
    color: 'rgba(242,242,242,0.6)',
    fontSize: 16,
    fontStyle: 'italic',
    fontFamily: 'monospace',
  },
  noOpeningsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noOpeningsText: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  stayConnectedText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(19,206,216,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    fontSize: 24,
  },
  // Spontaneous application section styles
  spontaneousSection: {
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  spontaneousTitle: {
    color: COLORS.light,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  spontaneousText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 700,
    lineHeight: 28,
    fontFamily: 'monospace',
  },
  spontaneousButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  spontaneousButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  // Footer
  footer: {
    backgroundColor: 'rgba(13,13,13,0.9)',
    paddingVertical: 32,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(242,242,242,0.6)',
    fontSize: 16,
    fontFamily: 'monospace',
  },
});