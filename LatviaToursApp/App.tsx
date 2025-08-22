import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  category: string;
  distance: string;
  rating: number;
  description: string;
}

interface Tour {
  id: number;
  name: string;
  location: string;
  image: string;
  category: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
}

const App = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation] = useState('Riga, Latvia');

  const featuredDestinations: Destination[] = [
    {
      id: 1,
      name: 'Old Town Riga',
      location: 'Riga',
      image: 'https://source.unsplash.com/800x600/?riga-old-town-medieval',
      category: 'Historical',
      distance: '0.5 km',
      rating: 4.8,
      description: 'UNESCO World Heritage site with medieval architecture and cobblestone streets.',
    },
    {
      id: 2,
      name: 'Gauja National Park',
      location: 'Sigulda',
      image: 'https://source.unsplash.com/800x600/?gauja-national-park-forest',
      category: 'Nature',
      distance: '52 km',
      rating: 4.7,
      description: 'Latvia\'s largest national park with ancient valleys, castles, and hiking trails.',
    },
    {
      id: 3,
      name: 'Jurmala Beach',
      location: 'Jurmala',
      image: 'https://source.unsplash.com/800x600/?jurmala-beach-baltic-sea',
      category: 'Beach',
      distance: '25 km',
      rating: 4.6,
      description: 'Famous resort town with pristine beaches along the Baltic Sea.',
    },
  ];

  const featuredTours: Tour[] = [
    {
      id: 1,
      name: 'Old Town Riga Walking Tour',
      location: 'Riga',
      image: 'https://source.unsplash.com/800x600/?riga-walking-tour',
      category: 'Walking Tours',
      duration: '2.5 hours',
      price: 25,
      originalPrice: 35,
      rating: 4.8,
      reviewCount: 342,
    },
    {
      id: 2,
      name: 'Latvian Food & Market Tour',
      location: 'Riga',
      image: 'https://source.unsplash.com/800x600/?riga-food-market',
      category: 'Food & Drink',
      duration: '3 hours',
      price: 45,
      originalPrice: 55,
      rating: 4.7,
      reviewCount: 278,
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <View style={styles.locationDot} />
        <View>
          <Text style={styles.locationLabel}>Current location</Text>
          <View style={styles.locationRow}>
            <Icon name="location" size={16} color="#007AFF" />
            <Text style={styles.locationText}>{userLocation}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.headerTitle}>Explore</Text>
      
      <TouchableOpacity style={styles.menuButton}>
        <Icon name="menu" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TouchableOpacity style={styles.searchBar}>
        <View style={styles.searchIconContainer}>
          <Icon name="search" size={20} color="#007AFF" />
        </View>
        <Text style={styles.searchPlaceholder}>
          Discover destinations, restaurants, tours...
        </Text>
        <View style={styles.searchArrow}>
          <Icon name="chevron-forward" size={16} color="#007AFF" />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderPromoBanner = () => (
    <View style={styles.promoBanner}>
      <View style={styles.promoContent}>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>Featured Event</Text>
        </View>
        <Text style={styles.promoTitle}>Riga Festival 2025</Text>
        <Text style={styles.promoDescription}>
          Experience the magic of Latvia's biggest cultural celebration
        </Text>
        <View style={styles.promoDetails}>
          <View style={styles.promoDot} />
          <Text style={styles.promoDetailText}>March 15-22, 2025</Text>
          <View style={styles.promoDot} />
          <Text style={styles.promoDetailText}>Various locations</Text>
        </View>
      </View>
    </View>
  );

  const renderDestinationCard = (destination: Destination) => (
    <TouchableOpacity key={destination.id} style={styles.destinationCard}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: destination.image }} style={styles.cardImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{destination.category}</Text>
        </View>
        <View style={styles.cardOverlay}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{destination.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{destination.distance}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{destination.name}</Text>
        <Text style={styles.cardLocation}>{destination.location}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {destination.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTourCard = (tour: Tour) => (
    <TouchableOpacity key={tour.id} style={styles.tourCard}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: tour.image }} style={styles.cardImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{tour.category}</Text>
        </View>
        {tour.originalPrice > tour.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
            </Text>
          </View>
        )}
        <View style={styles.cardOverlay}>
          <View style={styles.tourRatingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{tour.rating}</Text>
            <Text style={styles.reviewText}>({tour.reviewCount})</Text>
          </View>
          <View style={styles.priceContainer}>
            {tour.originalPrice > tour.price && (
              <Text style={styles.originalPrice}>€{tour.originalPrice}</Text>
            )}
            <Text style={styles.price}>€{tour.price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{tour.name}</Text>
        <Text style={styles.cardLocation}>{tour.location}</Text>
        <View style={styles.tourDetails}>
          <View style={styles.tourDetailItem}>
            <Icon name="time" size={14} color="#666" />
            <Text style={styles.tourDetailText}>{tour.duration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
        <View style={styles.navIconContainer}>
          <Icon name="search" size={24} color="#007AFF" />
        </View>
        <Text style={[styles.navText, styles.activeNavText]}>Explore</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <View style={styles.navIconContainer}>
          <Icon name="location" size={24} color="#666" />
        </View>
        <Text style={styles.navText}>Map</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <View style={styles.navIconContainer}>
          <Icon name="navigate" size={24} color="#666" />
        </View>
        <Text style={styles.navText}>Tours</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <View style={styles.navIconContainer}>
          <Icon name="menu" size={24} color="#666" />
        </View>
        <Text style={styles.navText}>More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {renderHeader()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSearchBar()}
        {renderPromoBanner()}
        
        {/* Destinations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Discover Latvia</Text>
              <Text style={styles.sectionSubtitle}>Explore the best destinations</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredDestinations.map(renderDestinationCard)}
          </ScrollView>
        </View>
        
        {/* Tours Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Get a Tour</Text>
              <Text style={styles.sectionSubtitle}>Discover Latvia with local guides</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredTours.map(renderTourCard)}
          </ScrollView>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {renderBottomNavigation()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  menuButton: {
    padding: 8,
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIconContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    padding: 8,
    marginRight: 16,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  searchArrow: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    padding: 6,
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    height: 200,
  },
  promoContent: {
    padding: 32,
    flex: 1,
    justifyContent: 'flex-end',
  },
  promoBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  promoBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  promoDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 24,
  },
  promoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoDot: {
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
  },
  promoDetailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  destinationCard: {
    width: 320,
    marginRight: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  tourCard: {
    width: 320,
    marginRight: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  cardImageContainer: {
    height: 200,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#34C759',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tourRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  reviewText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  distanceText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  cardLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  tourDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tourDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tourDetailText: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeNavItem: {
    // Active state styling
  },
  navIconContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeNavText: {
    color: '#007AFF',
  },
});

export default App;