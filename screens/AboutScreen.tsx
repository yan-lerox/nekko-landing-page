
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  Image,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../App';




type RootStackParamList = 'About'
const navigation = useNavigation<AboutScreenNav>();

export const AboutScreen = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { width } = useWindowDimensions();

type AboutScreenRouteParams = {
  initialTab?: string;
};

type AboutScreenProps = {
  route: { params: AboutScreenRouteParams };
};

/*const AboutScreen = ({ route }: AboutScreenProps) => {
  const initialTab = route?.params?.initialTab ?? 'Home';
  // ...
}*/


// Color constants based on the provided palette
const COLORS = {
  primary: '#13ced8',
  dark: '#0d0d0d',
  light: '#f2f2f2',
};

// Tab component for About page sections
const TabButton = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.tabButton, 
        active && styles.tabButtonActive
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.tabButtonText,
        active && styles.tabButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Organization chart person component
const OrgChartPerson = ({ name, title, level, photoPlaceholder }) => {
  return (
    <View style={[styles.orgChartPerson, { marginLeft: level * 40 }]}>
      <View style={styles.orgChartPersonHeader}>
        <View style={styles.orgChartPersonPhoto}>
          <Text style={styles.orgChartPersonPhotoText}>{photoPlaceholder}</Text>
        </View>
        <View style={styles.orgChartPersonInfo}>
          <Text style={styles.orgChartPersonName}>{name}</Text>
          <Text style={styles.orgChartPersonTitle}>{title}</Text>
        </View>
      </View>
      {level > 0 && <View style={styles.orgChartLine} />}
    </View>
  );
};

// Timeline item component
const TimelineItem = ({ year, title, description }) => {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineYearContainer}>
        <Text style={styles.timelineYear}>{year}</Text>
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineDescription}>{description}</Text>
      </View>
    </View>
  );
};

// Value item component
const ValueItem = ({ title, description, icon }) => {
  return (
    <View style={styles.valueItem}>
      <View style={styles.valueIconContainer}>
        <Text style={styles.valueIcon}>{icon}</Text>
      </View>
      <Text style={styles.valueTitle}>{title}</Text>
      <Text style={styles.valueDescription}>{description}</Text>
    </View>
  );
};

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const isDesktop = width > 1024;
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get initialTab from route params if available
  const initialTabParam = route.params?.initialTab || 'Company';
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(initialTabParam);
  
  // Update active tab when route params change
  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);
  
  // Organization chart data
  const orgChartData = [
    { id: 1, name: 'Ryan Dickson', title: 'Founder & CTO', level: 0, photoPlaceholder: '👤' },
    // Enter additional team members here for the organization chart
  ];

  // Timeline data
  const timelineData = [
    {
      id: 1,
      year: '2023',
      title: 'Nekko Robotics Initiative',
      description: `Nekko Technologies started as 'Nekko Robotics Initiative', focusing on STEM courses & provider and prototyping.`,
    },
    {
      id: 2,
      year: '2025',
      title: 'Rebranded as Nekko Technologies',
      description: `Changed name to 'Nekko Technologies' as we expanded beyond robotics into broader tech solutions.`,
    },
  ];
  
  // Company values data
  const valuesData = [
    {
      id: 1,
      title: 'Innovation with Purpose',
      description: 'We create technology that solves real problems for real businesses, not just innovation for its own sake.',
      icon: '💡'
    },
    {
      id: 2,
      title: 'Accessibility',
      description: 'We believe advanced technology should be accessible to businesses of all sizes, not just large corporations.',
      icon: '🔓'
    },
    {
      id: 3,
      title: 'Local Focus',
      description: 'We design our solutions specifically for the Malaysian context, understanding local challenges and opportunities.',
      icon: '🇲🇾'
    },
    {
      id: 4,
      title: 'Privacy First',
      description: 'We respect data privacy and security as fundamental rights, not optional features.',
      icon: '🔒'
    },
    {
      id: 5,
      title: 'Sustainable Technology',
      description: 'We create solutions that are environmentally sustainable and help our clients reduce their ecological footprint.',
      icon: '🌱'
    },
    {
      id: 6,
      title: 'Knowledge Sharing',
      description: 'We believe in empowering our clients through education and knowledge transfer, not dependency.',
      icon: '📚'
    },
  ];

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
          <Text style={styles.headerTitle}>About Nekko Technologies</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Bridging Technology Gaps for Malaysian Businesses
          </Text>
          <Text style={styles.heroSubtitle}>
            Founded in 2018, Nekko Technologies has been on a mission to make advanced technology accessible to businesses across Malaysia.
          </Text>
        </View>

        {/* Tab Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          <TabButton 
            title="Company" 
            active={activeTab === 'Company'} 
            onPress={() => setActiveTab('Company')}
          />
          <TabButton 
            title="Our Team" 
            active={activeTab === 'Our Team'} 
            onPress={() => setActiveTab('Our Team')}
          />
          <TabButton 
            title="History" 
            active={activeTab === 'History'} 
            onPress={() => setActiveTab('History')}
          />
          <TabButton 
            title="Values" 
            active={activeTab === 'Values'} 
            onPress={() => setActiveTab('Values')}
          />
          <TabButton 
            title="Careers" 
            active={activeTab === 'Careers'} 
            onPress={() => navigation.navigate('Careers')}
          />
        </ScrollView>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {/* Company Tab */}
          {activeTab === 'Company' && (
            <View style={styles.companySection}>
              <Text style={styles.sectionTitle}>Our Story</Text>
              <View style={styles.divider} />
              <Text style={styles.companyText}>
                Nekko Technologies was born from a simple observation: while Malaysia's economy was rapidly digitizing, many small and medium enterprises were being left behind. Our founder, Ryan Dickson, saw that the technological solutions available were either too expensive, too complex, or not adapted to local needs.
              </Text>
              <Text style={styles.companyText}>
                Starting with a focus on agricultural technology in Sabah, we've grown to offer a comprehensive suite of technology solutions spanning robotics, IoT, cloud infrastructure, and software services. Our approach combines cutting-edge innovation with practical, affordable implementation tailored to the Malaysian context.
              </Text>
              <Text style={styles.companyText}>
                Today, we serve clients across Malaysia, from small family businesses to medium-sized enterprises, helping them leverage technology to compete in an increasingly digital economy. Our team of engineers, developers, and business specialists work together to bridge the technology gap and create solutions that make a real difference.
              </Text>
              
              <View style={styles.missionSection}>
                <View style={styles.missionBox}>
                  <Text style={styles.missionTitle}>Our Mission</Text>
                  <Text style={styles.missionText}>
                    To democratize access to advanced technology for Malaysian businesses of all sizes, enabling them to innovate, grow, and compete in the digital economy.
                  </Text>
                </View>
                <View style={styles.missionBox}>
                  <Text style={styles.missionTitle}>Our Vision</Text>
                  <Text style={styles.missionText}>
                    A Malaysia where every business, from small farms to urban startups, can harness the power of technology to reach their full potential.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Our Team Tab */}
          {activeTab === 'Our Team' && (
            <View style={styles.teamSection}>
              <Text style={styles.sectionTitle}>Organization Chart</Text>
              <View style={styles.divider} />
              <Text style={styles.teamIntro}>
                Our diverse team brings together expertise in engineering, software development, business operations, and more. Each member contributes unique skills and perspectives to our mission.
              </Text>
              
              <View style={styles.orgChart}>
                {orgChartData.map(person => (
                  <OrgChartPerson 
                    key={person.id}
                    name={person.name}
                    title={person.title}
                    level={person.level}
                    photoPlaceholder={person.photoPlaceholder}
                  />
                ))}
              </View>
              
              <TouchableOpacity 
                style={styles.joinTeamButton}
                onPress={() => navigation.navigate('Careers')}
              >
                <Text style={styles.joinTeamButtonText}>Join Our Team</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* History Tab */}
          {activeTab === 'History' && (
            <View style={styles.historySection}>
              <Text style={styles.sectionTitle}>Our Journey</Text>
              <View style={styles.divider} />
              <Text style={styles.historyIntro}>
                Since our founding in 2018, Nekko Technologies has grown from a small startup to a recognized technology provider across Malaysia. Here are some key milestones in our journey.
              </Text>
              
              <View style={styles.timeline}>
                {timelineData.map(item => (
                  <TimelineItem 
                    key={item.id}
                    year={item.year}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Values Tab */}
          {activeTab === 'Values' && (
            <View style={styles.valuesSection}>
              <Text style={styles.sectionTitle}>Our Core Values</Text>
              <View style={styles.divider} />
              <Text style={styles.valuesIntro}>
                At Nekko Technologies, our values guide everything we do. They shape our decisions, our products, and our relationships with clients and partners.
              </Text>
              
              <View style={styles.valuesGrid}>
                {valuesData.map(value => (
                  <ValueItem 
                    key={value.id}
                    title={value.title}
                    description={value.description}
                    icon={value.icon}
                  />
                ))}
              </View>
            </View>
          )}
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Transform Your Business?</Text>
          <Text style={styles.ctaText}>
            Discover how our technology solutions can help your business grow, innovate, and succeed.
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Marketplace')}
          >
            <Text style={styles.ctaButtonText}>Explore Our Solutions</Text>
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
  tabsContainer: {
    paddingVertical: 20,
    backgroundColor: 'rgba(19,206,216,0.05)',
  },
  tabsContent: {
    paddingHorizontal: 32,
    gap: 12,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
    backgroundColor: 'transparent',
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabButtonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  tabButtonTextActive: {
    color: COLORS.dark,
  },
  tabContent: {
    paddingVertical: 60,
    paddingHorizontal: 32,
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
  // Company tab styles
  companySection: {
    maxWidth: 1000,
    alignSelf: 'center',
  },
  companyText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  missionSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 40,
    gap: 20,
  },
  missionBox: {
    flex: 1,
    backgroundColor: 'rgba(19,206,216,0.05)',
    borderRadius: 8,
    padding: 32,
    minWidth: 300,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
  },
  missionTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  missionText: {
    color: COLORS.light,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'monospace',
  },
  // Team tab styles
  teamSection: {
    maxWidth: 1000,
    alignSelf: 'center',
  },
  teamIntro: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 40,
    fontFamily: 'monospace',
  },
  orgChart: {
    marginBottom: 60,
  },
  orgChartPerson: {
    marginBottom: 30,
    position: 'relative',
  },
  orgChartPersonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgChartPersonPhoto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(19,206,216,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
  },
  orgChartPersonPhotoText: {
    fontSize: 24,
  },
  orgChartPersonInfo: {
    flex: 1,
  },
  orgChartPersonName: {
    color: COLORS.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  orgChartPersonTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'monospace',
  },
  orgChartLine: {
    position: 'absolute',
    left: -20,
    top: 30,
    width: 20,
    height: 1,
    backgroundColor: 'rgba(19,206,216,0.3)',
  },
  joinTeamButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignSelf: 'center',
  },
  joinTeamButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  // History tab styles
  historySection: {
    maxWidth: 1000,
    alignSelf: 'center',
  },
  historyIntro: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 40,
    fontFamily: 'monospace',
  },
  timeline: {
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 40,
    position: 'relative',
  },
  timelineYearContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineYear: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  timelineContent: {
    flex: 1,
    backgroundColor: 'rgba(19,206,216,0.05)',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
    marginLeft: 20,
  },
  timelineTitle: {
    color: COLORS.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'monospace',
  },
  timelineDescription: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'monospace',
  },
  // Values tab styles
  valuesSection: {
    maxWidth: 1000,
    alignSelf: 'center',
  },
  valuesIntro: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 40,
    fontFamily: 'monospace',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  valueItem: {
    backgroundColor: 'rgba(19,206,216,0.05)',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
    width: '48%',
    minWidth: 280,
    marginBottom: 20,
    flex: 1,
  },
  valueIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(19,206,216,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  valueIcon: {
    fontSize: 24,
  },
  valueTitle: {
    color: COLORS.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'monospace',
  },
  valueDescription: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'monospace',
  },
  // CTA Section
  ctaSection: {
    backgroundColor: 'rgba(19,206,216,0.05)',
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    color: COLORS.light,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  ctaText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 700,
    lineHeight: 30,
    fontFamily: 'monospace',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: COLORS.dark,
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
}