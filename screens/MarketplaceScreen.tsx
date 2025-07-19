import React from 'react';
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

// Product card component
const ProductCard = ({ title, description, icon, price, category }) => {
  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => openWhatsApp(title, price)}
    >
      <View style={styles.productIconContainer}>
        <Text style={styles.productIcon}>{icon}</Text>
      </View>
      <Text style={styles.productTitle}>{title}</Text>
      {category && <Text style={styles.productCategory}>{category}</Text>}
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

// Category button component
const CategoryButton = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.categoryButton, 
        active && styles.categoryButtonActive
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.categoryButtonText,
        active && styles.categoryButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function MarketplaceScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const isDesktop = width > 1024;
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = [
    'All',
    'Cloud Services',
    'Software',
    'Hardware',
    'Robotics',
    'IoT',
    'Hosting'
  ];

  // Product data
  const products = [
    {
      id: 1,
      title: 'Nextcloud',
      description: 'Private cloud storage and collaboration platform for your business with file sharing, calendars, contacts, and more.',
      icon: '☁️',
      price: 'From RM99/month',
      category: 'Cloud Services'
    },
    {
      id: 2,
      title: 'WordPress Hosting',
      description: 'Managed WordPress hosting with security and performance optimizations. Includes daily backups and malware scanning.',
      icon: '🌐',
      price: 'From RM49/month',
      category: 'Hosting'
    },
    {
      id: 3,
      title: 'Digital Ocean Credits',
      description: 'Get started with cloud computing with our referral program. Perfect for startups and developers.',
      icon: '💧',
      price: 'RM100 free credits',
      category: 'Cloud Services'
    },
    {
      id: 4,
      title: 'Managed Server',
      description: 'Fully managed dedicated servers with 24/7 support, monitoring, and maintenance. Ideal for high-traffic websites and applications.',
      icon: '🖥️',
      price: 'From RM299/month',
      category: 'Hosting'
    },
    {
      id: 5,
      title: 'Cloud Panel',
      description: 'Easy-to-use control panel for your cloud infrastructure. Manage servers, domains, databases, and more from a single dashboard.',
      icon: '📊',
      price: 'From RM79/month',
      category: 'Software'
    },
    {
      id: 6,
      title: 'Robotics Starter Kit',
      description: 'Begin your automation journey with our beginner-friendly kit. Includes programmable robot, sensors, and step-by-step tutorials.',
      icon: '🤖',
      price: 'RM1,299',
      category: 'Robotics'
    },
    {
      id: 7,
      title: 'IoT Sensor Pack',
      description: 'Complete set of IoT sensors for environmental monitoring, including temperature, humidity, air quality, and motion detection.',
      icon: '📡',
      price: 'RM499',
      category: 'IoT'
    },
    {
      id: 8,
      title: 'Smart Agriculture Kit',
      description: 'Automate your agricultural operations with soil moisture sensors, automated irrigation controls, and crop monitoring tools.',
      icon: '🌱',
      price: 'RM1,899',
      category: 'IoT'
    },
    {
      id: 9,
      title: 'Inventory Management System',
      description: 'Cloud-based inventory management software designed for Malaysian SMEs. Includes barcode scanning, stock alerts, and reporting.',
      icon: '📦',
      price: 'From RM149/month',
      category: 'Software'
    },
    {
      id: 10,
      title: 'Warehouse Robot',
      description: 'Autonomous robot for warehouse operations. Can navigate through aisles, pick items, and transport goods efficiently.',
      icon: '🚛',
      price: 'RM12,999',
      category: 'Robotics'
    },
    {
      id: 11,
      title: 'CRM for SMEs',
      description: 'Customer relationship management system tailored for Malaysian small businesses. Includes lead tracking, sales pipeline, and customer support.',
      icon: '👥',
      price: 'From RM89/month',
      category: 'Software'
    },
    {
      id: 12,
      title: 'Smart Office Kit',
      description: 'Transform your office with smart lighting, access control, meeting room booking system, and energy monitoring.',
      icon: '🏢',
      price: 'RM2,499',
      category: 'IoT'
    },
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nekko Marketplace</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Technology Solutions for Malaysian SMEs
          </Text>
          <Text style={styles.heroSubtitle}>
            Discover our curated selection of software, hardware, and services
            designed to help your business grow and innovate.
          </Text>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryButton 
              key={category}
              title={category} 
              active={activeCategory === category}
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                icon={product.icon}
                price={product.price}
                category={product.category}
              />
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need a Custom Solution?</Text>
          <Text style={styles.contactText}>
            Our team of experts can help you find the perfect technology solution for your business needs.
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => openWhatsApp("Custom Solution", "Custom Quote")}
          >
            <Text style={styles.contactButtonText}>Contact Our Team</Text>
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
  categoriesContainer: {
    paddingVertical: 20,
    backgroundColor: 'rgba(19,206,216,0.05)',
  },
  categoriesContent: {
    paddingHorizontal: 32,
    gap: 12,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(19,206,216,0.3)',
    backgroundColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  categoryButtonTextActive: {
    color: COLORS.dark,
  },
  productsSection: {
    paddingVertical: 60,
    paddingHorizontal: 32,
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
    minHeight: 280,
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
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  productCategory: {
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  productDescription: {
    color: 'rgba(242,242,242,0.8)',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 40,
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
  contactSection: {
    backgroundColor: 'rgba(19,206,216,0.05)',
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  contactTitle: {
    color: COLORS.light,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  contactText: {
    color: 'rgba(242,242,242,0.9)',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 700,
    lineHeight: 30,
    fontFamily: 'monospace',
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  contactButtonText: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
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