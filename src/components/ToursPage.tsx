import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ToursPageProps {
  onBack: () => void;
  onTourSelect: (tour: any) => void;
}

export function ToursPage({ onBack, onTourSelect }: ToursPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([200]);
  const [durationFilter, setDurationFilter] = useState<string[]>([]);

  const categories = [
    'Walking Tours', 'Cultural Tours', 'Food & Drink', 'Historical Tours',
    'Nature Tours', 'Adventure Tours', 'Photography Tours', 'Art & Architecture',
    'Religious Tours', 'Day Trips', 'Multi-day Tours', 'Private Tours',
    'Group Tours', 'Family-Friendly', 'Romantic Tours', 'Seasonal Tours'
  ];

  const durations = ['1-2 hours', '3-4 hours', '5-8 hours', 'Full day', 'Multi-day'];

  const tours = [
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
      id: 3,
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
    },
    {
      id: 5,
      name: 'Baltic Coast & Jurmala Day Trip',
      location: 'Jurmala',
      image: 'jurmala beach baltic coast tour',
      category: 'Day Trips',
      duration: '6 hours',
      price: 65,
      originalPrice: 75,
      rating: 4.5,
      reviewCount: 124,
      groupSize: '16 max',
      operator: 'Baltic Explorer',
      availability: 'Mon, Wed, Fri',
      includes: ['Transportation', 'Beach time', 'Spa district tour', 'Local lunch'],
      meetingPoint: 'Hotel pickup available',
      languages: ['English', 'German'],
      difficulty: 'Easy',
      highlights: ['White sand beaches', 'Wooden architecture', 'Resort atmosphere'],
      cancellation: 'Free cancellation up to 24 hours'
    },
    {
      id: 6,
      name: 'Rundale Palace & Gardens Tour',
      location: 'Pilsrundale',
      image: 'rundale palace baroque gardens tour',
      category: 'Historical Tours',
      duration: '5 hours',
      price: 75,
      originalPrice: 85,
      rating: 4.8,
      reviewCount: 201,
      groupSize: '12 max',
      operator: 'Heritage Latvia',
      availability: 'Daily except Mon',
      includes: ['Transportation', 'Palace entry', 'Gardens access', 'Audio guide'],
      meetingPoint: 'Riga departure point',
      languages: ['English', 'German', 'Russian'],
      difficulty: 'Easy',
      highlights: ['Baroque architecture', 'French gardens', 'Royal apartments'],
      cancellation: 'Free cancellation up to 48 hours'
    }
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(tour.category);
    
    const matchesPrice = tour.price <= priceRange[0];
    
    const matchesDuration = durationFilter.length === 0 || 
                           durationFilter.some(duration => tour.duration.includes(duration.split(' ')[0]));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    if (checked) {
      setDurationFilter([...durationFilter, duration]);
    } else {
      setDurationFilter(durationFilter.filter(d => d !== duration));
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
            <h1 className="text-xl font-medium tracking-tight">Get a Tour</h1>
            <p className="text-sm text-muted-foreground">Discover Latvia with local guides</p>
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
              placeholder="Search tours..."
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
                  <h3 className="font-medium mb-4 text-lg">
                    Price (up to €{priceRange[0]})
                  </h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="font-medium mb-4 text-lg">Duration</h3>
                  <div className="space-y-3">
                    {durations.map((duration) => (
                      <div key={duration} className="flex items-center space-x-3">
                        <Checkbox 
                          id={duration}
                          checked={durationFilter.includes(duration)}
                          onCheckedChange={(checked) => handleDurationChange(duration, checked as boolean)}
                          className="rounded-lg"
                        />
                        <label htmlFor={duration} className="text-base">{duration}</label>
                      </div>
                    ))}
                  </div>
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
        {(selectedCategories.length > 0 || durationFilter.length > 0) && (
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
              {durationFilter.map((duration) => (
                <Badge 
                  key={duration} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground bg-primary/10 text-primary border-0 rounded-xl px-4 py-2 transition-colors duration-200"
                  onClick={() => handleDurationChange(duration, false)}
                >
                  {duration} ×
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-muted-foreground mb-8 text-lg">
          {filteredTours.length} tours found
        </p>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTours.map((tour) => (
            <div 
              key={tour.id}
              className="liquid-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              onClick={() => onTourSelect(tour)}
            >
              <div className="flex">
                <div className="relative w-32 h-32 bg-muted flex-shrink-0">
                  <ImageWithFallback 
                    src={`https://source.unsplash.com/400x400/?${encodeURIComponent(tour.image)}`}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary text-primary-foreground border-0 rounded-xl text-xs">
                      {tour.category}
                    </Badge>
                  </div>
                  {tour.originalPrice > tour.price && (
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-green-100 text-green-700 border-0 rounded-xl text-xs">
                        -{Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-lg mb-2 tracking-tight line-clamp-1">{tour.name}</h3>
                      <div className="flex items-center gap-3 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{tour.location}</span>
                        </div>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{tour.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{tour.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{tour.availability}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-xl mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tour.rating}</span>
                        <span className="text-xs text-muted-foreground">({tour.reviewCount})</span>
                      </div>
                      <div className="text-right">
                        {tour.originalPrice > tour.price && (
                          <span className="text-sm text-muted-foreground line-through mr-2">€{tour.originalPrice}</span>
                        )}
                        <span className="text-xl font-medium text-primary">€{tour.price}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
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