import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DestinationsPageProps {
  onBack: () => void;
  onDestinationSelect: (destination: any) => void;
}

export function DestinationsPage({ onBack, onDestinationSelect }: DestinationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState([100]);

  const categories = [
    'Museums', 'Cities & Towns', 'National Parks', 'Coastal & Beach Areas',
    'Forests & Nature Reserves', 'Castles & Manors', 'Lakes & Rivers',
    'Countryside & Villages', 'UNESCO Sites', 'Spa & Wellness Resorts',
    'Winter Resorts', 'Cultural Heritage Sites', 'Historical Landmarks',
    'Religious Sites', 'Sightseeing & Tours', 'Hiking & Nature Walks',
    'Cycling Routes', 'Birdwatching & Wildlife', 'Beach & Water Activities',
    'Canoeing & Kayaking', 'Winter Sports', 'Sauna & Wellness',
    'Folk Culture & Traditions', 'Museum & Gallery Visits',
    'Local Cuisine & Food Tours', 'Festivals & Events', 'Photography Spots',
    'Camping & Glamping', 'Adventure Sports', 'Fishing & Boating',
    'Craft Workshops', 'Music & Performing Arts', 'Shopping & Markets',
    'Religious Pilgrimage'
  ];

  const destinations = [
    {
      id: 1,
      name: 'Old Town Riga',
      location: 'Riga',
      image: 'riga old town medieval architecture',
      category: 'Historical Landmarks',
      distance: 0.5,
      rating: 4.8,
      price: 'Free',
      openingHours: '24/7',
      description: 'UNESCO World Heritage site with medieval architecture and cobblestone streets.',
      coordinates: { lat: 56.9496, lng: 24.1052 }
    },
    {
      id: 2,
      name: 'Gauja National Park',
      location: 'Sigulda',
      image: 'gauja national park forest hiking',
      category: 'National Parks',
      distance: 52,
      rating: 4.7,
      price: 'Free',
      openingHours: '24/7',
      description: 'Latvia\'s largest national park with ancient valleys, castles, and hiking trails.',
      coordinates: { lat: 57.1717, lng: 24.8516 }
    },
    {
      id: 3,
      name: 'Jurmala Beach',
      location: 'Jurmala',
      image: 'jurmala beach baltic sea resort',
      category: 'Coastal & Beach Areas',
      distance: 25,
      rating: 4.6,
      price: 'Free',
      openingHours: '24/7',
      description: 'Famous resort town with pristine beaches along the Baltic Sea.',
      coordinates: { lat: 56.9678, lng: 23.7794 }
    },
    {
      id: 4,
      name: 'Rundale Palace',
      location: 'Pilsrundale',
      image: 'rundale palace baroque architecture',
      category: 'Castles & Manors',
      distance: 78,
      rating: 4.9,
      price: 'Paid',
      openingHours: '10:00 - 18:00',
      description: 'Magnificent Baroque palace with stunning gardens and opulent interiors.',
      coordinates: { lat: 56.4167, lng: 24.0333 }
    },
    {
      id: 5,
      name: 'Latvian National Museum of Art',
      location: 'Riga',
      image: 'latvian museum art riga',
      category: 'Museums',
      distance: 1.2,
      rating: 4.5,
      price: 'Paid',
      openingHours: '10:00 - 18:00',
      description: 'Premier art museum showcasing Latvian and Baltic art collections.',
      coordinates: { lat: 56.9516, lng: 24.1144 }
    },
    {
      id: 6,
      name: 'Cesis Castle',
      location: 'Cesis',
      image: 'cesis castle medieval ruins',
      category: 'Historical Landmarks',
      distance: 89,
      rating: 4.4,
      price: 'Paid',
      openingHours: '09:00 - 19:00',
      description: 'Medieval castle ruins in the heart of the ancient town of Cesis.',
      coordinates: { lat: 57.3119, lng: 25.2744 }
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(dest.category);
    
    const matchesPrice = priceFilter.length === 0 || 
                        priceFilter.includes(dest.price);
    
    const matchesDistance = dest.distance <= distanceRange[0];
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDistance;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handlePriceChange = (price: string, checked: boolean) => {
    if (checked) {
      setPriceFilter([...priceFilter, price]);
    } else {
      setPriceFilter(priceFilter.filter(p => p !== price));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-40 header-glass">
        <div className="flex items-center gap-4 p-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="rounded-2xl hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-medium tracking-tight">Destinations & Activities</h1>
            <p className="text-sm text-muted-foreground">Discover amazing places</p>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex items-center gap-4 px-6 pb-6">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 bg-primary/10 rounded-xl">
              <Search className="w-4 h-4 text-primary" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="pl-14 glass-morphism border-0 rounded-3xl h-14"
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-2xl border-0 liquid-card h-14 w-14 hover:scale-105 transition-transform duration-200">
                <Filter className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-morphism border-0">
              <SheetHeader>
                <SheetTitle className="text-xl tracking-tight">Filters</SheetTitle>
              </SheetHeader>
              
              <div className="py-8 space-y-8">
                {/* Price Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-lg">Price</h3>
                  <div className="space-y-3">
                    {['Free', 'Paid'].map((price) => (
                      <div key={price} className="flex items-center space-x-3">
                        <Checkbox 
                          id={price}
                          checked={priceFilter.includes(price)}
                          onCheckedChange={(checked) => handlePriceChange(price, checked as boolean)}
                          className="rounded-lg"
                        />
                        <label htmlFor={price} className="text-base">{price}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distance Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-lg">
                    Distance (up to {distanceRange[0]} km)
                  </h3>
                  <Slider
                    value={distanceRange}
                    onValueChange={setDistanceRange}
                    max={150}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-lg">Categories</h3>
                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox 
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          className="rounded-lg"
                        />
                        <label htmlFor={category} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Active Filters */}
        {(selectedCategories.length > 0 || priceFilter.length > 0) && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {selectedCategories.map((category) => (
                <Badge 
                  key={category} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground bg-primary/10 text-primary border-0 rounded-xl px-4 py-2 transition-colors duration-200"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  {category} ×
                </Badge>
              ))}
              {priceFilter.map((price) => (
                <Badge 
                  key={price} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground bg-primary/10 text-primary border-0 rounded-xl px-4 py-2 transition-colors duration-200"
                  onClick={() => handlePriceChange(price, false)}
                >
                  {price} ×
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-muted-foreground mb-8 text-lg">
          {filteredDestinations.length} destinations found
        </p>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredDestinations.map((destination) => (
            <div 
              key={destination.id}
              className="liquid-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              onClick={() => onDestinationSelect(destination)}
            >
              <div className="flex">
                <div className="relative w-28 h-28 bg-muted flex-shrink-0">
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/400x400/?${encodeURIComponent(destination.image)}`}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={destination.price === 'Free' ? 'secondary' : 'default'}
                      className={`text-xs border-0 rounded-xl ${
                        destination.price === 'Free' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {destination.price}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-lg mb-2 tracking-tight">{destination.name}</h3>
                      <div className="flex items-center gap-3 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{destination.location}</span>
                        </div>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span>{destination.distance} km</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-xl">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{destination.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}