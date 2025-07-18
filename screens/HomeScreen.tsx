import React, { useRef } from 'react';
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
import * as Font from 'expo-font';

// Color constants based on the provided palette
const COLORS = {
  primary: '#13ced8',
  dark: '#0d0d0d',
  light: '#f2f2f2',
};

// Helper function to open WhatsApp
const openWhatsApp = (product, price) => {
  const message = `Hi, I'm interested in ${product} (${price}). Can you provide more information?`;
  const whatsappUrl = `https://wa.me/+60123456789?text=${encodeURIComponent(message)}`;
  Linking.openURL(whatsappUrl).catch(err => console.error('Error opening WhatsApp:', err));
};

// Service card component
const ServiceCard = ({ title, description, icon }) => {
  const navigation = useNavigation();
  
  const handleServicePress = () => {
    navigation.navigate('Marketplace');
  };
  
  return (
    <TouchableOpacity style={styles.serviceCard} onPress={handleServicePress}>
      <View style={styles.serviceIconContainer}>
        <Text style={styles.serviceIcon}>{icon}</Text>
      </View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

// Product card component for marketplace
const ProductCard = ({ title, description, icon, price }) => {
  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => openWhatsApp(title, price)}
    >
      <View style={styles.productIconContainer}>
        <Text style={styles.productIcon}>{icon}</Text>
      </View>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>{description}</Text>
      {price && (
        <TouchableOpacity 
          style={styles.priceTag}
          onPress={(e) => {
            e.stopPropagation();
            openWhatsApp(title, price);
          }}
        >
          <Text style={styles.priceText}>{price}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

// Badge component
const Badge = ({ text, icon }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.badge}
      onPress={() => navigation.navigate('Marketplace')}
    >
      <Text style={styles.badgeIcon}>{icon}</Text>
      <Text style={styles.badgeText}>{text}</Text>
    </TouchableOpacity>
  );
};

// Social icon component
const SocialIcon = ({ icon, url }) => {
  const handlePress = () => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };
  
  return (
    <TouchableOpacity style={styles.socialIcon} onPress={handlePress}>
      <Text style={styles.socialIconText}>{icon}</Text>
    </TouchableOpacity>
  );
};

// Marketplace ribbon component
const MarketplaceRibbon = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.ribbon}
      onPress={() => navigation.navigate('Marketplace')}
    >
      <Text style={styles.ribbonText}>MARKETPLACE</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const isDesktop = width > 1024;
  const navigation = useNavigation();
  
  // Create refs for each section
  const scrollViewRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const marketplaceRef = useRef(null);
  const contactRef = useRef(null);
  
  // Function to scroll to a specific section
  const scrollToSection = (ref) => {
    if (scrollViewRef.current && ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  // Navigate to marketplace
  const navigateToMarketplace = () => {
    navigation.navigate('Marketplace');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Bar */}
        <View style={styles.navbar}>
          <View style={styles.navbarContent}>
            <Text style={styles.logo}>NEKKO</Text>
            <View style={styles.navLinks}>
              <TouchableOpacity onPress={() => scrollToSection(heroRef)}>
                <Text style={styles.navLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(aboutRef)}>
                <Text style={styles.navLink}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(servicesRef)}>
                <Text style={styles.navLink}>Services</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(marketplaceRef)}>
                <Text style={styles.navLink}>Marketplace</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection(contactRef)}>
                <Text style={styles.navLink}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Hero Section */}
        <View ref={heroRef} style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>
                From Farms to Founders — We Build Smart Things
              </Text>
              <Text style={styles.heroSubtitle}>
                Affordable innovation that transforms your business operations
                with cutting-edge technology
              </Text>
              <TouchableOpacity style={styles.ctaButton} onPress={navigateToMarketplace}>
                <Text style={styles.ctaButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
            {isDesktop && (
              <View style={styles.heroImageContainer}>
                <View style={styles.heroImagePlaceholder}>
                  <Text style={styles.heroImageText}>🗺️</Text>
                  <Text style={styles.heroImageCaption}>Borneo Map</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* About Section */}
        <View ref={aboutRef} style={styles.section}>
          <Text style={[styles.sectionTitle, styles.leftAlignedTitle]}>About Nekko Technologies</Text>
          <View style={[styles.divider, styles.leftAlignedDivider]} />
          <Text style={styles.aboutText}>
            At Nekko Technologies, we democratize advanced technology for Malaysian SMEs. 
            From robotics to cloud infrastructure, we bring enterprise-grade solutions at 
            affordable prices, tailored for the unique challenges of businesses in Malaysia.
          </Text>
          
          <View style={styles.aboutNavigation}>
            <TouchableOpacity 
              style={styles.aboutNavButton}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.aboutNavButtonText}>Company</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.aboutNavButton}
              onPress={() => navigation.navigate('About', { initialTab: 'Our Team' })}
            >
              <Text style={styles.aboutNavButtonText}>Our Team</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.aboutNavButton}
              onPress={() => navigation.navigate('About', { initialTab: 'History' })}
            >
              <Text style={styles.aboutNavButtonText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.aboutNavButton}
              onPress={() => navigation.navigate('About', { initialTab: 'Values' })}
            >
              <Text style={styles.aboutNavButtonText}>Values</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.aboutNavButton}
              onPress={() => navigation.navigate('Careers')}
            >
              <Text style={styles.aboutNavButtonText}>Careers</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.learnMoreButton}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.learnMoreButtonText}>Learn More About Us</Text>
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <View ref={servicesRef} style={[styles.section, styles.servicesSection]}>
          <Text style={[styles.sectionTitle, styles.leftAlignedTitle]}>Our Services</Text>
          <View style={[styles.divider, styles.leftAlignedDivider]} />
          <View style={styles.servicesGrid}>
            <ServiceCard
              title="Agri-tech Solutions"
              description="Smart farming systems with IoT sensors and automated monitoring"
              icon="🌱"
            />
            <ServiceCard
              title="Prototyping"
              description="Rapid hardware and software prototyping for proof-of-concept"
              icon="⚙️"
            />
            <ServiceCard
              title="Robotics"
              description="Custom robotic solutions for automation and efficiency"
              icon="🤖"
            />
            <ServiceCard
              title="IoT Systems"
              description="Connected device ecosystems for real-time monitoring and control"
              icon="📱"
            />
            <ServiceCard
              title="SME Cloud Solutions"
              description="Tailored cloud infrastructure designed specifically for SMEs"
              icon="☁️"
            />
            <ServiceCard
              title="Shared Managed Hosting"
              description="Cost-effective hosting with professional management"
              icon="🖥️"
            />
          </View>
        </View>

        {/* Marketplace Section */}
        <View ref={marketplaceRef} style={[styles.section, styles.marketplaceSection]}>
          <View style={styles.ribbonContainer}>
            <MarketplaceRibbon />
          </View>
          <Text style={[styles.sectionTitle, styles.leftAlignedTitle]}>SME Marketplace</Text>
          <View style={[styles.divider, styles.leftAlignedDivider]} />
          <Text style={styles.marketplaceIntro}>
            Discover our curated selection of software and hardware solutions designed specifically for Malaysian SMEs.
            From cloud services to robotics kits, we offer everything you need to digitize and automate your business.
          </Text>
          
          <View style={styles.productsGrid}>
            <ProductCard
              title="Nextcloud"
              description="Private cloud storage and collaboration platform for your business"
              icon="☁️"
              price="From RM99/month"
            />
            <ProductCard
              title="WordPress Hosting"
              description="Managed WordPress hosting with security and performance optimizations"
              icon="🌐"
              price="From RM49/month"
            />
            <ProductCard
              title="Digital Ocean Credits"
              description="Get started with cloud computing with our referral program"
              icon="💧"
              price="RM100 free credits"
            />
            <ProductCard
              title="Managed Server"
              description="Fully managed dedicated servers with 24/7 support"
              icon="🖥️"
              price="From RM299/month"
            />
            <ProductCard
              title="Cloud Panel"
              description="Easy-to-use control panel for your cloud infrastructure"
              icon="📊"
              price="From RM79/month"
            />
            <ProductCard
              title="Robotics Starter Kit"
              description="Begin your automation journey with our beginner-friendly kit"
              icon="🤖"
              price="RM1,299"
            />
          </View>
          
          <View style={styles.exploreMoreContainer}>
            <TouchableOpacity 
              style={styles.exploreMoreButton}
              onPress={navigateToMarketplace}
            >
              <Text style={styles.exploreMoreText}>Explore Full Marketplace</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Founder Section */}
        <View style={[styles.section, styles.founderSection]}>
          <Text style={[styles.sectionTitle, styles.leftAlignedTitle]}>Meet Our Founder</Text>
          <View style={[styles.divider, styles.leftAlignedDivider]} />
          <View style={styles.founderContent}>
            <View style={styles.founderImageContainer}>
              <View style={styles.founderImagePlaceholder} id="founder-image">
                <Text style={styles.founderImagePlaceholderText}>👤</Text>
              </View>
            </View>
            <View style={styles.founderInfo}>
              <Text style={styles.founderName}>Ryan Dickson</Text>
              <Text style={styles.founderTitle}>
                Founder & Chief Technology Officer
              </Text>
              <Text style={styles.founderBio}>
                With over 15 years of experience in robotics and cloud computing,
                I founded Nekko Technologies to bridge the gap between advanced
                technology and everyday businesses in Malaysia. My journey has
                been driven by a passion for building practical, modular
                solutions—especially for local SMEs and smallholders—and
                turning complex tech into something anyone can use. From IoT
                systems to cloud platforms, I focus on making innovation work
                where it matters most.
              </Text>
            </View>
          </View>
        </View>

        {/* Trust Badges Section */}
        <View style={[styles.section, styles.badgesSection]}>
          <Text style={[styles.sectionTitle, styles.leftAlignedTitle]}>Our Values</Text>
          <View style={[styles.divider, styles.leftAlignedDivider]} />
          <View style={styles.badgesContainer}>
            <Badge text="Privacy First" icon="🔒" />
            <Badge text="Built for SMEs" icon="🏢" />
            <Badge text="Affordable Innovation" icon="💡" />
          </View>
        </View>

        {/* Contact Section */}
        <View ref={contactRef} style={[styles.section, styles.contactSection]}>
          <Text style={[styles.sectionTitle, styles.leftAlignedTitle]}>Contact Us</Text>
          <View style={[styles.divider, styles.leftAlignedDivider]} />
          <Text style={styles.contactText}>
            Ready to transform your business with our solutions?
          </Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL('mailto:founder@nekko-tech.cloud')}
          >
            <Text style={styles.contactEmail}>founder@nekko-tech.cloud</Text>
          </TouchableOpacity>
          <View style={styles.socialIcons}>
            <SocialIcon 
              icon="📱" 
              url="https://wa.me/+60123456789" 
            />
            <SocialIcon 
              icon="📘" 
              url="https://facebook.com/nekkotechnologies" 
            />
            <SocialIcon 
              icon="📸" 
              url="https://instagram.com/nekkotechnologies" 
            />
            <SocialIcon 
              icon="🔗" 
              url="https://linkedin.com/company/nekkotechnologies" 
            />
          </View>
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
  navbar: {
    backgroundColor: COLORS.dark,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  navLinks: {
    flexDirection: 'row',
  },
  navLink: {
    color: COLORS.light,
    marginLeft: 32,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  heroSection: {
    backgroundColor: COLORS.dark,
    paddingVertical: 100,
    paddingHorizontal: 32,
  },
  heroContent: {
    maxWidth: 1200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  heroTextContainer: {
    flex: 1,
    maxWidth: 700,
  },
  heroTitle: {
    color: COLORS.light,
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 24,
    lineHeight: 56,
    textAlign: 'left',
    fontFamily: 'monospace',
  },
  heroSubtitle: {
    color: 'rgba(242,242,242,0.8)',
    fontSize: 22,
    marginBottom: 48,
    lineHeight: 34,
    textAlign: 'left',
    fontFamily: 'monospace',
  },
  heroImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  heroImagePlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(19,206,216,0.05)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
  },
  heroImageText: {
    fontSize: 100,
  },
  heroImageCaption: {
    color: COLORS.light,
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'monospace',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: COLORS.dark,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  section: {
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  sectionTitle: {
    color: COLORS.light,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  leftAlignedTitle: {
    textAlign: 'left',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: COLORS.primary,
    marginBottom: 48,
  },
  leftAlignedDivider: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1200,
  },
  aboutText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'left',
    marginBottom: 24,
    maxWidth: 1200,
    alignSelf: 'center',
    fontFamily: 'monospace',
  },
  servicesSection: {
    backgroundColor: 'rgba(19,206,216,0.05)',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -16,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  serviceCard: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 32,
    margin: 16,
    width: 320,
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  serviceIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: 'rgba(19,206,216,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    fontSize: 32,
  },
  serviceTitle: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  serviceDescription: {
    color: 'rgba(242,242,242,0.8)',
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'monospace',
  },
  // Marketplace styles
  marketplaceSection: {
    backgroundColor: COLORS.dark,
    position: 'relative',
  },
  ribbonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  ribbon: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    transform: [{ rotate: '45deg' }],
    position: 'relative',
    right: -30,
    top: 20,
  },
  ribbonText: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  marketplaceIntro: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'left',
    marginBottom: 40,
    maxWidth: 1200,
    alignSelf: 'center',
    fontFamily: 'monospace',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -16,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  productCard: {
    backgroundColor: 'rgba(19,206,216,0.05)',
    borderRadius: 8,
    padding: 32,
    margin: 16,
    width: 320,
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
    position: 'relative',
  },
  productIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: 'rgba(19,206,216,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  productIcon: {
    fontSize: 32,
  },
  productTitle: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  productDescription: {
    color: 'rgba(242,242,242,0.8)',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  priceTag: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  priceText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  exploreMoreContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  exploreMoreButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  exploreMoreText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  // End of marketplace styles
  founderSection: {
    backgroundColor: 'rgba(19,206,216,0.05)',
  },
  founderContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  founderImageContainer: {
    marginRight: 60,
    marginBottom: 30,
  },
  founderImagePlaceholder: {
    width: 240,
    height: 240,
    borderRadius: 8,
    backgroundColor: 'rgba(19,206,216,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  founderImagePlaceholderText: {
    fontSize: 100,
  },
  founderInfo: {
    flex: 1,
    minWidth: 320,
    paddingHorizontal: 16,
  },
  founderName: {
    color: COLORS.light,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'monospace',
  },
  founderTitle: {
    color: COLORS.primary,
    fontSize: 20,
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  founderBio: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 18,
    lineHeight: 30,
    fontFamily: 'monospace',
  },
  badgesSection: {
    backgroundColor: COLORS.dark,
    paddingBottom: 100,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19,206,216,0.05)',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
  },
  badgeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  badgeText: {
    color: COLORS.light,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  contactSection: {
    backgroundColor: 'rgba(19,206,216,0.05)',
  },
  contactText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  contactEmail: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'monospace',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
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
  learnMoreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  learnMoreButtonText: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  aboutNavButton: {
    backgroundColor: 'rgba(19,206,216,0.05)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
  },
  aboutNavButtonText: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  aboutNavigation: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 1200,
    alignSelf: 'center',
  },
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