import React, { useState } from 'react';
import { Menu, MapPin, Search, ChevronRight, Play, Navigation, Users, Clock, Star, Calendar, Route, Plus, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { SearchOverlay } from './components/SearchOverlay';
import { DestinationsPage } from './components/DestinationsPage';
import { DestinationDetail } from './components/DestinationDetail';
import { ToursPage } from './components/ToursPage';
import { TourDetail } from './components/TourDetail';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [currentPage, setCurrentPage] = useState('explore');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('Riga, Latvia');

  const featuredDestinations = [
    {
      id: 1,
      name: 'Old Town Riga',
      location: 'Riga',
      image: 'riga old town medieval',
      category: 'Historical',
      distance: '0.5 km',
      rating: 4.8,
      description: 'UNESCO World Heritage site with medieval architecture and cobblestone streets.',
      coordinates: { lat: 56.9496, lng: 24.1052 }
    },
    {
      id: 2,
      name: 'Gauja National Park',
      location: 'Sigulda',
      image: 'gauja national park forest',
      category: 'Nature',
      distance: '52 km',
      rating: 4.7,
      description: 'Latvia\'s largest national park with ancient valleys, castles, and hiking trails.',
      coordinates: { lat: 57.1717, lng: 24.8516 }
    },
    {
      id: 3,
      name: 'Jurmala Beach',
      location: 'Jurmala',
      image: 'jurmala beach baltic sea',
      category: 'Beach',
      distance: '25 km',
      rating: 4.6,
      description: 'Famous resort town with pristine beaches along the Baltic Sea.',
      coordinates: { lat: 56.9678, lng: 23.7794 }
    },
    {
      id: 4,
      name: 'Rundale Palace',
      location: 'Pilsrundale',
      image: 'rundale palace baroque architecture',
      category: 'Palace',
      distance: '78 km',
      rating: 4.9,
      description: 'Magnificent Baroque palace with stunning gardens and opulent interiors.',
      coordinates: { lat: 56.4167, lng: 24.0333 }
    }
  ];

  const featuredTours = [
    {
      id: 1,
      name: 'Old Town Riga Walking Tour',
      location: 'Riga',
      image: 'riga old town walking tour guide',
      category: 'Walking Tours',
      duration: '2.5 hours',
      price: 25,
      originalPrice: 35,
      rating: 4.8,
      reviewCount: 342,
      groupSize: '12 max',
      operator: 'Riga Tours',
      availability: 'Daily',
      includes: ['Professional guide', 'Historical insights', 'Photo stops'],
      meetingPoint: 'Town Hall Square',
      languages: ['English', 'German', 'Russian'],
      difficulty: 'Easy',
      highlights: ['UNESCO World Heritage sites', 'Medieval architecture', 'Art Nouveau buildings'],
      cancellation: 'Free cancellation up to 24 hours'
    },
    {
      id: 2,
      name: 'Latvian Food & Market Tour',
      location: 'Riga',
      image: 'riga food market tour tasting',
      category: 'Food & Drink',
      duration: '3 hours',
      price: 45,
      originalPrice: 55,
      rating: 4.7,
      reviewCount: 278,
      groupSize: '10 max',
      operator: 'Taste of Latvia',
      availability: 'Tue, Thu, Sat',
      includes: ['Food tastings', 'Market visits', 'Local guide', 'Recipe cards'],
      meetingPoint: 'Central Market',
      languages: ['English', 'German'],
      difficulty: 'Easy',
      highlights: ['Traditional foods', 'Local vendors', 'Cooking tips', 'Cultural stories'],
      cancellation: 'Free cancellation up to 24 hours'
    },
    {
      id: 3,
      name: 'Gauja National Park Adventure',
      location: 'Sigulda',
      image: 'gauja national park hiking adventure',
      category: 'Adventure Tours',
      duration: '8 hours',
      price: 85,
      originalPrice: 95,
      rating: 4.9,
      reviewCount: 156,
      groupSize: '8 max',
      operator: 'Latvia Adventures',
      availability: 'Wed, Fri, Sun',
      includes: ['Transportation', 'Professional guide', 'Lunch', 'Safety equipment'],
      meetingPoint: 'Riga Central Station',
      languages: ['English', 'Latvian'],
      difficulty: 'Moderate',
      highlights: ['Castle ruins', 'Sandstone cliffs', 'Cable car ride', 'Bobsled track'],
      cancellation: 'Free cancellation up to 48 hours'
    },
    {
      id: 4,
      name: 'Art Nouveau Architecture Tour',
      location: 'Riga',
      image: 'riga art nouveau buildings architecture',
      category: 'Art & Architecture',
      duration: '2 hours',
      price: 30,
      originalPrice: 40,
      rating: 4.6,
      reviewCount: 189,
      groupSize: '15 max',
      operator: 'Riga Heritage Tours',
      availability: 'Daily',
      includes: ['Expert guide', 'Interior visits', 'Photo opportunities'],
      meetingPoint: 'Alberta Street',
      languages: ['English', 'French', 'Russian'],
      difficulty: 'Easy',
      highlights: ['Mikhail Eisenstein buildings', 'Decorative facades', 'Hidden courtyards'],
      cancellation: 'Free cancellation up to 12 hours'
    }
  ];

  const renderExplorePage = () => (
    <div className="min-h-screen bg-background">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 header-glass">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Current location</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{userLocation}</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-lg font-medium tracking-tight">Explore</h1>
          
          <Button variant="ghost" size="icon" className="rounded-2xl hover:scale-105 transition-transform duration-200">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-32">
        {/* Search Bar with Glass Effect */}
        <div className="py-8">
          <div 
            className="relative cursor-pointer group"
            onClick={() => setIsSearchOpen(true)}
          >
            <div className="flex items-center gap-4 p-5 glass-morphism rounded-3xl hover:scale-[1.02] transition-all duration-300 group-hover:shadow-lg">
              <div className="p-2 bg-primary/10 rounded-2xl">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground flex-1">Discover destinations, restaurants, tours...</span>
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banner with Enhanced Glass Effect */}
        <div className="mb-10">
          <div className="relative overflow-hidden rounded-3xl cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            <div className="relative h-56 flex items-end transform group-hover:scale-[1.02] transition-transform duration-500">
              <div className="p-8 text-white w-full">
                <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30 backdrop-blur-sm">
                  Featured Event
                </Badge>
                <h3 className="text-2xl font-medium mb-3 tracking-tight">Riga Festival 2025</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Experience the magic of Latvia's biggest cultural celebration
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                  <span>March 15-22, 2025</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                  <span>Various locations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discover Latvia Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium tracking-tight mb-1">Discover Latvia</h2>
              <p className="text-muted-foreground text-sm">Explore the best destinations</p>
            </div>
            <Button 
              variant="ghost" 
              className="text-primary p-0 h-auto hover:bg-transparent hover:scale-105 transition-transform duration-200"
              onClick={() => setCurrentPage('destinations')}
            >
              <span className="text-sm mr-2 font-medium">See all</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 -mr-6 scrollbar-hide">
            {featuredDestinations.map((destination) => (
              <div 
                key={destination.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
                onClick={() => {
                  setSelectedDestination(destination);
                  setCurrentPage('destination-detail');
                }}
              >
                <div className="liquid-card rounded-3xl overflow-hidden hover:scale-[1.03] transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-52 bg-muted overflow-hidden">
                    <ImageWithFallback 
                      src={`https://source.unsplash.com/800x600/?${encodeURIComponent(destination.image)}`}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-primary border-0 shadow-sm backdrop-blur-sm">
                        {destination.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <span>★</span>
                          <span className="font-medium">{destination.rating}</span>
                        </div>
                        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        <span>{destination.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-lg mb-2 tracking-tight line-clamp-1">{destination.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{destination.location}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get a Tour Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium tracking-tight mb-1">Get a Tour</h2>
              <p className="text-muted-foreground text-sm">Discover Latvia with local guides</p>
            </div>
            <Button 
              variant="ghost" 
              className="text-primary p-0 h-auto hover:bg-transparent hover:scale-105 transition-transform duration-200"
              onClick={() => setCurrentPage('tours')}
            >
              <span className="text-sm mr-2 font-medium">See all</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 -mr-6 scrollbar-hide">
            {featuredTours.map((tour) => (
              <div 
                key={tour.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
                onClick={() => {
                  setSelectedTour(tour);
                  setCurrentPage('tour-detail');
                }}
              >
                <div className="liquid-card rounded-3xl overflow-hidden hover:scale-[1.03] transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-52 bg-muted overflow-hidden">
                    <ImageWithFallback 
                      src={`https://source.unsplash.com/800x600/?${encodeURIComponent(tour.image)}`}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-primary border-0 shadow-sm backdrop-blur-sm">
                        {tour.category}
                      </Badge>
                    </div>
                    {tour.originalPrice > tour.price && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-500 text-white border-0 shadow-sm">
                          -{Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{tour.rating}</span>
                          </div>
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                          <span>({tour.reviewCount})</span>
                        </div>
                        <div className="text-right">
                          {tour.originalPrice > tour.price && (
                            <span className="text-xs line-through mr-1">€{tour.originalPrice}</span>
                          )}
                          <span className="font-medium">€{tour.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-lg mb-2 tracking-tight line-clamp-1">{tour.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{tour.location}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                      {tour.highlights[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Build Your Itinerary Section */}
        <div className="mb-10">
          <div 
            className="relative overflow-hidden rounded-3xl cursor-pointer group"
            onClick={() => setCurrentPage('itinerary-builder')}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-primary opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            
            {/* Glass Morphism Effect */}
            <div className="absolute inset-0 glass-morphism"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-4 right-8 w-12 h-12 bg-white/10 rounded-2xl backdrop-blur-sm transform rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
            <div className="absolute bottom-8 right-12 w-8 h-8 bg-white/15 rounded-xl backdrop-blur-sm transform -rotate-12 group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="absolute top-12 left-8 w-6 h-6 bg-white/20 rounded-lg backdrop-blur-sm transform rotate-45 group-hover:-rotate-45 transition-transform duration-600"></div>
            
            {/* Content */}
            <div className="relative h-48 flex items-center transform group-hover:scale-[1.02] transition-transform duration-500">
              <div className="p-8 text-white w-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1">
                        AI Powered
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-medium mb-3 tracking-tight">Build Your Itinerary</h3>
                    <p className="text-white/90 leading-relaxed mb-6 max-w-lg">
                      Create personalized travel plans tailored to your interests, budget, and schedule. Get smart recommendations and optimize your Latvia adventure.
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Smart scheduling</span>
                      </div>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <Route className="w-4 h-4" />
                        <span>Optimized routes</span>
                      </div>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Group planning</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-6">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                      <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Action Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="floating-nav rounded-3xl mx-auto max-w-sm pointer-events-auto">
          <div className="flex items-center justify-around py-3 px-6">
            <Button 
              variant="ghost" 
              className="flex flex-col items-center gap-2 h-auto py-3 px-4 text-primary rounded-2xl hover:scale-105 transition-all duration-200"
            >
              <div className="p-2 bg-primary/10 rounded-xl">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Explore</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-3 px-4 text-muted-foreground rounded-2xl hover:scale-105 transition-all duration-200 hover:text-foreground">
              <div className="p-2 hover:bg-primary/10 rounded-xl transition-colors duration-200">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Map</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex flex-col items-center gap-2 h-auto py-3 px-4 text-muted-foreground rounded-2xl hover:scale-105 transition-all duration-200 hover:text-foreground"
              onClick={() => setCurrentPage('tours')}
            >
              <div className="p-2 hover:bg-primary/10 rounded-xl transition-colors duration-200">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Tours</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-3 px-4 text-muted-foreground rounded-2xl hover:scale-105 transition-all duration-200 hover:text-foreground">
              <div className="p-2 hover:bg-primary/10 rounded-xl transition-colors duration-200">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">More</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'explore' && renderExplorePage()}
      {currentPage === 'destinations' && (
        <DestinationsPage 
          onBack={() => setCurrentPage('explore')}
          onDestinationSelect={(destination) => {
            setSelectedDestination(destination);
            setCurrentPage('destination-detail');
          }}
        />
      )}
      {currentPage === 'destination-detail' && selectedDestination && (
        <DestinationDetail 
          destination={selectedDestination}
          onBack={() => setCurrentPage('destinations')}
        />
      )}
      {currentPage === 'tours' && (
        <ToursPage 
          onBack={() => setCurrentPage('explore')}
          onTourSelect={(tour) => {
            setSelectedTour(tour);
            setCurrentPage('tour-detail');
          }}
        />
      )}
      {currentPage === 'tour-detail' && selectedTour && (
        <TourDetail 
          tour={selectedTour}
          onBack={() => setCurrentPage('tours')}
        />
      )}
      {currentPage === 'itinerary-builder' && (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="liquid-card rounded-3xl p-8 text-center max-w-md">
            <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-medium mb-4 tracking-tight">Itinerary Builder</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The AI-powered itinerary builder is coming soon! Create personalized travel plans with smart recommendations.
            </p>
            <Button 
              onClick={() => setCurrentPage('explore')}
              className="w-full h-12 rounded-2xl"
            >
              Back to Explore
            </Button>
          </div>
        </div>
      )}
      
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userLocation={userLocation}
      />
    </div>
  );
}